import clsx from "clsx";
import { motion } from "framer-motion";
import _ from "lodash";
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
import { HiOutlineChevronDown } from "react-icons/hi";
import { QuizContentCard } from "@/components/Checkpoint/QuizContentCard";
import { Blocks } from "@/types/Blocks";
import { deserialize } from "@/utils/slate";
import { sortAscending } from "@/utils/sorting";
import {
  AnswerQuantityType,
  AnswerType,
  Block,
  BlockType,
  QuizType,
} from "schema/generated/graphql";

import { BlockDNDWrapper } from "./BlockWrapper";
import QuizDragAndDrop from "./QuizBlocks/QuizDragAndDrop";
import QuizHearing from "./QuizBlocks/QuizHearing";
import QuizMatching from "./QuizBlocks/QuizMatching";
import QuizObjective from "./QuizBlocks/QuizObjective";

// import { Divider } from "@/components/Elements/Divider";

interface IProps {
  blocks: Block[];
  currentBlocks: Blocks[];
  setCurrentBlocks: React.Dispatch<React.SetStateAction<Blocks[]>>;
  toDelete: Blocks[];
  setToDelete: React.Dispatch<React.SetStateAction<Blocks[]>>;
  updateTourStep: any;
  isText?: any[];
  setIsText?: (value: any[]) => void;
}

