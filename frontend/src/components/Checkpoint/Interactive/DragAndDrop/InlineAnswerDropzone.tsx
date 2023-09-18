import clsx from "clsx";
import * as React from "react";
import { useDrop } from "react-dnd";

import { ItemTypes } from "@/types/ItemTypes";
import { QuestionSelection } from "schema/generated/graphql";

import DraggableAnswer from "./DraggableAnswer";


interface IInlineAnswerDropzone {
  selectedAnswers: QuestionSelection[][];
  setSelectedAnswers: React.Dispatch<
    React.SetStateAction<QuestionSelection[][]>
  >;
  index: number;
}

export const InlineAnswerDropzone = ({
  selectedAnswers,
  setSelectedAnswers,
  index,
}: IInlineAnswerDropzone): React.ReactElement => {
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.ANSWER,
      drop: async (item: QuestionSelection): Promise<void> => {
        // First, we check if its already part of the answers.
        // If yes, then we dont need to add it again
        if (selectedAnswers) {
          if (
            selectedAnswers[index]
              ? !selectedAnswers[index].find((ans) => ans && ans.id === item.id)
              : true
            // !selectedAnswers.find((ans) => ans && ans.id === item.id)
          ) {
            const newAns = [...selectedAnswers];
            item.order = index;
            // newAns[index] = item;
            if (!newAns[index]) {
              newAns[index] = [];
            }
            newAns[index].push(item);
            setSelectedAnswers(newAns);
          }
        }
      },
    }),
    [selectedAnswers],
  );
  return (
    <div
      className={clsx(
        "flex flex-row min-w-3xs w-max border-b-2 border-b-gray-300 border-opacity-40 h-full",
      )}
      ref={drop}
    >
      &nbsp;
      {selectedAnswers &&
        selectedAnswers[index] &&
        selectedAnswers[index].map((selection) => (
          <DraggableAnswer
            key={selection.id}
            selection={selection}
            index={index}
          />
        ))}
    </div>
  );
};

export default InlineAnswerDropzone;
