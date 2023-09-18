import * as React from "react";
import { HiOutlineTrash } from "react-icons/hi";




import { Button } from "@/components/Elements";
import { BlockInputField } from "@/components/Form";
import { DropzoneField } from "@/components/Form/DropzoneField";
import { SlateField } from "@/components/Form/SlateField";
import { Blocks } from "@/types/Blocks";
import { AnswerQuantityType, AnswerType } from "schema/generated/graphql";

import { Card } from "../../Elements/Card";
import HearingPreview from "../Interactive/Hearing/HearingPreview";

import BlockSelectionField from "./BlockSelectionField";

interface IQuizHearing {
  id: string | number;
  onClick?: any;
  index?: number;
  block: Blocks;
  onChange?: any;
  selectionTextOnChange: any;
  selectionSingleAnsOnChange: any;
  blockDescOnChange: any;
  updateFileForBlock: any;
  currentBlocks?: any;
  deleteSelection: any;
}

export const QuizHearing = ({
  id,
  onClick,
  index = 0,
  block,
  onChange,
  selectionTextOnChange,
  selectionSingleAnsOnChange,
  blockDescOnChange,
  updateFileForBlock,
  currentBlocks,
  deleteSelection,
}: IQuizHearing): React.ReactElement => {
  const SELECTIONS_CAP = 4; // This is where we cap the number of selections they can make
  const [resetEvent, setResetEvent] = React.useState<any>();
  return (
    <div>
      <p className="font-bold">Question {index + 1}: Hearing</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:space-x-24">
        <div className="flex flex-col justify-center">
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
                    className="navigator_tour_62"
                  />
                  <div className="flex justify-between">
                    <label htmlFor="quantityOfAnswers" className="">
                      Audio File
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
                    className="w-full navigator_tour_63"
                    accept="audio/*"
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
                {block.selections &&
                  block.selections.map((selection, index) => (
                    <BlockSelectionField
                      index={index}
                      block={block}
                      selection={selection}
                      updateSelectionText={selectionTextOnChange}
                      updateSelectionAns={selectionSingleAnsOnChange}
                      key={index}
                      answerQuantityType={
                        block.answerQuantityType as AnswerQuantityType
                      }
                      answerType={block.answerType as AnswerType}
                      deleteSelection={deleteSelection}
                    />
                  ))}
                {block.selections &&
                block.selections.length >= SELECTIONS_CAP ? null : (
                  <Button
                    variant="white"
                    className="w-full navigator_tour_65"
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
            <HearingPreview block={block as any} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizHearing;
