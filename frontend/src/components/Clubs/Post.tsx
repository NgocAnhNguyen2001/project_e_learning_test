import autoAnimate from "@formkit/auto-animate";
import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";

import {
  ForumPost,
  ForumPostBookmark,
  ReactionEmoji,
  ReactionEmojies,
} from "schema/generated/graphql";
import { useStore } from "utils/hooks/zustand";

import { ParentPost } from "./ParentPost";

interface Props {
  imageUrl?: string;
  username: string;
  postUserId: string;
  createdAt: string;
  text: string;
  id: string;
  post?: ForumPost;
  bookmark?: ForumPostBookmark | undefined;
  popular?: boolean;
  yourTopic?: boolean;
  replies?: boolean;
  category?: string;
  categoryImg?: string;
  categoryId?: string;
  canReply?: boolean;
  commentCount?: number;
  reactionCount?: { emoji: ReactionEmoji; count: number }[] | null;
  editPost: (id: string, text: string) => void;
  deletePost: (id: string) => void;
  reactPost: (id: string, emoji: ReactionEmojies) => void;
  reportPost: (postId: string) => void;
  createBookmark: (postId: string) => void;
  deleteBookmark: (id: string) => void;
  setSelectedCategory?: (value: { id: string; label: string }) => void;
}

const Post: React.FC<Props> = ({
  post,
  imageUrl,
  username,
  postUserId,
  createdAt,
  text,
  id,
  bookmark,
  popular = false,
  category,
  yourTopic,
  replies,
  categoryImg,
  categoryId,
  canReply = true,
  commentCount = 0,
  reactionCount,
  editPost,
  deletePost,
  reactPost,
  reportPost,
  createBookmark,
  deleteBookmark,
  setSelectedCategory,
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const user = useStore((state) => state.user);
  const [editedValue, setEditedValue] = React.useState(text);
  const postRef = React.useRef(null);

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
      condition: postUserId == user?.id,
    },
    {
      label: "Delete",
      func: deletePost,
      value: id,
      condition: postUserId == user?.id,
    },
    {
      label: "Report this Post",
      func: reportPost,
      value: id,
      condition: postUserId != user?.id,
    },
  ];

  const isNewComment = dayjs(createdAt).isAfter(dayjs().subtract(1, "hour"));

  const parseDate = (dateString: string): string => {
    if (isNewComment) {
      const diff = dayjs().diff(dateString, "minute");
      return diff === 0 ? "JUST NOW" : `${diff} MIN AGO`;
    } else {
      return dayjs(createdAt).format("MMM DD YYYY, HH:mm A").toUpperCase();
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

  const postTitle = (): React.ReactElement => (
    <p className="font-extrabold text-xs md:text-sm text-white flex flex-row">
      {popular && (
        <p className="flex flex-row flex-wrap">
          Posted in
          <p
            className="underline px-1 cursor-pointer"
            onClick={(): void => {
              if (categoryId && category) {
                setSelectedCategory?.({
                  id: categoryId,
                  label: category,
                });
              }
            }}
          >{` ${category} `}</p>
          by
          <p className={`cursor-pointer ${popular && "underline pl-1"}`}>
            <Link href={`/student/profile/${postUserId}`}>{username}</Link>
          </p>
        </p>
      )}
      {!yourTopic && !popular && (
        <p className={`cursor-pointer ${popular && "underline pl-1"}`}>
          <Link href={`/student/profile/${postUserId}`}>{username}</Link>
        </p>
      )}
      {yourTopic && !post?.parentPost && (
        <p className="flex flex-row flex-wrap">
          You posted a topic in
          <p
            className="underline px-1 cursor-pointer"
            onClick={(): void => {
              if (categoryId && category) {
                setSelectedCategory?.({
                  id: categoryId,
                  label: category,
                });
              }
            }}
          >{` ${category} `}</p>
        </p>
      )}
      {yourTopic && post?.parentPost && !post.isSubComment && (
        <p className="flex flex-row flex-wrap pr-1">
          You replied to
          <Link href={`/student/profile/${post.parentPost.user.id}`}>
            <p className="cursor-pointer underline px-1">
              {post.parentPost.user.firstName}
            </p>
          </Link>
          in
          <p
            className="underline cursor-pointer pl-1"
            onClick={(): void => {
              if (categoryId && category) {
                setSelectedCategory?.({
                  id: categoryId,
                  label: category,
                });
              }
            }}
          >{` ${category} `}</p>
        </p>
      )}
      {yourTopic && post?.parentPost && post.isSubComment && (
        <p className="flex flex-row flex-wrap pr-1">
          You replied to
          <Link href={`/student/profile/${post.parentPost.user.id}`}>
            <p className="cursor-pointer underline px-1">
              {`${post.parentPost.user.firstName}'s reply`}
            </p>
          </Link>
        </p>
      )}
    </p>
  );

  React.useEffect(() => {
    postRef.current && autoAnimate(postRef.current);
  }, [postRef]);

  return (
    <>
      <div className="bg-[#2D0745]/50 rounded-lg p-4 space-y-4">
        <div className="flex justify-between items-center">
          <div
            className={`flex items-center space-x-4 ${
              !popular && "cursor-pointer"
            }`}
          >
            <div className="flex flex-row">
              {popular && categoryImg && (
                <div className="w-8 overflow-hidden rounded-full aspect-square border border-white items-center z-50 cursor-pointer">
                  <Link href={`/student/clubs?category=${category}`}>
                    <img src={categoryImg} alt="Category img" />
                  </Link>
                </div>
              )}
              <div
                className={`w-8 overflow-hidden rounded-full aspect-square border border-white items-center ${
                  popular && "-ml-2 z-10"
                }`}
              >
                <Link href={`/student/profile/${postUserId}`}>
                  <img
                    src={imageUrl ? imageUrl : "/images/common/default.png"}
                    alt="Avatar profile"
                    className="cursor-pointer"
                  />
                </Link>
              </div>
            </div>
            {postTitle()}
          </div>
          <div className="flex items-center">
            <p className="hidden lg:block text-xs text-gray-300 pr-4">
              {parseDate(createdAt)}
            </p>
            <div className="flex space-x-4 items-center">
              {isNewComment && (
                <div className="px-2 py-1 rounded-md bg-brand text-white text-xs">
                  New
                </div>
              )}
              <Menu as="div" className="relative text-left">
                <div className="h-6">
                  <Menu.Button className="">
                    <img
                      src="/images/clubs/emoji.png"
                      alt="react"
                      className="w-8 h-8 lg:w-6 lg:h-6"
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
                                reactPost?.(id, reaction.emojiText)
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
        {!popular && post?.parentPost && (
          <ParentPost
            createdAt={post?.parentPost?.createdAt}
            postUserId={post?.parentPost?.user.id}
            text={post?.parentPost?.text}
            username={post?.parentPost?.user.firstName}
            category={post?.parentPost?.category.name}
            categoryImg={post?.parentPost?.category?.activeImgUrl}
            categoryId={post?.parentPost?.category.id}
            setSelectedCategory={setSelectedCategory}
            post={post?.parentPost}
            yourReply={replies}
          />
        )}
        <div ref={postRef}>
          {isEditing ? (
            <div className="border-white/30 border rounded-lg">
              <textarea
                value={editedValue}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => {
                  setEditedValue(e.currentTarget.value);
                }}
                className="text-sm font-medium border-0 text-white w-full bg-transparent rounded-lg accent-transparent"
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
                      editPost(id, editedValue);
                      setIsEditing(false);
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm font-semibold text-white">{text}</p>
          )}
        </div>

        <div className="flex justify-start space-x-2 items-center">
          {canReply &&
            (!yourTopic || (yourTopic && !post?.parentPost)) &&
            !replies && (
              <Link href={`/student/clubs/${id}`}>
                <div className="flex justify-start space-x-2 items-center cursor-pointer">
                  <img
                    src="/images/clubs/reply.png"
                    alt="more"
                    className="w-6 h-6"
                  />
                  <a
                    className={`${
                      commentCount == 0 && "hidden"
                    } lg:block text-xs capitalize text-white underline`}
                  >
                    {commentCount === 0
                      ? "Be the first to leave a reply!"
                      : `${commentCount} replies`}
                  </a>
                </div>
              </Link>
            )}
          <div className="flex space-x-2 grow">
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
        </div>
        <div className="block lg:hidden grow flex justify-end">
          <p className=" text-xs text-gray-300 pr-4">{parseDate(createdAt)}</p>
        </div>
      </div>
    </>
  );
};

export default Post;
