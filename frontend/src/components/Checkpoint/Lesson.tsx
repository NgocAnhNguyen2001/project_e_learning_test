import clsx from "clsx";
import { motion } from "framer-motion";
import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemState,
} from "react-accessible-accordion";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Control, FieldValues, UseFormRegister } from "react-hook-form";
import { HiOutlineChevronDown } from "react-icons/hi";
import { cloneDeep } from "lodash";

import { LessonContentCard } from "@/components/Checkpoint/LessonContentCard";
import { Blocks } from "@/types/Blocks";
import { deserialize } from "@/utils/slate";
import { sortAscending } from "@/utils/sorting";
import { Block, BlockType, BlockGeneralType } from "schema/generated/graphql";

import { BlockInputField } from "../Form";
import { DropzoneField } from "../Form/DropzoneField";
import { SlateField } from "../Form/SlateField";

import { BlockDNDWrapper } from "./BlockWrapper";
import { Button } from "../Elements";
import { SubtitlePreview } from "./SubtitlePreview";
import { SubtitleCreate } from "./SubtitleCreate";

// import { Divider } from "@/components/Elements/Divider";

interface IProps {
  courseId: string;
  blocks: Block[];
  control: Control<FieldValues, object>;
  register: UseFormRegister<FieldValues>;
  currentBlocks: Blocks[];
  setCurrentBlocks: React.Dispatch<React.SetStateAction<Blocks[]>>;
  toDelete: Blocks[];
  setToDelete: React.Dispatch<React.SetStateAction<Blocks[]>>;
  updateTourStep?: any;
}

