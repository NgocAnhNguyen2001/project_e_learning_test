/* eslint-disable jsx-a11y/media-has-caption */
import * as React from "react";

import { Button } from "@/components/Elements";
import { deserialize } from "@/utils/slate";
import { FileType, QuestionBlock } from "schema/generated/graphql";

interface IMatchingPreview {
  block: QuestionBlock;
  isText?: boolean;
}

enum State {
  NEUTRAL = "NEUTRAL",
  SELECTED = "SELECTED",
  CORRECT = "CORRECT",
  WRONG = "WRONG",
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

export const MatchingPreview = ({
  block,
  isText,
}: IMatchingPreview): React.ReactElement => {
  const [leftPairs, setLeftPairs] = React.useState<any[]>([]);
  const [rightPairs, setRightPairs] = React.useState<any[]>([]);
  const blockData = JSON.stringify(block);

  React.useEffect(() => {
    if (block && block.pairs) {
      const tempLeft: any = [];
      const tempRight: any = [];
      block.pairs.forEach((pair: any) => {
        if (pair && pair.pair) {
          if (isText) {
            tempLeft.push({
              id: pair.id,
              text: pair.pair[0],
              state: State.NEUTRAL,
            });
          } else {
            tempLeft.push({
              id: pair.id,
              img: pair.img ?? pair.asset?.url ?? "",
              state: State.NEUTRAL,
            });
          }
          tempRight.push({
            id: pair.id,
            text: pair.pair[1],
            state: State.NEUTRAL,
          });
        }
      });
      setLeftPairs(tempLeft);
      setRightPairs(tempRight);
    }
  }, [block, blockData, isText]);

  const [currentFileUrl, isImage] = getLatestAsset(block);
  return (
    <>
      <h1 className="font-extrabold text-xl lg:text-2xl my-6 mb-8">
        Select the matching pairs
      </h1>
      {block.description && (
        <div className="my-6 flex flex-col">
          {deserialize(block.description)}
        </div>
      )}
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
      <div className="grid grid-cols-2">
        <div className="flex flex-col col-span-1 px-4 border-dashed border-r-2 border-gray-400">
          {leftPairs &&
            leftPairs.map((pair, index) => (
              <Button
                className={`w-full ${
                  isText ? "py-4 px-4 lg:px-6" : "px-0 py-0"
                } flex flex-row font-extrabold items-center my-2 cursor-pointer flex-wrap break-words`}
                variant="answer"
                justify="start"
                size={isText ? "md" : "sm"}
                uppercase={false}
                key={pair + index}
              >
                <div className="flex items-center justify-center w-32 aspect-square">
                  {isText ? (
                    pair.text
                  ) : (
                    <img
                      src={pair.img ?? pair.asset?.url ?? ""}
                      alt=""
                      className="w-full"
                    />
                  )}
                </div>
              </Button>
            ))}
        </div>
        <div className="flex flex-col col-span-1 px-4">
          {rightPairs &&
            rightPairs.map((pair, index) => (
              <Button
                className={`w-full  ${
                  isText ? "py-4 px-4 lg:px-6" : "px-0 py-0"
                } flex flex-row font-extrabold items-center my-2 cursor-pointer flex-wrap break-words`}
                variant="answer"
                size={isText ? "md" : "sm"}
                justify="start"
                uppercase={false}
                key={pair + index}
              >
                <div className="flex items-center justify-center w-32 aspect-square">
                  {pair.text}
                </div>
              </Button>
            ))}
        </div>
      </div>
    </>
  );
};

export default MatchingPreview;
