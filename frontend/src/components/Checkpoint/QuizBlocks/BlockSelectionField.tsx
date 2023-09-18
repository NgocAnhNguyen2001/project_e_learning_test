import clsx from "clsx";
import * as React from "react";
import { HiOutlineTrash } from "react-icons/hi";


import { BlockInputField } from "@/components/Form";
import { CheckboxField } from "@/components/Form/CheckboxField";
import { DropzoneField } from "@/components/Form/DropzoneField";
import { RadioField } from "@/components/Form/RadioField";
import { Blocks } from "@/types/Blocks";
import { AnswerQuantityType, AnswerType } from "schema/generated/graphql";

interface IBlockSelectionField {
  updateSelectionText: any;
  index: number;
  updateSelectionAns: any;
  selection: any;
  block: Blocks;
  answerQuantityType: AnswerQuantityType;
  answerType: AnswerType;
  updateFileForBlock?: any;
  existingFile?: string;
  currentBlocks?: any;
  deleteSelection: any;
}

export const BlockSelectionField = ({
  updateSelectionText,
  updateSelectionAns,
  index = 0,
  selection,
  block,
  answerQuantityType,
  answerType,
  updateFileForBlock,
  existingFile,
  currentBlocks,
  deleteSelection,
}: IBlockSelectionField): React.ReactElement => {
  const changeSelectionText = (id: string | number, text: string): void => {
    updateSelectionText(block.id, id, text);
  };

  const changeSelectionIsAns = (id: string | number, value: boolean): void => {
    updateSelectionAns(block.id, id, value);
  };

  const changeFileForBlockPerSelection = (
    id: string | number,
    value: File,
  ): void => {
    updateFileForBlock(block.id, id, value);
  };

  const deleteSelectionHandler = (id: string | number): void => {
    deleteSelection(block.id, id);
  };

  return (
    <div className={clsx("flex flex-row gap-2", block.quizType=="OBJECTIVE" && "quiz_block_2" , block.quizType=="HEARING" && "quiz_block_3")} key={selection.id}>
      <div className="w-full">
        <div className="flex flex-row justify-between items-center">
          <label htmlFor="title" className="">
            Selection {index + 1}
          </label>
          <HiOutlineTrash
            color="red"
            className="mr-2 cursor-pointer"
            onClick={(): void => deleteSelectionHandler(selection.id)}
          />
        </div>
        {answerType === AnswerType.Text ? (
          <BlockInputField
            required
            type="text"
            placeholder="Text"
            onChange={changeSelectionText}
            id={selection.id}
            value={selection.text}
          />
        ) : (
          <DropzoneField
            id={selection.id}
            onChange={changeFileForBlockPerSelection}
            fieldName="thumbnail"
            size="full"
            variant="dark"
            className="w-full"
            accept="image/*"
            existingFile={existingFile ?? block.mediaBlock?.asset.name}
            currentBlocks={currentBlocks}
          />
        )}
      </div>
      <div>
        <label htmlFor="employer" className="">
          Ans?
        </label>
        {answerQuantityType === AnswerQuantityType.Multiple ? (
          <CheckboxField
            onChange={changeSelectionIsAns}
            id={selection.id}
            value={selection.isCorrect}
            className="navigator_tour_60"
          />
        ) : (
          <RadioField
            onChange={changeSelectionIsAns}
            id={selection.id}
            quizType={block.quizType}
            isChecked={selection.isCorrect}
            groupName={`${selection.id}-${block.id}-group`}
          />
        )}
      </div>
    </div>
  );
};

export default BlockSelectionField;
