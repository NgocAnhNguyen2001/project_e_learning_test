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
} from "schema/generated/graphql";

interface IObjectivePreview {
  block: QuestionBlock;
}

const getLatestAsset = (
  block: QuestionBlock,
): [
  string | null, // url
  boolean, // isImage
] => {
  if ((block as any).file === null) return [null, false];
  if ((block as any).file)
    return [
      URL.createObjectURL((block as any).file),
      (block as any).file.type.includes("image"),
    ];
  return [block.asset?.url ?? null, block.asset?.fileType === FileType.Image];
};

export const ObjectivePreview = ({
  block,
}: IObjectivePreview): React.ReactElement => {
  const [currentFileUrl, isImage] = getLatestAsset(block);
  return (
    <>
      <h1 className="mb-8 text-xl font-extrabold lg:text-2xl">{block.title}</h1>
      {/* Preview Quiz Image/Video */}
      {currentFileUrl ? (
        isImage ? (
          <img src={currentFileUrl} alt="" />
        ) : (
          <video
            src={currentFileUrl}
            controls
            className="w-full aspect-video rounded-2xl"
          />
        )
      ) : null}
      <p className="my-6 text-base font-bold opacity-80 lg:text-lg">
        {block.answerQuantityType === AnswerQuantityType.Single
          ? "Select one answer only"
          : "Select multiple answers"}
      </p>
      {block.description && (
        <div className="flex flex-col my-6">
          {deserialize(block.description)}
        </div>
      )}
      {block.answerType === AnswerType.Text ? (
        <div className="flex flex-col">
          {block.selections &&
            block.selections.map((selection, index) => (
              <Button
                className="flex flex-row items-center w-full my-1 font-extrabold cursor-pointer"
                variant="answer"
                justify="start"
                size="sm"
                uppercase={false}
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
        <div className="grid grid-cols-2 gap-4">
          {block.selections &&
            block.selections.map((selection) => (
              <Button
                className="flex flex-row items-center w-full my-1 font-extrabold cursor-pointer"
                variant="answer"
                justify="start"
                uppercase={false}
                size="xs"
                key={selection.id}
              >
                <div className="flex items-center justify-center w-32 aspect-square">
                  <img
                    src={
                      (selection as any).file
                        ? URL.createObjectURL((selection as any).file)
                        : selection.asset?.url
                    }
                    alt=""
                  />
                </div>
              </Button>
            ))}
        </div>
      )}
    </>
  );
};

export default ObjectivePreview;
