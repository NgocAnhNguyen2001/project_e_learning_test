# Child Form

child form for parents

![](./readmeIMG/2023-02-21-17-15-51.png)

## Props

```js
interface Props {
  onSubmit: (data: CreateChildInput) => void;
  onDelete?: () => void;
  child?: Child;
  type: "add" | "edit";
}
```

## Example

```js
<ChildForm type="add" onSubmit={props.onSubmit} />
```
