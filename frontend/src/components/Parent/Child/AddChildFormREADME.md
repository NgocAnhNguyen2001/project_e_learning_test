# Add Child Form

Add child form for parents

![](./readmeIMG/2023-02-21-17-11-06.png)

## Props

```js
interface Props {
  onSubmit: (data: CreateChildInput) => void;
}
```

## Example

```js
<AddChildForm onSubmit={childSubmit} />
```
