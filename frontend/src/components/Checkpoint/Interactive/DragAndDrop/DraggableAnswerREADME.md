# Draggable answer

Single draggable answer for drag and drop questions

![](./imgsREADME/2023-02-07-10-02-12.png)

## Props

```js
Props {
  selection: QuestionSelection;
  type?: ItemTypes;
  disabled?: boolean; // This is to keep track if the answer has been already selected. If it is, we just gray it out.
  index?: number;
}
```

## Example

```js
<DraggableAnswer
  key={selection.id}
  selection={selection}
  disabled={
    !!selectedAnswers.find(
      (ans) => ans && ans.some((a) => a && a.id === selection.id),
    )
  }
/>
```
