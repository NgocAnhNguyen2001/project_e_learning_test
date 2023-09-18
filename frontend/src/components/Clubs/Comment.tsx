import autoAnimate from "@formkit/auto-animate";
import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import { IoReturnUpBack } from "react-icons/io5";

import {
  ForumPostBookmark,
  ReactionEmoji,
  ReactionEmojies,
} from "schema/generated/graphql";
import { useStore } from "utils/hooks/zustand";

interface CommentProps {
  isSubcomment?: boolean;
  text: string;
  bookmark?: ForumPostBookmark | undefined;
  username: string;
  commentUserId: string;
  createdAt: string;
  avatarImage?: string;
  mainComment?: {
    text: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
    };
  } | null;
  id: string;
  reactionCount?: { emoji: ReactionEmoji; count: number }[] | null;
  editComment?: (id: string, text: string) => void;
  deleteComment?: (id: string) => void;
  reactComment?: (id: string, emoji: ReactionEmojies) => void;
  reportComment: (postId: string) => void;
  createBookmark: (postId: string) => void;
  deleteBookmark: (id: string) => void;
}

const Comment = ({
  isSubcomment = false,
  text,
  bookmark,
  username,
  commentUserId,
  createdAt,
  avatarImage,
  mainComment,
  id,
  reactionCount,
  editComment,
  deleteComment,
  reactComment,
  reportComment,
  createBookmark,
  deleteBookmark,
}: CommentProps): React.ReactElement => {
  const user = useStore((state) => state.user);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedValue, setEditedValue] = React.useState(text);
  const commentRef = React.useRef(null);

  const dropdown: {
    label: string;
    func?: (val: any) => void;
    value: boolean | string;
    condition: boolean;
  }[] = [
    {
      label: "Edit",
      func: setIsEditing,
      value: true,
      condition: commentUserId == user?.id,
    },
    {
      label: "Delete",
      func: deleteComment,
      value: id,
      condition: commentUserId == user?.id,
    },
    {
      label: "Report this comment",
      func: reportComment,
      value: id,
      condition: commentUserId != user?.id,
    },
  ];

  const isNewComment = dayjs(createdAt).isAfter(dayjs().subtract(1, "hour"));

  const parseDate = (dateString: string): string => {
    if (isNewComment) {
      const diff = dayjs().diff(dateString, "minute");
      return diff === 0 ? "JUST NOW" : `${diff} MIN AGO`;
    } else {
      return dayjs(createdAt).format("MMM DD YYYY, HH:mm a");
    }
  };

  const parseReaction = (emoji: ReactionEmoji): string => {
    switch (emoji) {
      case ReactionEmoji.Celebrate:
        return "🥳";
      case ReactionEmoji.Clap:
        return "👏";
      case ReactionEmoji.Heart:
        return "❤";
      case ReactionEmoji.Laugh:
        return "😀";
      case ReactionEmoji.Like:
        return "👍";
      case ReactionEmoji.Relaxed:
        return "😂";
      case ReactionEmoji.Smile:
        return "😊";
    }
  };

  React.useEffect(() => {
    commentRef.current && autoAnimate(commentRef.current);
  }, [commentRef]);

  return (
    <div className="bg-[#2D0745]/50 rounded-lg p-4 space-y-4">
      <div className="flex justify-between items-center">
        <Link href={`/student/profile/${commentUserId}`}>
          <div className="flex items-center space-x-4 cursor-pointer">
            <div className="w-8 overflow-hidden rounded-full aspect-square border border-white items-center ">
              <img
                src={avatarImage ? avatarImage : "/images/common/default.png"}
                alt="Avatar profile"
              />
            </div>
            <p className="font-extrabold text-sm text-white">{username}</p>
          </div>
        </Link>
        <div className="flex items-center">
          <p className="hidden md:block text-xs text-gray-300 pr-4">
            {parseDate(createdAt)}
          </p>
          <div className="flex space-x-4">
            {isNewComment && (
              <div className="px-2 py-1 rounded-md bg-brand text-white text-xs">
                New
              </div>
            )}
            {!isSubcomment && (
              <Link href={`/student/clubs/replies/${id}`}>
                <a>
                  <IoReturnUpBack size={24} color="white" />
                </a>
              </Link>
            )}
            <Menu as="div" className="relative text-left">
              <div className="h-6">
                <Menu.Button className="">
                  <img
                    src="/images/clubs/emoji.png"
                    alt="react"
                    className="w-6 h-6"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={React.Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute top-6 -right-16 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="flex px-1">
                    {[
                      { emoji: "😀", emojiText: ReactionEmojies.Laugh },
                      { emoji: "❤", emojiText: ReactionEmojies.Heart },
                      { emoji: "👍", emojiText: ReactionEmojies.Like },
                      { emoji: "🥳", emojiText: ReactionEmojies.Celebrate },
                      { emoji: "👏", emojiText: ReactionEmojies.Clap },
                      { emoji: "😊", emojiText: ReactionEmojies.Smile },
                    ].map((reaction) => (
                      <Menu.Item key={reaction.emojiText}>
                        {({ active }): React.ReactElement => (
                          <button
                            onClick={(): void =>
                              reactComment?.(id, reaction.emojiText)
                            }
                            className={clsx(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-2 py-2 text-sm w-full text-left",
                            )}
                          >
                            {reaction.emoji}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <button
              onClick={(): void => {
                if (!bookmark) {
                  createBookmark(id);
                } else deleteBookmark(bookmark.id);
              }}
            >
              {bookmark ? (
                <img
                  src="/images/clubs/bookmark-active.png"
                  alt="bookmark"
                  className="w-6 h-6"
                />
              ) : (
                <img
                  src="/images/clubs/bookmark.png"
                  alt="bookmark"
                  className="w-6 h-6"
                />
              )}
            </button>
            <Menu as="div" className="relative text-left">
              <div className="h-6">
                <Menu.Button className="">
                  <img
                    src="/images/clubs/more.png"
                    alt="more"
                    className="w-6 h-6 relative"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={React.Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {dropdown.map((item) => {
                      if (item.condition)
                        return (
                          <Menu.Item>
                            {({ active }): React.ReactElement => (
                              <button
                                onClick={(): void => {
                                  item.func?.(item.value);
                                }}
                                className={clsx(
                                  active
                                    ? "bg-gray-100 text-gray-900 underline"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm w-full text-left",
                                )}
                              >
                                {item.label}
                              </button>
                            )}
                          </Menu.Item>
                        );
                    })}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
      {isSubcomment && (
        <div className="p-4 bg-[#2D0745]/70 rounded-lg">
          <p className="italic text-xs text-white/60 flex flex-row">
            <Link href={`/student/profile/${mainComment?.user.id}`}>
              <p className="cursor-pointer">
                {`@${mainComment?.user.firstName} ${mainComment?.user.lastName}`}
              </p>
            </Link>
            : {mainComment?.text}
          </p>
        </div>
      )}
      <div ref={commentRef}>
        {isEditing ? (
          <div className="border-white/30 border rounded-lg">
            <textarea
              value={editedValue}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => {
                setEditedValue(e.currentTarget.value);
              }}
              className="text-sm font-medium border-0 text-white w-full bg-transparent rounded-lg"
            />
            <div className="flex justify-end py-2 px-2">
              <div className="space-x-2">
                <button
                  className="px-2 py-1 bg-red-600 text-white rounded-lg text-xs font-semibold"
                  onClick={(): void => {
                    setEditedValue(text);
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-2 py-1 bg-brand text-white rounded-lg text-xs font-semibold"
                  onClick={(): void => {
                    editComment?.(id, editedValue);
                    setIsEditing(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm font-medium text-white">{text}</p>
        )}
        <div className="flex space-x-2 pt-4">
          {reactionCount &&
            reactionCount
              .filter((reaction) => reaction.count !== 0)
              .map((reaction) => {
                return (
                  <div
                    key={reaction.emoji}
                    className="bg-[#2F0F3E] px-2 py-[2px] text-base rounded-[4px] space-x-1"
                  >
                    <span>{parseReaction(reaction.emoji)}</span>
                    <span className="text-white">{reaction.count}</span>
                  </div>
                );
              })}
        </div>
        <div className="block lg:hidden grow flex justify-end">
          <p className=" text-xs text-gray-300 pr-4">{parseDate(createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
