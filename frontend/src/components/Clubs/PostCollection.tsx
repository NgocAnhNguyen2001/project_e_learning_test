import autoAnimate from "@formkit/auto-animate";
import dayjs from "dayjs";
import React from "react";

import {
  FindAllPostQuery,
  FindManyBookmarksQuery,
  ForumPostBookmark,
  ReactionEmojies,
} from "schema/generated/graphql";

import DividerWithObject from "../Elements/DividerWithObject/DividerWithObject";

import Post from "./Post";

interface PostCollectionProps {
  posts: FindAllPostQuery | undefined;
  bookmarks: FindManyBookmarksQuery | undefined;
  selectedCategory?: { id: string; label: string };
  editPost: (id: string, text: string) => void;
  deletePost: (id: string) => void;
  reactPost: (id: string, emoji: ReactionEmojies) => void;
  reportPost: (id: string) => void;
  createBookmark: (postId: string) => void;
  deleteBookmark: (id: string) => void;
  setSelectedCategory?: (value: { id: string; label: string }) => void;
}

const PostCollection = ({
  posts,
  bookmarks,
  selectedCategory,
  editPost,
  deletePost,
  reactPost,
  reportPost,
  createBookmark,
  deleteBookmark,
  setSelectedCategory,
}: PostCollectionProps): React.ReactElement => {
  const newPost: any[] = [];
  const recentPost: any[] = [];

  const newPostRef = React.useRef(null);

  React.useEffect(() => {
    newPostRef.current && autoAnimate(newPostRef.current);
  }, [newPostRef]);

  if (posts?.findManyPostsAndReactions) {
    posts.findManyPostsAndReactions.map((post) => {
      if (
        dayjs(post.post.createdAt).isAfter(dayjs().subtract(1, "hour")) &&
        selectedCategory?.label != "Popular Topics"
      ) {
        newPost.push(post.post);
      } else {
        recentPost.push(post.post);
      }
    });
  }

  return (
    <div className="space-y-4" ref={newPostRef}>
      {newPost.length !== 0 &&
        (selectedCategory?.id ||
          selectedCategory?.label == "Replies received") && (
          <DividerWithObject>
            <span className="flex-shrink mx-4 text-white text-sm bg-brand px-4 py-1 rounded-[4px]">
              New Topics
            </span>
          </DividerWithObject>
        )}

      {(selectedCategory?.id ||
        selectedCategory?.label == "Replies received") &&
        newPost.map((post) => {
          return (
            <Post
              key={post.id}
              replies={selectedCategory?.label == "Replies received"}
              post={post}
              bookmark={
                bookmarks?.findManyBookmarks.find(
                  (bookmark) => bookmark?.postId == post.id,
                ) as ForumPostBookmark
              }
              username={post.user.firstName}
              postUserId={post.user.id}
              createdAt={post.createdAt}
              text={post.text}
              imageUrl={post.user.student?.avatarImage?.url}
              id={post.id}
              commentCount={post.commentCount}
              reactionCount={post.ForumReaction}
              editPost={editPost}
              deletePost={deletePost}
              reactPost={reactPost}
              reportPost={reportPost}
              createBookmark={createBookmark}
              deleteBookmark={deleteBookmark}
            />
          );
        })}

      {(selectedCategory?.id ||
        selectedCategory?.label == "Replies received") && (
        <DividerWithObject>
          <span className="flex-shrink mx-4 text-white text-sm px-4 py-1">
            Recent Topics
          </span>
        </DividerWithObject>
      )}

      {recentPost.map((post) => {
        return (
          <Post
            key={post.id}
            post={post}
            bookmark={
              bookmarks?.findManyBookmarks.find(
                (bookmark) => bookmark?.postId == post.id,
              ) as ForumPostBookmark
            }
            popular={selectedCategory?.label == "Popular Topics"}
            yourTopic={selectedCategory?.label == "Your Topics"}
            replies={selectedCategory?.label == "Replies received"}
            category={post.category?.name}
            categoryImg={post.category?.activeImgUrl}
            categoryId={post.category?.id}
            username={post.user.firstName}
            postUserId={post.user.id}
            createdAt={post.createdAt}
            text={post.text}
            imageUrl={post.user.student?.avatarImage?.url}
            id={post.id}
            commentCount={post.commentCount}
            reactionCount={post.ForumReaction}
            editPost={editPost}
            deletePost={deletePost}
            reactPost={reactPost}
            reportPost={reportPost}
            createBookmark={createBookmark}
            deleteBookmark={deleteBookmark}
            setSelectedCategory={setSelectedCategory}
          />
        );
      })}
    </div>
  );
};

export default PostCollection;
