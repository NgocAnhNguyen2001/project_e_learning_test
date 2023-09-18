import { Blocks, Subtitles } from "@/types/Blocks";
import React from "react";
import { cloneDeep } from "lodash";
import { DropzoneField } from "../Form/DropzoneField";
import { InputField } from "../Form/InputField";

interface Props {
  subtitle: Subtitles;
  subtitleIndex: number;
  block: Blocks;
  blockIndex: number;
  currentBlocks: Blocks[];
  setCurrentBlocks: (value: Blocks[]) => void;
}

export const SubtitleCreate: React.FC<Props> = (props) => {
  const {
    block,
    currentBlocks,
    blockIndex,
    subtitle,
    setCurrentBlocks,
    subtitleIndex,
  } = props;

  const updateSubtitleFileForBlock = (
    id: string | number,
    fileUpload: File,
    idx: number,
    title: string,
  ): void => {
    const blocks = [...currentBlocks];
    const index = blocks.findIndex((block) => block.id === id);
    if (index !== -1) {
      const temp = blocks[index];
      if (!temp.subtitles) {
        temp.subtitles = [];
      }
      temp.subtitles[idx] = { fileUpload, language: title };
      blocks[index] = temp;
      setCurrentBlocks(blocks);
    }
  };

  return (
    <>
      <label htmlFor="media" className="flex flex-row justify-between w-full">
        Subtitle VTT file
      </label>
      <DropzoneField
        id={block.id}
        onChange={(id: string | number, file: File): void =>
          updateSubtitleFileForBlock(
            id,
            file,
            subtitleIndex,
            subtitle.language ?? "en",
          )
        }
        fieldName="media"
        size="full"
        variant="dark"
        className="w-fit"
        accept=".vtt"
        existingFile={
          subtitle.url ? `${block.mediaBlock?.asset.name} subtitle` : null
        }
        currentBlocks={currentBlocks}
      />
      <InputField
        required
        type="text"
        placeholder="Language"
        value={subtitle.language}
        onChange={(e): void => {
          setCurrentBlocks(
            currentBlocks.map((block, i) => {
              if (blockIndex == i) {
                const temp: Blocks = cloneDeep(block);
                if (temp.subtitles?.[subtitleIndex])
                  temp.subtitles[subtitleIndex].language = e.target
                    .value as string;
                return temp;
              }
              return block;
            }),
          );
        }}
      />
    </>
  );
};
