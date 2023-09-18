import * as React from "react";
import { HiOutlineTrash } from "react-icons/hi";

import { Button } from "@/components/Elements";
import { DropzoneField } from "@/components/Form/DropzoneField";
import { SlateField } from "@/components/Form/SlateField";
import { Blocks } from "@/types/Blocks";
import { AnswerQuantityType, AnswerType } from "schema/generated/graphql";

import { Card } from "../../Elements/Card";
import DNDPreview from "../Interactive/DragAndDrop/DNDPreview";

import DNDSelectionField from "./DNDSelectionField";


interface IQuizDragAndDrop {
  id?: any;
  onClick?: any;
  index?: number;
  onChange?: any;
  block: Blocks;
  selectionTextOnChange: any;
  selectionAnsOnChange: any;
  updateFileForBlock: any;
  currentBlocks: any;
  deleteSelection: any;
}

export const QuizDragAndDrop = ({
  id,
  onClick,
  onChange,
  index = 0,
  block,
  selectionTextOnChange,
  selectionAnsOnChange,
  updateFileForBlock,
  currentBlocks,
  deleteSelection,
}: IQuizDragAndDrop): React.ReactElement => {
  const SELECTIONS_CAP = 6; // This is where we cap the number of selections they can make

  const onChangeHandler = (data: string): void => {
    // Get the number of answer blanks
    const count = (data.match(/____/g) || []).length;
    // Update it in the block itself
    onChange(block.id, data, count);
  };
  const [resetEvent, setResetEvent] = React.useState<any>();

  return (
    <div>
      <p className="font-bold">Question {index + 1}: Drag &amp; Drop</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:space-x-24">
        <div className="flex flex-col justify-center col-span-1">
            <div className="col-span-2 text-black box">
              <Card className="gap-4 p-6 mt-2 bg-opacity-20">
                <div className="mb-4 relative">
                  <label htmlFor="desc" className="">
                    Question Title
                  </label>
                  <SlateField
                    id={block.id}
                    onChange={onChangeHandler}
                    data={block.title || ""}
                    answerField
                    className="navigator_tour_52"
                  />
                </div>
                <div>
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
                {block.selections &&
                  block.selections.map((selection, index) => (
                    <DNDSelectionField
                      index={index}
                      block={block}
                      selection={selection}
                      updateSelectionText={selectionTextOnChange}
                      updateSelectionAns={selectionAnsOnChange}
                      key={index}
                      answerQuantityType={"MULTIPLE" as AnswerQuantityType}
                      answerType={"TEXT" as AnswerType}
                      deleteSelection={deleteSelection}
                      questions={block.questions}
                    />
                  ))}
                {block.selections &&
                block.selections.length >= SELECTIONS_CAP ? null : (
                  <Button
                    variant="white"
                    className="w-full navigator_tour_53"
                    onClick={(): any => onClick(block.id)}
                  >
                    + Add Selection
                  </Button>
                )}
              </Card>
            </div>
        </div>
        <div className="h-max flex flex-col justify-center col-span-1 rounded-xl bg-bottom bg-fixed bg-no-repeat bg-cover bg-auth-dark overflow-hidden mt-6">
          <div className="h-max bg-dark-overlay bg-opacity-80 p-16 text-white navigator_tour_51">
            <DNDPreview block={block as any} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizDragAndDrop;