const Lesson = ({
  blocks,
  courseId,
  currentBlocks,
  setCurrentBlocks,
  toDelete,
  setToDelete,
  updateTourStep,
}: IProps): React.ReactElement => {
  const buttonVariants = {
    plusClosed: { rotate: "0deg" },
    plusOpen: { rotate: "-180deg" },
  };

  const contentVariants = {
    contentClosed: { height: "0px", opacity: 0 },
    contentOpen: { height: "auto" },
  };

  React.useEffect(() => {
    if (blocks) {
      const parsed: any[] = blocks.map((block) => {
        if (block.blockType === BlockType.Text) {
          return {
            id: block.id,
            text: block.textBlock
              ? (block.textBlock.text as string)
              : undefined,
            order: block.order,
            blockType: block.blockType as any,
          };
        } else if (block.blockType === BlockType.Attachment) {
          return {
            id: block.id,
            text: block.attachmentBlock
              ? (block.attachmentBlock.text as string)
              : undefined,
            assetId: block.attachmentBlock
              ? (block.attachmentBlock.assetId as string)
              : undefined,
            order: block.order,
            blockType: block.blockType as any,
            attachmentBlock: block.attachmentBlock as any,
          };
        } else if (block.blockType === BlockType.Media) {
          return {
            id: block.id,
            assetId: block.mediaBlock
              ? (block.mediaBlock.assetId as string)
              : undefined,
            order: block.order,
            blockType: block.blockType as any,
            mediaBlock: block.mediaBlock as any,
          };
        } else if (block.blockType === BlockType.Challenge) {
          return {
            id: block.id,
            order: block.order,
            blockType: block.blockType as any,
          };
        }
        return {
          id: block.id,
          delete: true,
        };
      });
      const toDelete = parsed.filter((block) => block.delete === true);
      const current = parsed.filter((block) => block.delete !== true);
      if (toDelete.length > 0) {
        setCurrentBlocks(current);
        setToDelete(toDelete);
      } else {
        setCurrentBlocks(parsed);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocks]);

  const createTextBlock = (): void => {
    updateTourStep(8);
    const blocks = [...currentBlocks];
    blocks.push({
      id: new Date().getTime(),
      text: "",
      order: blocks.length, // This one will be parsed again during the final run before create
      blockType: BlockGeneralType.Text,
      file: undefined,
      subtitles: [],
    });
    setCurrentBlocks(blocks);
  };

  const createMediaBlock = (): void => {
    updateTourStep(10);
    const blocks = [...currentBlocks];
    blocks.push({
      id: new Date().getTime(),
      text: "",
      order: blocks.length, // This one will be parsed again during the final run before create
      blockType: BlockGeneralType.Media,
      file: undefined,
      subtitles: [],
    });
    setCurrentBlocks(blocks);
  };

  const createAttachmentBlock = (): void => {
    updateTourStep(12);
    const blocks = [...currentBlocks];
    blocks.push({
      id: new Date().getTime(),
      text: "",
      order: blocks.length, // This one will be parsed again during the final run before create
      blockType: BlockGeneralType.Attachment,
      file: undefined,
      subtitles: [],
    });
    setCurrentBlocks(blocks);
  };

  const deleteBlock = (id: string | number): void => {
    let blocks = [...currentBlocks];

    // Mark blocks for deletion
    if (typeof id === "string") {
      const marked = [...toDelete];
      const item = blocks.find((block) => block.id === id);
      if (item) {
        marked.push(item);
        setToDelete(marked);
      }
    }

    // Filter from the array
    blocks = blocks.filter((block) => block.id !== id);
    setCurrentBlocks(blocks);
  };

  const updateTextForBlock = (id: string | number, text: string): void => {
    const blocks = [...currentBlocks];
    const index = blocks.findIndex((block) => block.id === id);
    if (index !== -1) {
      const temp = blocks[index];
      temp.text = text;
      blocks[index] = temp;
      setCurrentBlocks(blocks);
    }
  };

  const updateFileForBlock = (id: string | number, file: File): void => {
    const blocks = [...currentBlocks];
    const index = blocks.findIndex((block) => block.id === id);
    if (index !== -1) {
      const temp = blocks[index];
      temp.file = file;
      blocks[index] = temp;
      setCurrentBlocks(blocks);
    }
  };

  const moveBlockDNDWrapper = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const temp = [...currentBlocks];
      temp[dragIndex].order = hoverIndex;
      temp[hoverIndex].order = dragIndex;
      const dragBlock = currentBlocks[dragIndex];
      temp.splice(dragIndex, 1);
      temp.splice(hoverIndex, 0, dragBlock);
      setCurrentBlocks(temp);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentBlocks],
  );

  return (
    <div className="px-6 pt-10 lg:px-8">
      <p className="pb-6 text-3xl font-bold lg:text-4xl navigator_tour_30">
        2. Checkpoint Content
      </p>
      <div>
        <Accordion
          allowMultipleExpanded
          allowZeroExpanded
          className={`${
            currentBlocks && currentBlocks.length > 0
              ? "border-2 mb-4 border-gray-300 border-opacity-60 rounded-2xl"
              : ""
          }`}
        >
          {currentBlocks && currentBlocks.length > 0
            ? [...currentBlocks].sort(sortAscending).map((block, index) => (
                <div
                  className={`${
                    index === currentBlocks.length - 1 ? "" : "border-b-2"
                  } border-gray-300`}
                  key={index}
                >
                  <DndProvider backend={HTML5Backend}>
                    <AccordionItem key={index} className="block">
                      <AccordionItemHeading>
                        <AccordionItemState>
                          {({ expanded }): React.ReactElement => {
                            return (
                              <AccordionItemButton className="flex items-center justify-between p-4 text-lg font-bold lg:text-xl">
                                <BlockDNDWrapper
                                  key={block.id}
                                  index={index}
                                  id={block.id}
                                  moveBlockDNDWrapper={moveBlockDNDWrapper}
                                  onDelete={(): any => deleteBlock(block.id)}
                                >
                                  <div className="relative flex items-center w-4 h-4 lg:w-8 lg:h-8">
                                    <motion.div
                                      className="text-gray-400"
                                      animate={
                                        expanded ? "plusOpen" : "plusClosed"
                                      }
                                      variants={buttonVariants}
                                    >
                                      <HiOutlineChevronDown />
                                    </motion.div>
                                  </div>
                                  <div className="flex items-center space-x-6 ml-4 pr-20 overflow-hidden">
                                    <p>
                                      {index + 1}
                                      {": "}
                                    </p>
                                    <p
                                      className={clsx(
                                        "",
                                        index == 0 && "navigator_tour_33",
                                        index == 1 && "navigator_tour_35",
                                        index == 2 && "navigator_tour_37",
                                      )}
                                    >
                                      {block.blockType === "TEXT"
                                        ? "Text"
                                        : block.blockType === "MEDIA"
                                        ? "Media"
                                        : "Attachment"}
                                    </p>
                                    <p className="truncate">
                                      {deserialize(block.text || "")}
                                    </p>
                                  </div>
                                </BlockDNDWrapper>
                              </AccordionItemButton>
                            );
                          }}
                        </AccordionItemState>
                      </AccordionItemHeading>
                      <AccordionItemState>
                        {({ expanded }): React.ReactElement => {
                          return (
                            <motion.div
                              className="overflow-hidden"
                              variants={contentVariants}
                              animate={
                                expanded ? "contentOpen" : "contentClosed"
                              }
                            >
                              <div className="m-4">
                                {block.blockType === BlockGeneralType.Text ? (
                                  <div className="flex flex-col relative">
                                    <label
                                      htmlFor="text"
                                      className="flex flex-row justify-between w-full"
                                    >
                                      Text
                                    </label>
                                    <SlateField
                                      id={block.id}
                                      setValue={updateTextForBlock}
                                      data={block.text || ""}
                                    />
                                  </div>
                                ) : block.blockType ===
                                  BlockGeneralType.Media ? (
                                  <div className="flex flex-col">
                                    {/* <label
                                      htmlFor="media"
                                      className="flex flex-row justify-between w-full"
                                    >
                                      Image / Video / Audio
                                    </label> */}
                                    <DropzoneField
                                      id={block.id}
                                      onChange={updateFileForBlock}
                                      fieldName="media"
                                      size="full"
                                      variant="dark"
                                      className="w-fit"
                                      accept="video/*, audio/*, image/*"
                                      existingFile={
                                        block.mediaBlock?.asset
                                          ? block.mediaBlock?.asset.name
                                          : null
                                      }
                                      currentBlocks={currentBlocks}
                                      acceptOneFile
                                    />
                                    {block.mediaBlock?.asset?.Subtitles?.map(
                                      (
                                        subtitle,
                                        // idx
                                      ) => (
                                        <SubtitlePreview
                                          key={subtitle.id}
                                          block={block}
                                          courseId={courseId}
                                          currentBlocks={currentBlocks}
                                          subtitle={subtitle}
                                        />
                                      ),
                                    )}
                                    {block.subtitles?.map((subtitle, idx) => {
                                      return (
                                        <SubtitleCreate
                                          block={block}
                                          currentBlocks={currentBlocks}
                                          setCurrentBlocks={setCurrentBlocks}
                                          subtitle={subtitle}
                                          blockIndex={index}
                                          subtitleIndex={idx}
                                          key={subtitle.id}
                                        />
                                      );
                                    })}
                                    {!block.mediaBlock?.asset?.Subtitles && (
                                      <Button
                                        variant="brand1"
                                        onClick={(): void => {
                                          setCurrentBlocks(
                                            currentBlocks.map((block, idx) => {
                                              if (index == idx) {
                                                const temp: Blocks =
                                                  cloneDeep(block);
                                                if (temp.subtitles) {
                                                  temp.subtitles.push({
                                                    fileUpload: null,
                                                    language: "en",
                                                  });
                                                } else {
                                                  temp.mediaBlock?.asset?.Subtitles?.push(
                                                    {
                                                      fileUpload: null,
                                                      language: "en",
                                                    },
                                                  );
                                                }
                                                return temp;
                                              }
                                              return block;
                                            }),
                                          );
                                        }}
                                      >
                                        Add subtitle
                                      </Button>
                                    )}
                                  </div>
                                ) : block.blockType ===
                                  BlockGeneralType.Attachment ? (
                                  <div className="flex flex-col">
                                    <label
                                      htmlFor="attachment"
                                      className="flex flex-row justify-between w-full"
                                    >
                                      Downloadable Attachment
                                    </label>
                                    <BlockInputField
                                      required
                                      type="text"
                                      placeholder="Text"
                                      id={block.id}
                                      onChange={updateTextForBlock}
                                      value={block.text || ""}
                                      className="max-w-xl"
                                    />
                                    <DropzoneField
                                      id={block.id}
                                      onChange={updateFileForBlock}
                                      fieldName="attachment"
                                      size="full"
                                      variant="dark"
                                      className="w-fit"
                                      accept="video/*, audio/*, image/*, application/pdf"
                                      existingFile={
                                        block.attachmentBlock?.asset
                                          ? block.attachmentBlock?.asset.name
                                          : null
                                      }
                                      maxSize={1000000000}
                                      currentBlocks={currentBlocks}
                                    />
                                  </div>
                                ) : null}
                              </div>
                            </motion.div>
                          );
                        }}
                      </AccordionItemState>
                    </AccordionItem>
                  </DndProvider>
                </div>
              ))
            : null}
        </Accordion>
        <p className="w-full font-bold my-4 text-gray-500 navigator_tour_31">
          Start adding elements by clicking on the selection below
        </p>
        <div className="grid grid-cols-3 col-span-3 gap-4">
          <LessonContentCard
            name={"Text"}
            thumbnail={"/images/course/checkpoint/content/content-text.svg"}
            desc={"Description"}
            className="h-full max-w-md col-span-1 navigator_tour_32"
            onClick={createTextBlock}
          />
          <LessonContentCard
            name={"Image / Video / Audio"}
            thumbnail={"/images/course/checkpoint/content/content-media.svg"}
            desc={"Accepts MP4, MP3, JPG, PNG, MOV"}
            className="h-full max-w-md col-span-1 navigator_tour_34"
            onClick={createMediaBlock}
          />
          <LessonContentCard
            name={"Downloadable Attachment"}
            thumbnail={
              "/images/course/checkpoint/content/content-downloadable.svg"
            }
            desc={"Accepts PDF, MP4, MP3, JPG, PNG"}
            className="h-full max-w-md col-span-1 navigator_tour_36"
            onClick={createAttachmentBlock}
          />
        </div>
      </div>
    </div>
  );
};

export default Lesson;
