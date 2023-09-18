import React from "react";
import { DndProvider, usePreview } from "react-dnd-multi-backend";
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import { Button } from "@/components/Elements";

const MyPreview = (): React.ReactElement | null => {
  const { display, item, style }: any = usePreview();
  if (!display) {
    return null;
  }
  return (
    <Button
      style={style}
      className="mx-2 mb-2 transition-none"
      variant={"answer"}
      disabled={true}
      uppercase={false}
    >
      {item.text}
    </Button>
  );
  // render your preview
};

export const ReactDndProvider: React.FC = (props): React.ReactElement => {
  return (
    <DndProvider options={HTML5toTouch}>
      {props.children}
      <MyPreview />
    </DndProvider>
  );
};
