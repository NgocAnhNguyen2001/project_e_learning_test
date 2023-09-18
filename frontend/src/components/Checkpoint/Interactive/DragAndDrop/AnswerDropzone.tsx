import clsx from "clsx";
import * as React from "react";
import { useDrop } from "react-dnd";

import { Divider } from "@/components/Elements/Divider";
import { ItemTypes } from "@/types/ItemTypes";
import { QuestionSelection } from "schema/generated/graphql";

import DraggableAnswer from "./DraggableAnswer";


interface IAnswerDropzone {
  selectedAnswers: QuestionSelection[];
  setSelectedAnswers: React.Dispatch<React.SetStateAction<QuestionSelection[]>>;
}

export const AnswerDropzone = ({
  selectedAnswers,
  setSelectedAnswers,
}: IAnswerDropzone): React.ReactElement => {
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.ANSWER,
      drop: async (item: QuestionSelection): Promise<void> => {
        // First, we check if its already part of the answers.
        // If yes, then we dont need to add it again
        if (selectedAnswers) {
          if (!selectedAnswers.find((ans) => ans.id === item.id)) {
            const newAns = [...selectedAnswers];
            newAns.push(item);
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
        "h-full items-end justify-center",
        selectedAnswers && selectedAnswers.length > 0 ? "pt-32" : "pt-52",
      )}
      ref={drop}
    >
      &nbsp;
      <div className="flex flex-row">
        {selectedAnswers &&
          selectedAnswers.map((selection) => (
            <DraggableAnswer key={selection.id} selection={selection} />
          ))}
      </div>
      <Divider />
    </div>
  );
};

export default AnswerDropzone;
