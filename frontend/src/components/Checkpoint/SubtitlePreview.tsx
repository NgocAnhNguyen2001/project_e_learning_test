import { Blocks, Subtitles } from "@/types/Blocks";
import Link from "next/link";
import React from "react";
import { HiOutlineDocumentDownload, HiOutlineTrash } from "react-icons/hi";
import {
  namedOperations,
  useDeletOneSubtitleMutation,
  useUpdateOneSubtitlesMutation,
  useUploadBlockAssetMutation,
} from "schema/generated/graphql";
import { DropzoneField } from "../Form/DropzoneField";
import { InputField } from "../Form/InputField";

interface Props {
  subtitle: Subtitles;
  currentBlocks: Blocks[];
  block: Blocks;
  courseId: string;
}

export const SubtitlePreview: React.FC<Props> = (props) => {
  const { currentBlocks, subtitle, block, courseId } = props;
  const [deleteSubtitle] = useDeletOneSubtitleMutation();
  const [uploadAsset] = useUploadBlockAssetMutation();
  const [updateSubtitle] = useUpdateOneSubtitlesMutation();

  const onDelete = (id: string): void => {
    deleteSubtitle({
      variables: {
        where: {
          id,
        },
      },
      refetchQueries: [namedOperations.Query.checkpoint],
    });
  };

  const updateOldSubtitleFileForBlock = async (
    id: string,
    file: File,
  ): Promise<void> => {
    const subtitleAsset = await uploadAsset({
      variables: {
        file,
        id: courseId,
      },
    });
    if (subtitleAsset.data?.uploadBlockAsset.url)
      await updateSubtitle({
        variables: {
          where: {
            id,
          },
          data: {
            url: { set: subtitleAsset.data.uploadBlockAsset.url },
          },
        },
      });
  };

  return (
    <>
      <label htmlFor="media" className="flex flex-row justify-between w-full">
        Subtitle VTT file
      </label>
      <DropzoneField
        id={subtitle.id}
        onChange={(id: string | number, file: File): Promise<void> =>
          updateOldSubtitleFileForBlock(subtitle.id as string, file)
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
      <div className="flex flex-row ">
        <InputField
          required
          type="text"
          placeholder="Language"
          value={subtitle.language}
          readOnly
          wrapperClassName="items-center grow"
        />
        <Link href={subtitle.url ?? ""}>
          <HiOutlineDocumentDownload
            className={`ml-1 mr-2 ${
              !subtitle.url ? "cursor-not-allowed" : "cursor-pointer"
            } navigator_tour_38`}
            size={40}
            color={subtitle.url ? "#00D100" : "#808080"}
          />
        </Link>
        <HiOutlineTrash
          className={`mr-5 ${
            !subtitle.id ? "cursor-not-allowed" : "cursor-pointer"
          } navigator_tour_38`}
          size={40}
          color="#FF4B4B"
          onClick={(): void => {
            if (subtitle.id) onDelete(subtitle.id as string);
          }}
        />
      </div>
    </>
  );
};
