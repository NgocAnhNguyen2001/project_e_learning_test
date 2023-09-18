# Reply Field

Forum post and comments reply input field

![](./readmeIMG/2023-02-14-16-02-03.png)

## Props

```js
interface Props {
  avatarImage: string;
  parentPostId?: string;
  replyUser?: string;
  replyUserId?: string;
  replyMessage?: string;
  isSubcomment?: boolean;
  placeholder: string;
  registration?: Partial<UseFormRegisterReturn>;
}
```

## Example

```js
<ReplyField
  avatarImage={
    user?.student?.avatarImage?.url
      ? user?.student.avatarImage.url
      : "/images/common/default.png"
  }
  placeholder="What's on your mind today?"
  registration={{ ...register("text") }}
/>
```
