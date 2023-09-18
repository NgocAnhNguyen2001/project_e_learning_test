# Forum Layout

Forum layout wrapper that shows forum categories

![](./readmeIMG/2023-02-21-16-08-28.png)

## Props

```js
interface Props {
  selectedCategory: any;
  setSelectedCategory: (value: any) => void;
  children: React.ReactChild;
}
```

## Example

```js
<ForumLayout
  selectedCategory={selectedCategory}
  setSelectedCategory={setSelectedCategory}
>
  {children}
</ForumLayout>
```
