import * as React from "react";
import { HiOutlineTrash } from "react-icons/hi";

import { Button } from "@/components/Elements";
import { BlockInputField } from "@/components/Form";
import { BlockSelectField } from "@/components/Form/BlockSelectField";
import { DropzoneField } from "@/components/Form/DropzoneField";
import { Blocks } from "@/types/Blocks";
import { QuantityOfAnswers, TypeOfAnswers } from "@/types/ObjectiveSelections";
import { AnswerQuantityType, AnswerType } from "schema/generated/graphql";

import { Card } from "../../Elements/Card";
import ObjectivePreview from "../Interactive/Objective/ObjectivePreview";

import BlockSelectionField from "./BlockSelectionField";
import { SlateField } from "@/components/Form/SlateField";

interface IQuizObjective {
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

export const QuizObjective = ({
  id,
  onClick,
  onChange,
  index = 0,
  block,
  selectionTextOnChange,
  selectionMultipleAnsOnChange,
  selectionSingleAnsOnChange,
  blockDescOnChange,
  updateTypeOfAnswer,
  updateQuantityOfAnswer,
  updateFileForBlockPerSelection,
  currentBlocks,
  updateFileForBlock,
  deleteSelection,
}: IQuizObjective): React.ReactElement => {
  const SELECTIONS_CAP = 8; // This is where we cap the number of selections they can make
  const [resetEvent, setResetEvent] = React.useState<any>();
  return (
    <div>
      <p className="font-bold">Question {index + 1}: Objective</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:space-x-24">
        <div className="flex flex-col justify-center col-span-1">
          <div className="col-span-2 text-black box">
            <Card className="gap-4 p-6 mt-2 bg-opacity-20">
              <div>
                <label htmlFor="desc" className="">
                  Checkpoint Title
                </label>
                <BlockInputField
                  required
                  type="text"
                  placeholder="Text"
                  id={block.id}
                  onChange={onChange}
                  value={block.title}
                  className="navigator_tour_56"
                />
              </div>
              <div className="col-span-2">
                <div className="flex justify-between">
                  <label htmlFor="quantityOfAnswers" className="">
                    Media File (optional)
                  </label>
                  <HiOutlineTrash
                    className="mr-5 cursor-pointer"
                    size={20}
                    color="#FF4B4B"
                    onClick={(): any => {
                      setResetEvent({
                        filename: null,
                      });
                      updateFileForBlock(block.id, null);
                    }}
                  />
                </div>
                <DropzoneField
                  id={id}
                  onChange={updateFileForBlock}
                  fieldName="thumbnail"
                  size="full"
                  variant="dark"
                  className="w-full"
                  accept="video/*, image/*"
                  existingFile={
                    block.questionBlock?.asset
                      ? block.questionBlock?.asset.name
                      : null
                  }
                  currentBlocks={currentBlocks}
                  resetEvent={resetEvent}
                />
              </div>
              <label htmlFor="questionDescription" className="">
                Question Description
              </label>
              <div className="relative mb-6">
                <SlateField
                  id="description"
                  onChange={(content: string): void =>
                    blockDescOnChange(block.id, content)
                  }
                  className="navigator_tour_64"
                  data={block.questionBlock?.description || ""}
                />
              </div>
              <div>
                <label htmlFor="typeOfAnswers" className="">
                  Type of Answers
                </label>
                <BlockSelectField
                  options={TypeOfAnswers}
                  fieldName="typeOfAnswers"
                  defaultValue={null}
                  value={block.answerType as string}
                  id={id}
                  onChange={updateTypeOfAnswer}
                  className="navigator_tour_57"
                />
              </div>
              <div>
                <label htmlFor="quantityOfAnswers" className="">
                  Quantity of Answers
                </label>
                <BlockSelectField
                  options={QuantityOfAnswers}
                  fieldName="quantityOfAnswers"
                  defaultValue={null}
                  value={block.answerQuantityType as string}
                  id={id}
                  onChange={updateQuantityOfAnswer}
                  className="navigator_tour_58"
                />
              </div>
              {block.selections &&
                block.selections.map((selection, index) => (
                  <BlockSelectionField
                    index={index}
                    block={block}
                    selection={selection}
                    updateSelectionText={selectionTextOnChange}
                    updateSelectionAns={
                      block.answerQuantityType === AnswerQuantityType.Multiple
                        ? selectionMultipleAnsOnChange
                        : selectionSingleAnsOnChange
                    }
                    existingFile={selection.asset?.name}
                    updateFileForBlock={updateFileForBlockPerSelection}
                    key={index}
                    answerQuantityType={
                      block.answerQuantityType as AnswerQuantityType
                    }
                    answerType={block.answerType as AnswerType}
                    currentBlocks={currentBlocks}
                    deleteSelection={deleteSelection}
                  />
                ))}
              {block.selections &&
              block.selections.length >= SELECTIONS_CAP ? null : (
                <Button
                  variant="white"
                  className="w-full navigator_tour_59"
                  onClick={(): any => onClick(block.id)}
                >
                  + Add Selection
                </Button>
              )}
            </Card>
          </div>
        </div>
        <div className="flex flex-col justify-center col-span-1 mt-6 overflow-hidden bg-fixed bg-bottom bg-no-repeat bg-cover h-max rounded-xl bg-auth-dark">
          <div className="p-16 text-white h-max bg-dark-overlay bg-opacity-80">
            <ObjectivePreview block={block as any} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizObjective;
