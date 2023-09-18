import dayjs from "dayjs";
import Link from "next/link";
import React from "react";

import { ForumPost } from "schema/generated/graphql";

interface PostProps {
  imageUrl?: string;
  username?: string;
  postUserId?: string;
  createdAt?: string;
  text?: string;
  post?: ForumPost;
  category?: string;
  categoryImg?: string | null;
  categoryId?: string;
  yourReply?: boolean;
  setSelectedCategory?: (value: { id: string; label: string }) => void;
}

export const ParentPost = ({
  post,
  imageUrl,
  username,
  postUserId,
  createdAt,
  text,
  category,
  categoryImg,
  categoryId,
  yourReply = false,
  setSelectedCategory,
}: PostProps): React.ReactElement => {
  const isNewComment = dayjs(createdAt).isAfter(dayjs().subtract(1, "hour"));

  const parseDate = (dateString?: string): string => {
    if (isNewComment) {
      const diff = dayjs().diff(dateString, "minute");
      return diff === 0 ? "JUST NOW" : `${diff} MIN AGO`;
    } else {
      return dayjs(createdAt).format("MMM DD YYYY, HH:mm A").toUpperCase();
    }
  };

  const postTitle = (): React.ReactElement => {
    return yourReply ? (
      <p className="font-medium text-xs md:text-sm text-[#FFFFFF]/60 flex flex-row italic">
        {!post?.parentPost ? (
          <p className="flex flex-row flex-wrap">
            You posted a topic in
            <p
              className="underline pl-1 cursor-pointer"
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
        ) : (
          <p className="flex flex-row flex-wrap">
            You replied to
            <p className="cursor-pointer underline px-1">
              <Link href={`/student/clubs/${post.parentPost.id}`}>
                {`${post.parentPost.user.firstName}'s topic`}
              </Link>
            </p>
            in
            <p
              className="underline pl-1 cursor-pointer"
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
      </p>
    ) : (
      <p className="font-medium text-sm text-[#FFFFFF]/60 flex flex-row italic">
        {!post?.parentPost ? (
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
            <p className="cursor-pointer underline pl-1">
              <Link href={`/student/profile/${postUserId}`}>{username}</Link>
            </p>
          </p>
        ) : (
          <p className="flex flex-row flex-wrap">
            <p className="cursor-pointer underline pr-1">
              <Link href={`/student/profile/${postUserId}`}>{username}</Link>
            </p>
            replied to
            <p className="cursor-pointer underline pl-1">
              <Link href={`/student/clubs/${post.parentPost.id}`}>
                {`${post.parentPost.user.firstName}'s topic`}
              </Link>
            </p>
          </p>
        )}
      </p>
    );
  };

  return (
    <>
      <div className="bg-[#2D0745]/70 rounded-lg p-4 space-y-4">
        <div className="flex justify-between items-center">
          <div className={`flex items-center space-x-4 cursor-pointer`}>
            <div className="flex flex-row">
              {!post?.parentPost && categoryImg && (
                <div className="w-8 overflow-hidden rounded-full aspect-square border border-white items-center z-50 cursor-pointer">
                  <Link href={`/student/clubs?category=${category}`}>
                    <img src={categoryImg} alt="Category img" />
                  </Link>
                </div>
              )}
              <div
                className={`w-8 overflow-hidden rounded-full aspect-square border border-white items-center -ml-2 z-10`}
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
        </div>
        <div>
          <p className="text-sm font-semibold  text-[#FFFFFF]/60 italic">
            {text}
          </p>
        </div>
        <div className="flex justify-end">
          <p className="text-xs text-gray-300 pr-4 italic">
            {parseDate(createdAt)}
          </p>
        </div>
      </div>
    </>
  );
};

export default ParentPost;
