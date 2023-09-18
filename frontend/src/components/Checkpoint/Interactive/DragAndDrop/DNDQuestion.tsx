/* eslint-disable jsx-a11y/media-has-caption */
import * as React from "react";

import { deserializeDNDQuestion } from "@/utils/slate";
import {
  FileType,
  QuestionBlock,
  QuestionSelection,
} from "schema/generated/graphql";

import DraggableAnswer from "./DraggableAnswer";
import RemoveAnswerDropzone from "./RemoveAnswerDropzone";
import { ReactDndProvider } from "@/components/Common/useReactDnDBackend";

interface IDNDQuestion {
  block: QuestionBlock;
  selectedAnswers: QuestionSelection[][];
  setSelectedAnswers: React.Dispatch<
    React.SetStateAction<QuestionSelection[][]>
  >;
}

export const DNDQuestion = ({
  block,
  selectedAnswers,
  setSelectedAnswers,
}: IDNDQuestion): React.ReactElement => {
  return (
    <ReactDndProvider>
      {/* Preview Quiz Image/Video */}
      {block.asset &&
        ((block as any).asset?.fileType === FileType.Image ? (
          <img src={block.asset?.url} className="m-auto max-h-[50vh]" alt="" />
        ) : (
          <video
            src={block.asset?.url}
            controls
            className="w-full aspect-video rounded-2xl m-auto max-h-[50vh]"
          />
        ))}
      <p className="mt-6 text-base font-bold opacity-80 lg:text-lg w-9/12">
        Drag and drop the best answer
      </p>
      <p className="text-xl lg:text-2xl space-y-0 my-0 h-max	">
        {deserializeDNDQuestion(
          block.title || "",
          selectedAnswers,
          setSelectedAnswers,
        )}
      </p>
      <div className="relative">
        <RemoveAnswerDropzone
          selectedAnswers={selectedAnswers}
          setSelectedAnswers={setSelectedAnswers}
        >
          {block.selections &&
            block.selections.map((selection) => (
              <DraggableAnswer
                key={selection.id}
                selection={selection}
                disabled={
                  !!selectedAnswers.find(
                    (ans) => ans && ans.some((a) => a && a.id === selection.id),
                  )
                }
              />
            ))}
        </RemoveAnswerDropzone>
      </div>
    </ReactDndProvider>
  );
};

export default DNDQuestion;
