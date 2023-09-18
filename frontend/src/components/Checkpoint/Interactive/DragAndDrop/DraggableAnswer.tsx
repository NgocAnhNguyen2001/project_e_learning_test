import * as React from "react";
import { useDrag } from "react-dnd";


import { Button } from "@/components/Elements";
import { ItemTypes } from "@/types/ItemTypes";
import { QuestionSelection } from "schema/generated/graphql";

interface IDraggableAnswer {
  selection: QuestionSelection;
  type?: ItemTypes;
  disabled?: boolean; // This is to keep track if the answer has been already selected. If it is, we just gray it out.
  index?: number;
}

export const DraggableAnswer = ({
  selection,
  type = ItemTypes.ANSWER,
  disabled = false,
  index,
}: IDraggableAnswer): React.ReactElement => {
  const [, drag] = useDrag({
    type: type,
    item: () => {
      return { ...selection, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <Button
      className="mx-2 mb-2"
      ref={disabled ? null : drag}
      variant={disabled ? "answer-disabled" : "answer"}
      disabled={disabled}
      uppercase={false}
    >
      {selection.text}
    </Button>
  );
};

export default DraggableAnswer;
