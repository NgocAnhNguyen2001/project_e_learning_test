# Quiz Objective

Used to create quiz objective block, type question title, add selections and see preview of the block

![](./readmeIMG/2023-02-13-05-16-57.png)

## Props

```js
interface Props {
  id: string | number;
  onClick?: any;
  index?: number;
  onChange?: any;
  block: Blocks;
  selectionTextOnChange: any;
  selectionMultipleAnsOnChange: any;
  selectionSingleAnsOnChange: any;
  blockDescOnChange: any;
  updateTypeOfAnswer: any;
  updateQuantityOfAnswer: any;
  updateFileForBlockPerSelection: any;
  currentBlocks?: any;
  updateFileForBlock: any;
  deleteSelection: any;
}
```

## Example

```js
<QuizObjective
  id={block.id}
  index={index}
  block={block}
  updateFileForBlock={updateFileForBlock}
  onChange={updateBlockTitle}
  onClick={addBlockSelection}
  selectionTextOnChange={updateSelectionTitle}
  selectionMultipleAnsOnChange={updateSelectionAns}
  selectionSingleAnsOnChange={updateSelectionSingleAns}
  blockDescOnChange={updateQuestionDescription}
  updateTypeOfAnswer={updateTypeOfAnswer}
  updateQuantityOfAnswer={updateQuantityOfAnswer}
  updateFileForBlockPerSelection={updateFileForBlockPerSelection}
  currentBlocks={currentBlocks}
  deleteSelection={deleteSelection}
/>
```
