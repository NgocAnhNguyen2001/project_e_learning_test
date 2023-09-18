# Parent Post

Forum post

![](./readmeIMG/2023-02-14-15-55-49.png)

## Props

```js
interface Props {
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
  setSelectedCategory?: (value: { id: string, label: string }) => void;
}
```

## Example

```js
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
```
