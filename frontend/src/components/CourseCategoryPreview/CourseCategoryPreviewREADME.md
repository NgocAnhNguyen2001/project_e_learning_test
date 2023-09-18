# Course Category Preview

Course Category preview which allows user to filter courses

![](./readmeIMG/2023-02-15-16-22-18.png)

## Props

```js
interface Props {
  categoryValue: any[];
  setCategory: (value: any) => void;
  categoryPreviews?: any[];
  className?: string;
  isMobile?: boolean;
  memoTenant: any;
}
```

## Example

```js
<CourseCategoryPreview
  categoryValue={category}
  setCategory={setCategory}
  categoryPreviews={categoryOptions}
  isMobile={isMobile}
/>
```
