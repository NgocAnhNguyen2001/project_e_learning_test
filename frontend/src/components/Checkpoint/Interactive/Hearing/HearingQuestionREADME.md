# Hearing Question

Used in a quiz for a hearing question

![](./readmeIMG/2023-02-07-10-18-52.png)

## Props

```js
Props {
  block: QuestionBlock;
  selectedAnswers: QuestionSelection[];
  setSelectedAnswers: React.Dispatch<React.SetStateAction<QuestionSelection[]>>;
}
```

## Example

```js
<HearingQuestion
  block={questions[progress].questionBlock}
  selectedAnswers={selectedAnswers}
  setSelectedAnswers={setSelectedAnswers}
/>
```
