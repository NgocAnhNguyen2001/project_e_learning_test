# Friend Section

Preview of list of friends

![](./readmeIMG/2023-02-22-11-15-41.png)

## Props

```js
interface Props {
  friends: Student[];
  setDisplayTab: (value: "MAIN" | "FRIENDS" | "JOURNAL" | "COURSES") => void;
}
```

## Example

```js
<FriendSection friends={friends} setDisplayTab={setDisplayTab} />
```
