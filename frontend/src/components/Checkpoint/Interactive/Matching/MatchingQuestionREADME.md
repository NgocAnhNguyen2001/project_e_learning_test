# Matching Question

Used in a quiz for a matching question

![](./readmeIMG/2023-02-07-10-30-30.png)

## Props

```js
Props {
  block: QuestionBlock;
  selectedAnswers: QuestionSelection[];
  setSelectedAnswers: React.Dispatch<React.SetStateAction<QuestionSelection[]>>;
  courseId: string;
}

```

## Example

```js
<MatchingQuestion
  courseId={checkpoint.course?.id as string}
  block={questions[progress].questionBlock}
  selectedAnswers={selectedAnswers}
  setSelectedAnswers={setSelectedAnswers}
/>
```
