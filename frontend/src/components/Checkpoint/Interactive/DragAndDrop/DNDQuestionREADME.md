# DND Question

Drag and drop question in quizzes

![](./imgsREADME/2023-02-07-09-53-23.png)

## Props

```js
Props {
  block: QuestionBlock;
  selectedAnswers: QuestionSelection[][];
  setSelectedAnswers: React.Dispatch<
    React.SetStateAction<QuestionSelection[][]>
  >;
}
```

## Example

```js
<DNDQuestion
  block={questions[progress].questionBlock}
  selectedAnswers={selectedAnswers}
  setSelectedAnswers={setSelectedAnswers}
/>
```
