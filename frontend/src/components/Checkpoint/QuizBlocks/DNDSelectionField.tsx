import * as React from "react";
import { HiOutlineTrash } from "react-icons/hi";


import { BlockInputField } from "@/components/Form";
import { SelectFieldNoControl } from "@/components/Form/SelectFieldNoControl";
import { Blocks } from "@/types/Blocks";
import { AnswerQuantityType, AnswerType } from "schema/generated/graphql";

interface IDNDSelectionField {
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
  questions?: number;
}

export const DNDSelectionField = ({
  updateSelectionText,
  updateSelectionAns,
  index = 0,
  selection,
  block,
  deleteSelection,
  questions,
}: IDNDSelectionField): React.ReactElement => {
  const changeSelectionText = (id: string | number, text: string): void => {
    updateSelectionText(block.id, id, text);
  };

  const changeSelectionIsAns = (id: string | number, order: number): void => {
    updateSelectionAns(block.id, id, order);
  };

  const deleteSelectionHandler = (id: string | number): void => {
    deleteSelection(block.id, id);
  };

  const questionOptions = React.useMemo(() => {
    if (questions) {
      const arr = Array(questions)
        .fill(0)
        .map((_, index) => {
          return {
            label: `Block ${index + 1}`,
            value: index,
          };
        });
      arr.push({
        label: "None",
        value: -1,
      });
      return arr;
    }
    return [];
  }, [questions]);

  return (
    <div className="flex flex-row gap-2 quiz_block" key={selection.id}>
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
        <BlockInputField
          required
          type="text"
          placeholder="Text"
          onChange={changeSelectionText}
          id={selection.id}
          value={selection.text}
        />
      </div>
      <div>
        <label htmlFor="employer" className="">
          Ans?
        </label>
        <SelectFieldNoControl
          options={questionOptions}
          setValue={(data): any => changeSelectionIsAns(selection.id, data)}
          defaultValue={
            selection.order !== null || selection.order !== undefined
              ? selection.order === -1
                ? {
                    label: `None`,
                    value: selection.order,
                  }
                : {
                    label: `Block ${selection.order + 1}`,
                    value: selection.order,
                  }
              : {
                  label: `None`,
                  value: -1,
                }
          }
          placeholder="For"
          className="w-36 navigator_tour_54"
        />
      </div>
    </div>
  );
};

export default DNDSelectionField;
