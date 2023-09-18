/* eslint-disable jsx-a11y/media-has-caption */
import * as React from "react";

import { Button } from "@/components/Elements";
import { Card } from "@/components/Elements/Card";
import { deserialize } from "@/utils/slate";
import {
  AnswerQuantityType,
  AnswerType,
  FileType,
  QuestionBlock,
  QuestionSelection,
} from "schema/generated/graphql";

interface IObjectiveQuestion {
  block: QuestionBlock;
  selectedAnswers: QuestionSelection[];
  setSelectedAnswers: React.Dispatch<React.SetStateAction<QuestionSelection[]>>;
}

export const ObjectiveQuestion = ({
  block,
  selectedAnswers,
  setSelectedAnswers,
}: IObjectiveQuestion): React.ReactElement => {
  const selectAnswer = (selection: QuestionSelection): void => {
    const exists = selectedAnswers.find((ans) => ans.id === selection.id);
    if (block.answerQuantityType === AnswerQuantityType.Single && !exists) {
      setSelectedAnswers([selection]);
    } else if (block.answerQuantityType === AnswerQuantityType.Multiple) {
      if (exists) {
        const temp = selectedAnswers.filter((ans) => ans.id !== selection.id);
        setSelectedAnswers(temp);
      } else {
        const temp = [...selectedAnswers];
        temp.push(selection);
        setSelectedAnswers(temp);
      }
    }
  };
  return (
    <div className="">
      <h1 className="mb-8 text-3xl font-extrabold lg:text-4xl">
        {block.title}
      </h1>
      {/* Preview Quiz Image/Video */}
      {block.asset &&
        ((block as any).asset?.fileType === FileType.Image ? (
          <img src={block.asset?.url} alt="" />
        ) : (
          <video
            src={block.asset?.url}
            controls
            className="w-full aspect-video rounded-2xl"
          />
        ))}
      {block.description && (
        <div className="flex flex-col my-6">
          {deserialize(block.description)}
        </div>
      )}
      <p className="my-6 text-base font-bold opacity-80 lg:text-lg">
        {block.answerQuantityType === AnswerQuantityType.Single
          ? "Select one answer only"
          : "Select multiple answers"}
      </p>
      {block.answerType === AnswerType.Text ? (
        <div className="grid gap-4 pb-32 lg:gap-6 md:grid-cols-2">
          {block.selections &&
            block.selections.map((selection, index) => (
              <Button
                className="flex flex-row items-center w-full px-4 py-4 font-extrabold cursor-pointer lg:px-6"
                variant={
                  selectedAnswers.find((ans) => ans.id === selection.id)
                    ? "answer-selected"
                    : "answer"
                }
                justify="start"
                uppercase={false}
                onClick={(): void => selectAnswer(selection)}
                key={selection.id}
              >
                <div className="flex flex-row items-center">
                  <Card className="px-4 py-2 mr-4" rounded="xl">
                    {index + 1}
                  </Card>
                  {selection.text}
                </div>
              </Button>
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {block.selections &&
            block.selections.map((selection) => (
              <Button
                className="flex justify-center w-full my-2 font-extrabold cursor-pointer lg:min-h-[200px] xl:min-h-[300px]"
                variant={
                  selectedAnswers.find((ans) => ans.id === selection.id)
                    ? "answer-selected"
                    : "answer"
                }
                justify="start"
                uppercase={false}
                onClick={(): void => selectAnswer(selection)}
                size="xs"
                key={selection.id}
              >
                <div className="flex items-center justify-center w-full aspect-square">
                  <img src={selection.asset?.url} alt="" />
                </div>
              </Button>
            ))}
        </div>
      )}
    </div>
  );
};

export default ObjectiveQuestion;
