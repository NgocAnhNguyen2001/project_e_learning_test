/* eslint-disable jsx-a11y/media-has-caption */
import * as React from "react";

import { Button } from "@/components/Elements";
import { deserialize } from "@/utils/slate";
import {
  FileType,
  QuestionBlock,
  QuestionSelection,
} from "schema/generated/graphql";

interface IMatchingQuestion {
  block: QuestionBlock;
  selectedAnswers: QuestionSelection[];
  setSelectedAnswers: React.Dispatch<React.SetStateAction<QuestionSelection[]>>;
  courseId: string;
}

enum State {
  NEUTRAL = "NEUTRAL",
  SELECTED = "SELECTED",
  CORRECT = "CORRECT",
  WRONG = "WRONG",
}

const preAssesmentCourseId = [
  // "8e58fbaf-8ef2-4998-b020-d3538ad9be41",
  "797732f2-93ea-4b1a-a290-44a6969e1380", //preassess 2
  // "0100e569-e0d1-4105-a0a7-30e46096499f",
  "4b873a62-0076-4644-a6df-6e2784a0a54c", //preassess 1
  "0f70cfeb-c031-4ca6-8555-7f16a2515d5e", // staging
  // "b4b2b560-75a2-481c-b124-1962ab8fabf5", //dev
];