const Quiz = ({
  blocks,
  currentBlocks,
  setCurrentBlocks,
  toDelete,
  setToDelete,
  updateTourStep,
  isText = [],
  setIsText,
}: IProps): React.ReactElement => {
  React.useEffect(() => {
    if (blocks) {
      const parsed: any[] = blocks.map((block) => {
        if (block.blockType === BlockType.Question) {
          if (!block.questionBlock?.pairs?.[0]?.isImage) {
            setIsText?.([...isText, block.id]);
          }
          return {
            id: block.id,
            title: block.questionBlock
              ? (block.questionBlock.title as string)
              : undefined,
            order: block.order,
            questionBlock: block.questionBlock as any,
            answerType: block.questionBlock?.answerType as any,
            answerQuantityType: block.questionBlock?.answerQuantityType as any,
            pairs: [...(block.questionBlock?.pairs as any)],
            quizType: block.questionBlock?.quizType as any,
            selections: [...(block.questionBlock?.selections as any)],
            description: block.questionBlock?.description as any,
            asset: block.questionBlock?.asset,
            questions: block.questionBlock
              ? ((block.questionBlock.title as string)?.match?.(/____/g) || [])
                  .length
              : 0,
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

  const createDragAndDropBlock = (): void => {
    updateTourStep(24);
    const blocks = [...currentBlocks];
    blocks.push({
      id: new Date().getTime(),
      title: "",
      order: blocks.length, // This one will be parsed again during the final run before create
      quizType: QuizType.DragDrop,
      selections: [],
      description: "",
    });
    setCurrentBlocks(blocks);
  };

  const createObjectiveBlock = (): void => {
    updateTourStep(30);
    const blocks = [...currentBlocks];
    blocks.push({
      id: new Date().getTime(),
      title: "",
      order: blocks.length, // This one will be parsed again during the final run before create
      quizType: QuizType.Objective,
      selections: [],
      description: "",
      answerType: AnswerType.Text,
      answerQuantityType: AnswerQuantityType.Single,
    });
    setCurrentBlocks(blocks);
  };

  const createHearingBlock = (): void => {
    updateTourStep(37);
    const blocks = [...currentBlocks];
    blocks.push({
      id: new Date().getTime(),
      title: "",
      order: blocks.length, // This one will be parsed again during the final run before create
      quizType: QuizType.Hearing,
      selections: [],
      description: "",
      answerType: AnswerType.Text,
      answerQuantityType: AnswerQuantityType.Single,
    });
    setCurrentBlocks(blocks);
  };

  const createMatchingBlock = (): void => {
    updateTourStep(44);
    const blocks = [...currentBlocks];
    blocks.push({
      id: new Date().getTime(),
      title: "",
      order: blocks.length, // This one will be parsed again during the final run before create
      quizType: QuizType.Matching,
      pairs: [
        {
          id: new Date().getTime() + 100,
          pair: ["", ""],
          assetId: undefined,
          isImage: false,
        },
      ],
      answerType: AnswerType.Text,
      answerQuantityType: AnswerQuantityType.Single,
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

  const updateBlockTitle = (id: string | number, text: string): void => {
    const blocks = [...currentBlocks];
    const index = blocks.findIndex((block) => block.id === id);
    if (index !== -1) {
      const temp = blocks[index];
      temp.title = text;
      blocks[index] = temp;
      setCurrentBlocks(blocks);
    }
  };

  /**
   * This function is very similar to `updateBlockTitle` above.
   * However, it has an extra questions property which will keep track of the number of questions
   * This is required so we can generate the order for the selection answers
   *
   * @param id The ID of the block
   * @param text The text content (question)
   * @param questions The number of questions detected within the text content
   */
  const updateDNDQuestion = (
    id: string | number,
    text: string,
    questions: number,
  ): void => {
    const blocks = [...currentBlocks];
    const index = blocks.findIndex((block) => block.id === id);
    if (index !== -1) {
      const temp = blocks[index];
      temp.title = text;
      temp.questions = questions;
      blocks[index] = temp;
      setCurrentBlocks(blocks);
    }
  };

  // Update block description
  const updateQuestionDescription = (
    id: string | number,
    text: string,
  ): void => {
    const blocks = [...currentBlocks];
    const index = blocks.findIndex((block) => block.id === id);
    if (index !== -1) {
      const temp = blocks[index];
      temp.description = text;
      blocks[index] = temp;
      setCurrentBlocks(blocks);
    }
  };

  const updateSelectionTitle = (
    blockId: string | number,
    id: string | number,
    text: string,
  ): void => {
    const blocks = [...currentBlocks];
    const index = blocks.findIndex((block) => block.id === blockId);
    if (index !== -1) {
      const temp = blocks[index];
      if (temp.selections) {
        const selectionIndex = temp.selections?.findIndex(
          (selection) => selection.id === id,
        );
        if (selectionIndex !== -1) {
          const tempSelection = { ...temp.selections[selectionIndex] };
          tempSelection.text = text;
          temp.selections[selectionIndex] = tempSelection;
        }
      }
      blocks[index] = temp;
      setCurrentBlocks(blocks);
    }
  };

  const updatePairTitle = (
    blockId: string | number,
    pairId: string | number,
    pos: 0 | 1,
    text: string,
  ): void => {
    const blocks = [...currentBlocks];
    const index = blocks.findIndex((block) => block.id === blockId);
    if (index !== -1) {
      const temp = blocks[index];
      if (temp.pairs) {
        const pairIndex = temp.pairs?.findIndex((pair) => pair.id === pairId);
        if (pairIndex !== -1) {
          // We need to copy it to modify its values
          const tempPair = { ...temp.pairs[pairIndex] };

          // Modify and set back
          const pairs = [...tempPair.pair];
          pairs[pos] = text;

          tempPair.pair = pairs;
          tempPair.isImage = false;
          temp.pairs[pairIndex] = tempPair;
        }
      }
      blocks[index] = temp;
      setCurrentBlocks(blocks);
    }
  };

  const updatePairAsset = (
    blockId: string | number,
    pairId: string | number,
    assetId: string,
    url: string,
  ): void => {
    const blocks = [...currentBlocks];
    const index = blocks.findIndex((block) => block.id === blockId);
    if (index !== -1) {
      const temp = blocks[index];
      if (temp.pairs) {
        const pairIndex = temp.pairs?.findIndex((pair) => pair.id === pairId);
        if (pairIndex !== -1) {
          // We need to copy it to modify its values
          const tempPair = { ...temp.pairs[pairIndex] };
          tempPair.assetId = assetId;
          tempPair.isImage = true;
          tempPair.img = url;
          temp.pairs[pairIndex] = tempPair;
        }
      }
      blocks[index] = temp;
      setCurrentBlocks(blocks);
    }
  };

  const updateSelectionAns = (
    blockId: string | number,
    id: string | number,
    value: boolean,
  ): void => {
    const blocks = [...currentBlocks];
    const index = blocks.findIndex((block) => block.id === blockId);
    if (index !== -1) {
      const temp = blocks[index];
      if (temp.selections) {
        const selectionIndex = temp.selections?.findIndex(
          (selection) => selection.id === id,
        );
        if (selectionIndex !== -1) {
          // We need to copy it to modify its values
          const tempSelection = { ...temp.selections[selectionIndex] };
          tempSelection.isCorrect = value;

          // Set back to object
          temp.selections[selectionIndex] = tempSelection;
        }
      }
      blocks[index] = temp;
      setCurrentBlocks(blocks);
    }
  };

  const updateDNDSelectionOrder = (
    blockId: string | number,
    id: string | number,
    order: number,
  ): void => {
    const blocks = [...currentBlocks];
    const index = blocks.findIndex((block) => block.id === blockId);
    if (index !== -1) {
      const temp = blocks[index];
      if (temp.selections) {
        const selectionIndex = temp.selections?.findIndex(
          (selection) => selection.id === id,
        );
        if (selectionIndex !== -1) {
          // We need to copy it to modify its values
          const tempSelection = { ...temp.selections[selectionIndex] };
          tempSelection.isCorrect = order !== -1;
          tempSelection.order = order;

          // Set back to object
          temp.selections[selectionIndex] = tempSelection;
        }
      }
      blocks[index] = temp;
      setCurrentBlocks(blocks);
    }
  };

  const updateSelectionSingleAns = (
    blockId: string | number,
    id: string | number,
  ): void => {
    const blocks = [...currentBlocks];
    const index = blocks.findIndex((block) => block.id === blockId);
    if (index !== -1) {
      const temp = blocks[index];
      if (temp.selections) {
        for (let i = 0; i < temp.selections.length; i++) {
          // We need to copy it to modify its values
          const tempSelection = { ...temp.selections[i] };
          if (tempSelection.id === id) {
            tempSelection.isCorrect = true;
          } else {
            tempSelection.isCorrect = false;
          }

          // Set back to object
          temp.selections[i] = tempSelection;
        }
      }
      blocks[index] = temp;
      setCurrentBlocks(blocks);
    }
  };

  const updateFileForBlockPerSelection = (
    blockId: string | number,
    id: string | number,
    file: File,
  ): void => {
    const blocks = [...currentBlocks];
    const index = blocks.findIndex((block) => block.id === blockId);
    if (index !== -1) {
      const temp = blocks[index];
      if (temp.selections) {
        const selectionIndex = temp.selections.findIndex(
          (selection) => selection.id === id,
        );
        if (selectionIndex !== -1) {
          const tempSelection = { ...temp.selections[selectionIndex] };
          tempSelection.file = file;

          temp.selections[selectionIndex] = tempSelection;
        }
      }
      blocks[index] = temp;
      setCurrentBlocks(blocks);
    }
  };

  const updateFileForBlock = (blockId: string | number, file: File): void => {
    const blocks = [...currentBlocks];
    const index = blocks.findIndex((block) => block.id === blockId);
    if (index !== -1) {
      const temp = blocks[index];
      temp.file = file;
      blocks[index] = temp;
      setCurrentBlocks(blocks);
    }
  };

  const updateTypeOfAnswer = (id: string | number, value: AnswerType): void => {
    const blocks = [...currentBlocks];
    const index = blocks.findIndex((block) => block.id === id);
    if (index !== -1) {
      const temp = blocks[index];
      temp.answerType = value;
      blocks[index] = temp;
      setCurrentBlocks(blocks);
    }
  };

  const updateQuantityOfAnswer = (
    id: string | number,
    value: AnswerQuantityType,
  ): void => {
    const blocks = [...currentBlocks];
    const index = blocks.findIndex((block) => block.id === id);
    if (index !== -1) {
      const temp = blocks[index];
      temp.answerQuantityType = value;
      if (temp.selections) {
        for (let i = 0; i < temp.selections.length; i++) {
          // We need to copy it to modify its values
          const tempSelection = { ...temp.selections[i] };
          tempSelection.isCorrect = false;

          // Set back to object
          temp.selections[i] = tempSelection;
        }
      }
      blocks[index] = temp;
      setCurrentBlocks(blocks);
    }
  };

  const addBlockSelection = (id: string | number): void => {
    const blocks = [...currentBlocks];
    const index = blocks.findIndex((block) => block.id === id);
    if (index !== -1) {
      const temp = blocks[index];
      temp.selections?.push({
        id: new Date().getTime(),
        text: "",
        isCorrect: false,
        file: undefined,
      });
      blocks[index] = temp;
      setCurrentBlocks(blocks);
    }
  };

  const addBlockPair = (id: string | number): void => {
    const blocks = [...currentBlocks];
    const index = blocks.findIndex((block) => block.id === id);
    if (index !== -1) {
      const temp = blocks[index];
      temp.pairs?.push({
        id: new Date().getTime(),
        pair: ["", ""],
        isImage: false,
        assetId: undefined,
      });
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

  const deleteSelection = (
    blockId: string | number,
    id: string | number,
  ): void => {
    const blocks = [...currentBlocks];
    const index = blocks.findIndex((block) => block.id === blockId);
    if (index !== -1) {
      const temp = blocks[index];
      if (temp.selections) {
        _.remove(temp.selections, {
          id: id,
        });
      }
      blocks[index] = temp;
      setCurrentBlocks(blocks);
    }
  };

  const deletePair = (blockId: string | number, id: string | number): void => {
    const blocks = [...currentBlocks];
    const index = blocks.findIndex((block) => block.id === blockId);
    if (index !== -1) {
      const temp = blocks[index];
      if (temp.pairs) {
        _.remove(temp.pairs, {
          id: id,
        });
      }
      blocks[index] = temp;
      setCurrentBlocks(blocks);
    }
  };

  const buttonVariants = {
    plusClosed: { rotate: "0deg" },
    plusOpen: { rotate: "-180deg" },
  };

  const contentVariants = {
    contentClosed: { height: "0px", opacity: 0 },
    contentOpen: { height: "auto" },
  };

  return (
    <div className="px-6 pt-10 lg:px-8">
      <p className="pb-6 pt-7 text-3xl font-bold lg:text-4xl navigator_tour_48">
        2. Quiz Content
      </p>
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
                key={`outside${block.id}`}
              >
                <DndProvider backend={HTML5Backend}>
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemState>
                        {({ expanded }): React.ReactElement => {
                          return (
                            <AccordionItemButton
                              className={clsx(
                                "flex items-center justify-between p-4 text-lg font-bold lg:text-xl navigator_tour_accordion",
                                index == 0 && "navigator_tour_accordion_0",
                                index == 1 && "navigator_tour_accordion_1",
                                index == 2 && "navigator_tour_accordion_2",
                                index == 3 && "navigator_tour_accordion_3",
                              )}
                            >
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
                                    initial="plusClosed"
                                    variants={buttonVariants}
                                  >
                                    <HiOutlineChevronDown />
                                  </motion.div>
                                </div>
                                <div className="flex items-center space-x-6 ml-4 pr-20 overflow-hidden">
                                  <p>
                                    {"Question " + (index + 1) + ": "}
                                    {block.quizType === QuizType.DragDrop
                                      ? "Drag & Drop"
                                      : block.quizType === QuizType.Objective
                                      ? "Objective"
                                      : block.quizType === QuizType.Hearing
                                      ? "Hearing"
                                      : "Matching"}
                                  </p>
                                  <p className="truncate">
                                    {deserialize(block.title || "")}
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
                            animate={expanded ? "contentOpen" : "contentClosed"}
                          >
                            <div className="m-4">
                              {block.quizType === QuizType.DragDrop ? (
                                <QuizDragAndDrop
                                  index={index}
                                  block={block}
                                  currentBlocks={currentBlocks}
                                  updateFileForBlock={updateFileForBlock}
                                  id={block.id}
                                  onChange={updateDNDQuestion}
                                  onClick={addBlockSelection}
                                  selectionTextOnChange={updateSelectionTitle}
                                  selectionAnsOnChange={updateDNDSelectionOrder}
                                  deleteSelection={deleteSelection}
                                />
                              ) : block.quizType === QuizType.Objective ? (
                                <QuizObjective
                                  id={block.id}
                                  index={index}
                                  block={block}
                                  updateFileForBlock={updateFileForBlock}
                                  onChange={updateBlockTitle}
                                  onClick={addBlockSelection}
                                  selectionTextOnChange={updateSelectionTitle}
                                  selectionMultipleAnsOnChange={
                                    updateSelectionAns
                                  }
                                  selectionSingleAnsOnChange={
                                    updateSelectionSingleAns
                                  }
                                  blockDescOnChange={updateQuestionDescription}
                                  updateTypeOfAnswer={updateTypeOfAnswer}
                                  updateQuantityOfAnswer={
                                    updateQuantityOfAnswer
                                  }
                                  updateFileForBlockPerSelection={
                                    updateFileForBlockPerSelection
                                  }
                                  currentBlocks={currentBlocks}
                                  deleteSelection={deleteSelection}
                                />
                              ) : block.quizType === QuizType.Hearing ? (
                                <QuizHearing
                                  id={block.id}
                                  index={index}
                                  block={block}
                                  onClick={addBlockSelection}
                                  onChange={updateBlockTitle}
                                  selectionTextOnChange={updateSelectionTitle}
                                  selectionSingleAnsOnChange={
                                    updateSelectionSingleAns
                                  }
                                  blockDescOnChange={updateQuestionDescription}
                                  updateFileForBlock={updateFileForBlock}
                                  currentBlocks={currentBlocks}
                                  deleteSelection={deleteSelection}
                                />
                              ) : (
                                <QuizMatching
                                  id={block.id}
                                  index={index}
                                  block={block}
                                  currentBlocks={currentBlocks}
                                  isText={isText}
                                  setIsText={setIsText}
                                  updateFileForBlock={updateFileForBlock}
                                  blockDescOnChange={updateQuestionDescription}
                                  onClick={addBlockPair}
                                  pairTextOnChange={updatePairTitle}
                                  pairAssetOnChange={updatePairAsset}
                                  deletePair={deletePair}
                                />
                              )}
                              {/* <Divider className="my-6 mb-6 border-dashed" /> */}
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
      <div className="grid grid-cols-4 col-span-4 gap-4 navigator_tour_49">
        <QuizContentCard
          name={"Drag & Drop"}
          className="h-full max-w-md col-span-1 navigator_tour_50"
          onClick={createDragAndDropBlock}
        />
        <QuizContentCard
          name={"Objective"}
          className="h-full max-w-md col-span-1 navigator_tour_55"
          onClick={createObjectiveBlock}
        />
        <QuizContentCard
          name={"Hearing"}
          className="h-full max-w-md col-span-1 navigator_tour_61"
          onClick={createHearingBlock}
        />
        <QuizContentCard
          name={"Matching"}
          className="h-full max-w-md col-span-1 navigator_tour_67"
          onClick={createMatchingBlock}
        />
      </div>
    </div>
  );
};

export default Quiz;
