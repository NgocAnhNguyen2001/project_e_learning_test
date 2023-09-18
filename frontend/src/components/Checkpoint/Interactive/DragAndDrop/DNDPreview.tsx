/* eslint-disable jsx-a11y/media-has-caption */
import * as React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


import { Button } from "@/components/Elements";
import { deserialize } from "@/utils/slate";
import { FileType, QuestionBlock } from "schema/generated/graphql";

interface IDNDPreview {
  block: QuestionBlock;
}

const getLatestAsset = (block: QuestionBlock): [
  string | null, // url
  boolean, // isImage
] => {
  if((block as any).file === null) return [null, false];
  if((block as any).file) return [
    URL.createObjectURL((block as any).file),
    (block as any).file.type.includes("image"),
  ];
  return [
    block.asset?.url ?? null,
    block.asset?.fileType === FileType.Image,
  ];
}

export const DNDPreview = ({ block }: IDNDPreview): React.ReactElement => {
  const [currentFileUrl, isImage] = getLatestAsset(block);
  return (
    <DndProvider backend={HTML5Backend}>
      {/* Preview Quiz Image/Video */}
      {currentFileUrl ? (
        isImage ? (
          <img
           src={currentFileUrl}
           className="m-auto max-h-[50vh]"
            alt=""
            />
        ) : (
          <video
            src={currentFileUrl}
            controls
            className="w-full aspect-video rounded-2xl m-auto max-h-[50vh]"
          />
        )
      ) : null}
      <p className="mt-6 mb-8 text-base font-bold opacity-80 lg:text-lg">
        Drag and drop the best answer
      </p>
      {block.title && (
        <div className="my-6 flex flex-col">{deserialize(block.title)}</div>
      )}
      {/* <div className="items-end justify-center pt-40">
        &nbsp;
        <Divider />
      </div> */}
      <div className="flex flex-row flex-wrap items-center justify-center mt-8">
        {block.selections &&
          block.selections.map((selection) => (
            <Button className="mx-2 mb-2" variant="answer" key={selection.id} uppercase={false}>
              {selection.text}
            </Button>
          ))}
      </div>
    </DndProvider>
  );
};

export default DNDPreview;
