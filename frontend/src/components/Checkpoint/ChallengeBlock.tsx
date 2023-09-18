import Image from "next/image";
import React from "react";
import { AiFillFile } from "react-icons/ai";
import { useStore } from "utils/hooks/zustand";
import { Button, Dialog } from "../Elements";

type Props = {
  submission: any;
  index: number;
  sdUrls?: any[];
  likes?: number;
  openModal?: (id: string) => void;
  checkAlreadyLiked: (id: string) => boolean;
  likeSubmission?: (id: string) => Promise<void>;
  deleteSubmission?: (id: string) => Promise<void>;
};

export const ChallengeBlock: React.FC<Props> = (props) => {
  const {
    submission,
    index,
    sdUrls,
    likes,
    openModal,
    checkAlreadyLiked,
    likeSubmission,
    deleteSubmission,
  } = props;
  const { user } = useStore();
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
  React.useState<boolean>(false);

  return (
    <div
      className="flex flex-col col-span-1 overflow-hidden bg-white rounded-xl w-min-content"
      key={submission.id}
    >
      <div // eslint-disable-line
        onClick={(): void => openModal?.(submission.id)}
        className="relative object-cover overflow-hidden cursor-pointer aspect-square flex items-center justify-center"
      >
        {submission.asset?.fileType === "VIDEO" ? (
          <video
            src={sdUrls?.[index]}
            className="object-cover text-center cursor-pointer aspect-square"
            loop
            muted
            autoPlay
          />
        ) : submission.asset?.fileType == "DOCUMENTS" ? (
            <a href={submission.asset.url} className="cursor-pointer">
              <AiFillFile size={96} color="black" />
            </a>
          ) : (
            <Image
              src={submission.asset.url}
              alt=""
              layout="fill"
              objectFit="cover"
              onClick={(): void => openModal?.(submission.id)}
            />
        )}
      </div>

      <div className="px-1 py-2">
        <div className="flex flex-row flex-nowrap overflow-hidden truncate ml-3 mb-1">
          {/* We need to show two different states of likes based on the response */}
          <div className="flex flex-col flex-1">
            <div className="basis-1/2 flex justify-start">
              {checkAlreadyLiked(submission.id) ? (
                /* eslint-disable */
                <img
                  src="/images/dashboard/heart.png"
                  alt=""
                  className="w-4 h-4 mr-1"
                  onClick={(): Promise<void> | undefined =>
                    likeSubmission?.(submission.id)
                  }
                />
              ) : (
                <img
                  src="/images/dashboard/heart-outline.png"
                  alt=""
                  className="w-4 h-4 mr-1"
                  onClick={(): Promise<void> | undefined =>
                    likeSubmission?.(submission.id)
                  }
                />
              )}
              <p className="font-extrabold text-sm text-gray-400">
                {likes ?? submission?.likes?.length} Likes
              </p>
            </div>
            <div className="basis-1/2 flex justify-start">
              {submission.comments?.length ? (
                <img
                  src="/images/dashboard/comment.png"
                  alt=""
                  className="w-4 h-4 mr-1"
                  onClick={(): void => openModal?.(submission.id)}
                />
              ) : (
                <img
                  src="/images/dashboard/comment-active.png"
                  alt=""
                  className="w-4 h-4 mr-1"
                  onClick={(): void => openModal?.(submission.id)}
                />
              )}
              <p className="font-extrabold text-sm text-gray-400">
                {submission?.comments?.length ?? submission?.comments?.length}{" "}
                Comments
              </p>
            </div>
          </div>
          {submission?.creatorId === user?.id && (
            <div
              className="mr-2 mt-3 cursor-pointer"
              onClick={(): void => setIsDeleteConfirmationOpen(true)}
            >
              <img
                src={"/images/course/checkpoint/content/remove-file.svg"}
                alt=""
              />
            </div>
          )}
        </div>
      </div>
      <Dialog
          isOpen={isDeleteConfirmationOpen}
          onClose={(): void => setIsDeleteConfirmationOpen(false)}
          className=""
        >
          <div className="flex flex-col items-center justify-center">
            <p className="text-xl font-extrabold text-red-600 lg:text-2xl">
              Warning!
            </p>
            <p className="my-6 text-base text-center text-gray-600 lg:text-lg">
              If you delete your work, all of your work&apos;s comment and likes
              will be gone. Are you sure?
            </p>
            <div className="flex flex-row items-center space-x-8">
              <Button
                variant="brand1"
                onClick={(): void => setIsDeleteConfirmationOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={(): Promise<void> | undefined =>
                  deleteSubmission?.(submission.id || "")
                }
              >
                Confirm
              </Button>
            </div>
          </div>
        </Dialog>
    </div>
  );
};
