# Quiz Content Card

Used to add a quiz block

![](2023-02-14-11-35-06.png)

## Props

```js
interface Props {
  className?: string;
  name?: string;
  onClick?: any;
}
```

## Example

```js
<QuizContentCard
  name={"Drag & Drop"}
  className="h-full max-w-md col-span-1 navigator_tour_50"
  onClick={createDragAndDropBlock}
/>
```