export const MatchingQuestion = ({
  block,
  setSelectedAnswers,
  courseId,
}: IMatchingQuestion): React.ReactElement => {
  const [leftPairs, setLeftPairs] = React.useState<any[]>([]);
  const [rightPairs, setRightPairs] = React.useState<any[]>([]);
  const [leftAns, setLeftAns] = React.useState<string | null>(null);
  const [rightAns, setRightAns] = React.useState<string | null>(null);
  const [isText, setIsText] = React.useState(false);

  const selectPair = (id: string, side: "LEFT" | "RIGHT"): void => {
    // If they select the same side, we override the existing selected ans

    if (side === "LEFT") {
      const index = leftPairs.findIndex((pair: any) => pair.id === id);
      if (leftAns != id && leftAns != null) {
        const prev_idx = leftPairs.findIndex(
          (pair: any) => pair.id === leftAns,
        );
        if (prev_idx + 1) {
          leftPairs[prev_idx].state = State.NEUTRAL;
          setLeftPairs(leftPairs);
          setLeftAns(null);
        }
      }
      if (leftPairs[index].state == State.SELECTED || leftAns == id) {
        leftPairs[index].state = State.NEUTRAL;
        setLeftPairs(leftPairs);
        setLeftAns(null);
      } else {
        setLeftAns(id);
        if (index !== -1) {
          leftPairs[index].state = State.SELECTED;
          setLeftPairs(leftPairs);
        }
      }
    } else {
      if (rightAns != id && rightAns != null) {
        const prev_idx = rightPairs.findIndex(
          (pair: any) => pair.id === rightAns,
        );
        if (prev_idx + 1) {
          rightPairs[prev_idx].state = State.NEUTRAL;
          setRightPairs(rightPairs);
          setRightAns(null);
        }
      }
      const index = rightPairs.findIndex((pair: any) => pair.id === id);
      if (rightPairs[index].state == State.SELECTED || rightAns == id) {
        rightPairs[index].state = State.NEUTRAL;
        setRightPairs(rightPairs);
        setRightAns(null);
      } else {
        setRightAns(id);
        if (index !== -1) {
          rightPairs[index].state = State.SELECTED;
          setRightPairs(rightPairs);
        }
      }
    }
  };

  React.useEffect(() => {
    // If both sides are selected, we check if correct and show whether they got it right or wrong
    if (leftAns && rightAns) {
      const leftIndex = leftPairs.findIndex((pair: any) => pair.id === leftAns);
      const rightIndex = rightPairs.findIndex(
        (pair: any) => pair.id === rightAns,
      );
      if (leftAns === rightAns) {
        leftPairs[leftIndex].state = State.CORRECT;
        setLeftPairs(leftPairs);
        rightPairs[rightIndex].state = State.CORRECT;
        setRightPairs(rightPairs);
      } else {
        // Show wrong for split second
        leftPairs[leftIndex].state = State.WRONG;
        setLeftPairs(leftPairs);
        rightPairs[rightIndex].state = State.WRONG;
        setRightPairs(rightPairs);
        if (!preAssesmentCourseId.includes(courseId)) {
          setTimeout(() => {
            // Here we could do the animation & state changing
            // The reason why we need to copy the array is because
            /**
             * As stated in this GitHub issue, setTimeout will use the value that it
             * was initially called with. In our example, this also makes sense as you
             * wouldn't want to send another message other than the one that was displayed
             * when you clicked the button.
             * https://github.com/facebook/react/issues/14010
             */
            const tempLeft = [...leftPairs];
            const tempRight = [...rightPairs];

            tempLeft[leftIndex].state = State.NEUTRAL;
            setLeftPairs(tempLeft);
            tempRight[rightIndex].state = State.NEUTRAL;
            setRightPairs(tempRight);
          }, 800);
        }
      }
      setSelectedAnswers(leftPairs);
      setLeftAns(null);
      setRightAns(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leftAns, rightAns]);

  const shuffle = (array: any[]): any[] => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  React.useEffect(() => {
    if (block && block.pairs) {
      const tempLeft: any = [];
      const tempRight: any = [];
      block.pairs.forEach((pair) => {
        setIsText(!pair?.isImage ?? false);
        if (pair && pair.pair) {
          if (!pair.isImage) {
            tempLeft.push({
              id: pair.id,
              text: pair.pair[0],
              state: State.NEUTRAL,
            });
          } else {
            tempLeft.push({
              id: pair.id,
              img: pair.asset?.url ?? "",
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

      shuffle(tempLeft);
      shuffle(tempRight);
      setLeftPairs(tempLeft);
      setRightPairs(tempRight);
    }
  }, [block]);

  return (
    <>
      <h1 className="font-extrabold text-3xl lg:text-4xl my-6 mb-8">
        Select the matching pairs
      </h1>
      {block.description && (
        <div className="flex flex-col my-6">
          {deserialize(block.description)}
        </div>
      )}
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
      <div className="grid grid-cols-2">
        <div className="flex flex-col col-span-1 px-4 border-dashed border-r-2 border-gray-400">
          {leftPairs &&
            leftPairs.map((pair, index) => (
              <Button
                className="w-full py-4 px-4 lg:px-6 flex flex-row font-extrabold items-center my-2 cursor-pointer flex-wrap break-words"
                variant={
                  pair.state === State.SELECTED
                    ? "answer-selected"
                    : pair.state === State.CORRECT
                    ? "answer-correct"
                    : pair.state === State.WRONG
                    ? "answer-wrong"
                    : "answer"
                }
                justify="start"
                uppercase={false}
                key={pair + index}
                onClick={(): void => selectPair(pair.id, "LEFT")}
                disabled={
                  pair.state === State.CORRECT ||
                  (preAssesmentCourseId.includes(courseId) &&
                    pair.state == State.WRONG)
                }
              >
                <div className="flex flex-row items-center justify-between w-full flex-wrap break-words">
                  <div className="flex items-center justify-center w-10/12">
                    {isText ? (
                      pair.text
                    ) : (
                      <img src={pair.img} alt="" className="w-full" />
                    )}
                  </div>
                  {pair.state === State.CORRECT ? (
                    <img
                      src="/images/feedback/check.svg"
                      alt=""
                      className="w-6 h-6"
                    />
                  ) : pair.state === State.WRONG ? (
                    <img
                      src="/images/feedback/cross.svg"
                      alt=""
                      className="w-6 h-6"
                    />
                  ) : null}
                </div>
              </Button>
            ))}
        </div>
        <div
          className={`flex flex-col ${
            !isText && "justify-evenly"
          } col-span-1 px-4`}
        >
          {rightPairs &&
            rightPairs.map((pair, index) => (
              <Button
                className="w-full py-4 px-4 lg:px-6 flex flex-row font-extrabold items-center my-2 cursor-pointer flex-wrap break-words"
                variant={
                  pair.state === State.SELECTED
                    ? "answer-selected"
                    : pair.state === State.CORRECT
                    ? "answer-correct"
                    : pair.state === State.WRONG
                    ? "answer-wrong"
                    : "answer"
                }
                justify="start"
                uppercase={false}
                key={pair + index}
                onClick={(): void => selectPair(pair.id, "RIGHT")}
                disabled={
                  pair.state === State.CORRECT ||
                  (preAssesmentCourseId.includes(courseId) &&
                    pair.state == State.WRONG)
                }
              >
                <div className="flex flex-row items-center justify-between w-full flex-wrap break-words">
                  {pair.text}
                  {pair.state === State.CORRECT ? (
                    <img
                      src="/images/feedback/check.svg"
                      alt=""
                      className="w-6 h-6"
                    />
                  ) : pair.state === State.WRONG ? (
                    <img
                      src="/images/feedback/cross.svg"
                      alt=""
                      className="w-6 h-6"
                    />
                  ) : null}
                </div>
              </Button>
            ))}
        </div>
      </div>
    </>
  );
};

export default MatchingQuestion;
