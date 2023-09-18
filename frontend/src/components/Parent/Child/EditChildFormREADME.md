# Edit Child Form

Edit child form for parents

![](./readmeIMG/2023-02-21-17-13-43.png)

## Props

```js
interface Props {
  onSubmit: (data: CreateChildInput) => void;
  onDelete: () => void;
  child: Child;
}
```

## Example

```js
<EditChildForm
  onSubmit={childSubmit}
  onDelete={childDelete}
  child={childResponse.data.child as any}
/>
```
