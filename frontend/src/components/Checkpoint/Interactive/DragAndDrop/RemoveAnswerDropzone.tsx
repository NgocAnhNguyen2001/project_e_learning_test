import * as React from "react";
import { useDrop } from "react-dnd";

import { ItemTypes } from "@/types/ItemTypes";
import { QuestionSelection } from "schema/generated/graphql";


interface IRemoveAnswerDropzone {
  children?: any;
  selectedAnswers: QuestionSelection[][];
  setSelectedAnswers: React.Dispatch<
    React.SetStateAction<QuestionSelection[][]>
  >;
}

export const RemoveAnswerDropzone = ({
  children,
  selectedAnswers,
  setSelectedAnswers,
}: IRemoveAnswerDropzone): React.ReactElement => {
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.ANSWER,
      drop: async (item: QuestionSelection): Promise<void> => {
        // Remove from answers
        if (selectedAnswers) {
          const temp = [...selectedAnswers];
          // temp[index] = undefined as any;
          const innerIndex = temp[(item as any).index]
            ? temp[(item as any).index].findIndex(
                (ans) => ans && ans.id === item.id,
              )
            : -1;

          if (innerIndex !== -1) {
            temp[(item as any).index].splice(innerIndex, 1);
            setSelectedAnswers(temp);
          }
        }
      },
    }),
    [selectedAnswers],
  );
  return (
    <div
      className="flex flex-row mt-8 items-center justify-center flex-wrap"
      ref={drop}
    >
      {children}
    </div>
  );
};

export default RemoveAnswerDropzone;
