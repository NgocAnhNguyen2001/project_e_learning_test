# Parent Post

Forum post

![](./readmeIMG/2023-02-14-15-57-43.png)

![](./readmeIMG/2023-02-14-15-58-09.png)

## Props

```js
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
  reactionCount?: { emoji: ReactionEmoji, count: number }[] | null;
  editPost: (id: string, text: string) => void;
  deletePost: (id: string) => void;
  reactPost: (id: string, emoji: ReactionEmojies) => void;
  reportPost: (postId: string) => void;
  createBookmark: (postId: string) => void;
  deleteBookmark: (id: string) => void;
  setSelectedCategory?: (value: { id: string, label: string }) => void;
}
```

## Example

```js
<Post
  id={postData.findOnePosts.id}
  bookmark={
    bookmarks?.findManyBookmarks.find(
      (bookmark) => bookmark.postId == postData?.findOnePosts.id,
    ) as ForumPostBookmark
  }
  text={postData.findOnePosts.text}
  username={postData.findOnePosts.user.firstName}
  postUserId={postData.findOnePosts.user.id}
  createdAt={postData.findOnePosts.createdAt}
  canReply={false}
  reactionCount={postData.findOnePosts.ForumReaction}
  editPost={handleEditComment}
  deletePost={handleDeleteComment}
  reactPost={handleReactComment}
  reportPost={handleReportComment}
  createBookmark={handleCreateBookmark}
  deleteBookmark={handleDeleteBookmark}
/>
```
