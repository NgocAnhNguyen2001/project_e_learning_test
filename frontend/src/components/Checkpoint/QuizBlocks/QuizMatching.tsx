import * as React from "react";
import { HiOutlineTrash } from "react-icons/hi";

import { Button } from "@/components/Elements";
import { BlockInputField } from "@/components/Form";
import { DropzoneField } from "@/components/Form/DropzoneField";
import { SlateField } from "@/components/Form/SlateField";
import { Blocks } from "@/types/Blocks";
import { useUploadQuestionBlockAssetMutation } from "schema/generated/graphql";

import { Card } from "../../Elements/Card";
import MatchingPreview from "../Interactive/Matching/MatchingPreview";
import { useRouter } from "next/router";

interface IQuizMatching {
  id: string | number;
  onClick?: any;
  index?: number;
  block: Blocks;
  isText?: any[];
  setIsText?: (value: any[]) => void;
  pairTextOnChange: any;
  blockDescOnChange: any;
  pairAssetOnChange: (
    blockId: string | number,
    pairId: string | number,
    assetId: string,
    url: string,
  ) => void;
  currentBlocks: any;
  updateFileForBlock: any;
  deletePair: any;
}

export const QuizMatching = ({
  id,
  onClick,
  index = 0,
  block,
  isText = [],
  setIsText,
  pairTextOnChange,
  blockDescOnChange,
  pairAssetOnChange,
  currentBlocks,
  updateFileForBlock,
  deletePair,
}: IQuizMatching): React.ReactElement => {
  const router = useRouter();
  const SELECTIONS_CAP = 5; // This is where we cap the number of selections they can make
  const [resetEvent, setResetEvent] = React.useState<any>();
  const [uploadAsset] = useUploadQuestionBlockAssetMutation();

  const changeFileForBlockPerSelection = async (
    id: string | number,
    file: File,
  ): Promise<void> => {
    if (router.query?.id) {
      await uploadAsset({
        variables: {
          id: router.query?.id as string,
          file,
        },
      }).then((res) => {
        pairAssetOnChange(
          block.id,
          id,
          res.data?.uploadQuestionBlockAsset?.id ?? "",
          res.data?.uploadQuestionBlockAsset?.url ?? "",
        );
      });
    }
  };

  return (
    <div>
      <p className="font-bold">Question {index + 1}: Matching</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:space-x-24">
        <div className="flex flex-col justify-center">
          <div className="col-span-2 text-black box">
            <Card className="gap-4 p-6 mt-2 bg-opacity-20 grid grid-cols-2">
              <div className="col-span-2">
                <div className="flex justify-between">
                  <label htmlFor="quantityOfAnswers" className="">
                    Media File (optional)
                  </label>
                  <HiOutlineTrash
                    className="mr-5 cursor-pointer"
                    size={20}
                    color="#FF4B4B"
                    onClick={(): any => {
                      setResetEvent({
                        filename: null,
                      });
                      updateFileForBlock(block.id, null);
                    }}
                  />
                </div>
                <DropzoneField
                  id={id}
                  onChange={updateFileForBlock}
                  fieldName="thumbnail"
                  size="full"
                  variant="dark"
                  className="w-full"
                  accept="video/*, image/*"
                  existingFile={
                    block.questionBlock?.asset
                      ? block.questionBlock?.asset.name
                      : null
                  }
                  currentBlocks={currentBlocks}
                  resetEvent={resetEvent}
                />
                <label htmlFor="questionDescription" className="">
                  Description
                </label>
                <div className="relative">
                  <SlateField
                    id="description"
                    onChange={(content: string): void =>
                      blockDescOnChange(block.id, content)
                    }
                    className="navigator_tour_68"
                    data={block.questionBlock?.description || ""}
                  />
                </div>
                <div className="flex flex-row items-center justify-center my-2">
                  <Button
                    className="w-full rounded-r-none hover:z-100 z-10 border-2"
                    variant={isText.includes(id) ? "purple" : "white"}
                    onClick={(): void => {
                      if (!isText.includes(id)) setIsText?.([...isText, id]);
                    }}
                  >
                    Text-2-Text
                  </Button>
                  <Button
                    className="w-full rounded-l-none hover:z-100 z-10 border-2"
                    variant={isText.includes(id) ? "white" : "purple"}
                    onClick={(): void => {
                      if (isText.includes(id)) {
                        setIsText?.(isText.filter((ID) => ID != id));
                      }
                    }}
                  >
                    Image-2-Text
                  </Button>
                </div>
              </div>
              {block.pairs &&
                block.pairs.map((pairs, mainIndex) =>
                  pairs.pair.map((pair, subIndex) => {
                    return (
                      <div
                        className="col-span-1"
                        key={`${mainIndex}-${subIndex}`}
                      >
                        <div className="flex flex-row justify-between align-center">
                          <label htmlFor="desc" className="">
                            {mainIndex + 1}-{subIndex + 1}
                          </label>
                          {subIndex === 1 ? (
                            <HiOutlineTrash
                              color="red"
                              className="mr-2 cursor-pointer"
                              onClick={(): void =>
                                deletePair(block.id, pairs.id)
                              }
                            />
                          ) : null}
                        </div>
                        {subIndex == 1 || isText.includes(id) ? (
                          <BlockInputField
                            required
                            type="text"
                            placeholder="Text"
                            id={subIndex}
                            onChange={(id: any, value: any): void =>
                              pairTextOnChange(block.id, pairs.id, id, value)
                            }
                            className="navigator_tour_69"
                            value={pair}
                          />
                        ) : (
                          <DropzoneField
                            id={pairs.id}
                            onChange={changeFileForBlockPerSelection}
                            fieldName="thumbnail"
                            size="full"
                            variant="dark"
                            className="w-full navigator_tour_69"
                            accept="image/*"
                            existingFile={
                              pairs.img ? "uploaded" : pairs.asset?.name ?? ""
                            }
                            currentBlocks={currentBlocks}
                          />
                        )}
                      </div>
                    );
                  }),
                )}
              {block.selections &&
              block.selections.length >= SELECTIONS_CAP ? null : (
                <Button
                  variant="white"
                  className="w-full col-span-2"
                  onClick={(): any => onClick(block.id)}
                >
                  + Add Selection
                </Button>
              )}
            </Card>
          </div>
        </div>
        <div className="h-max flex flex-col justify-center col-span-1 rounded-xl bg-bottom bg-fixed bg-no-repeat bg-cover bg-auth-dark overflow-hidden mt-6">
          <div className="h-max bg-dark-overlay bg-opacity-80 p-16 text-white">
            <MatchingPreview
              block={block as any}
              isText={isText.includes(id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizMatching;
