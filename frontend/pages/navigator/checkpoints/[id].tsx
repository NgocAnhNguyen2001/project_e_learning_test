import { Listbox } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";
import { useForm } from "react-hook-form";
import { HiOutlineTrash, HiChevronRight } from "react-icons/hi";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import PacmanLoader from "react-spinners/PacmanLoader";
import { toast } from "react-toastify";
import * as z from "zod";

import Lesson from "@/components/Checkpoint/Lesson";
import Quiz from "@/components/Checkpoint/Quiz";
import { CheckpointCardProps } from "@/components/Course/CheckpointCard";
import { Button, Dialog } from "@/components/Elements";
import Section from "@/components/Elements/Section";
import { Feedback } from "@/components/Feedback";
import { InputField } from "@/components/Form";
import { DropzoneField } from "@/components/Form/DropzoneField";
import { FormFooter } from "@/components/Form/FormFooter";
import { SlateField } from "@/components/Form/SlateField";
import { LightBackground } from "@/components/Layout/LightBackground";
import { ParentTooltip, ParentArrowTooltip } from "@/components/Onboard";
import { extractHostname, getTenant, Props } from "@/utils/tenant";
import { Blocks } from "@/types/Blocks";
import {
  IntroCheckpointTypeOptions,
  NoIntroCheckpointTypeOptions,
} from "@/types/CheckpointType";
import { sortAscending } from "@/utils/sorting";
import {
  AnswerType,
  BlockGeneralType,
  BlockType,
  namedOperations,
  QuizType,
  UpdateCheckpointMutationVariables,
  useCheckpointLazyQuery,
  useRemoveBlocksMutation,
  useUpdateCheckpointMutation,
  useUploadBlockAssetsMutation,
  useUploadCheckpointImageMutation,
  useUploadQuestionSelectionAssetsMutation,
  useUpsertBlocksMutation,
  useUpsertQuizBlocksMutation,
  useUpdateUserOnboardedMutation,
} from "schema/generated/graphql";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";
import { useStore } from "utils/hooks/zustand";

const min = 1;
const max = 60;

const schema = z.object({
  title: z.string().nonempty(),
  link: z.string(),
  duration: z.number().min(min).max(max),
  description: z.optional(z.string()).nullable(),
  type: z.enum(["INTRODUCTION", "END", "LESSON", "QUIZ", "CHALLENGE"]),
  thumbnail: z.optional(z.any()),
});

const EditCheckpoint = ({ hostname }: Props): React.ReactElement => {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setMe);
  const tourOpen = useStore((state) => state.onboarding);
  const setTourOpen = useStore((state) => state.setOnboarding);
  const onboardStep = useStore((state) => state.onboardStep);
  const setOnboardingStep = useStore((state) => state.setOnboardStep);
  const [steps, setSteps] = React.useState<Step[]>([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isText, setIsText] = React.useState<any[]>([]);
  const [tourStep, setTourStep] = React.useState<number>(0);
  const [updateUserOnboarded] = useUpdateUserOnboardedMutation();
  const [preview, setPreview] = React.useState<string>();
  const [update] = useUpdateCheckpointMutation();
  const [uploadImage] = useUploadCheckpointImageMutation();
  const [getCheckpoint, checkpointResponse] = useCheckpointLazyQuery();
  const [isIntro, setIsIntro] = React.useState<boolean>(false);
  const [blocks, setBlocks] = React.useState<any>();
  const [currentBlocks, setCurrentBlocks] = React.useState<Blocks[]>([]);
  const [toDelete, setToDelete] = React.useState<Blocks[]>([]);
  const [upsert, upsertedBlocks] = useUpsertBlocksMutation();
  const [upsertQuestions, upsertedQuestions] = useUpsertQuizBlocksMutation();
  const [removeBlocks] = useRemoveBlocksMutation();
  const [uploadBulkImages, uploadBulkImagesResponse] =
    useUploadBlockAssetsMutation();
  const [uploadSelectionImages, uploadSelectionImagesResponse] =
    useUploadQuestionSelectionAssetsMutation();
  const [loading, setLoading] = React.useState<boolean>(false);

  const {
    handleSubmit,
    watch,
    formState: { errors },
    control,
    setValue,
    register,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const title = watch("title");
  const description = watch("description");
  const type = watch("type");

  const closeTour = (): void => {
    setTourOpen(false);
    setIsOpen(false);
  };

  const handleJoyrideCallback = (data: CallBackProps): void => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      setTourOpen(false);
    }
  };

  const updateOnboardStatus = async (): Promise<void> => {
    closeTour();
    setUser({ ...user, onboarded: true });
    try {
      await updateUserOnboarded({
        variables: {
          data: {
            onboarded: {
              set: true,
            },
          },
        },
      });
      router.push("/navigator/home");
    } catch (error) {
      console.log(error);
    }
  };

  const updateTourStep = (step: number): void => {
    setTourStep(step);
  };

  const updateCheckpoint = async (data: any): Promise<void> => {
    //Reparse the checkpoint description
    let parsed = JSON.parse(description);
    if (parsed !== null) {
      parsed.forEach((parsedElement: any) => {
        parsedElement.type === undefined && (parsedElement.type = "paragraph");
      });
    } else {
      parsed = [{ children: [{ text: "" }], type: "paragraph" }];
    }
    const tempDescription = JSON.stringify(parsed);
    // Update both the checkpoint & the blocks
    try {
      const variables: UpdateCheckpointMutationVariables = {
        data: {
          description: tempDescription,
          type: data.type,
          title: data.title,
          duration: data.duration,
          link: data.link,
        },
        id: router.query.id as string,
      };
      if (data.thumbnail === null) variables.data.imageId = null;
      await update({
        variables,
      });

      if (data.thumbnail && typeof data.thumbnail === "object") {
        await uploadImage({
          variables: {
            file: data.thumbnail,
            id: router.query.id as string,
          },
        });
      }

      const reparseBlocks: any = [];
      let challengeBlock = undefined;
      let index = 0;
      for (const block of currentBlocks) {
        if (type === "QUIZ") {
          //Reparse the block title
          let blockTempTitle = block.title as string;
          if (block.quizType === "DRAG_DROP") {
            const parsed = JSON.parse(block.title as string);
            if (parsed !== null) {
              parsed.forEach((parsedElement: any) => {
                parsedElement.type === undefined &&
                  (parsedElement.type = "paragraph");
              });
            }
            blockTempTitle = JSON.stringify(parsed);
          }

          //Reparse the block description
          let blockTempDescription = block.description as string;
          if (
            block.description &&
            (block.quizType === "MATCHING" || block.quizType === "HEARING")
          ) {
            const parsed = JSON.parse(block.description as string);
            if (parsed !== null) {
              parsed.forEach((parsedElement: any) => {
                parsedElement.type === undefined &&
                  (parsedElement.type = "paragraph");
              });
            }
            blockTempDescription = JSON.stringify(parsed);
          }

          reparseBlocks.push({
            title: blockTempTitle,
            order: index++,
            quizType: block.quizType,
            answerType: block.answerType,
            answerQuantityType: block.answerQuantityType,
            pairs: block.pairs?.map((obj) => {
              return {
                id: typeof obj.id === "string" ? obj.id : undefined,
                pair:
                  obj.assetId && obj.pair.length > 1
                    ? ["", obj.pair[1]]
                    : obj.pair,
                assetId: obj.assetId ?? obj.asset?.id,
                isImage: !isText.includes(block.id),
              };
            }),
            selections: block.selections?.map((obj) => {
              return {
                id: typeof obj.id === "string" ? obj.id : undefined,
                isCorrect: obj.isCorrect,
                text: obj.text,
                order: obj.order,
                asset: obj.asset?.id,
              };
            }),
            id: typeof block.id === "string" ? block.id : undefined,
            description: blockTempDescription,
          });
          if (block.file === null)
            reparseBlocks[reparseBlocks.length - 1].assetId = null;
        } else {
          if (block.blockType === BlockGeneralType.Challenge) {
            challengeBlock = block;
          } else {
            reparseBlocks.push({
              text: block.text,
              order: index++,
              blockType: block.blockType as any,
              id: typeof block.id === "string" ? block.id : undefined,
            });
          }
        }
      }

      // Once everything is pushed, we check if there is a challenge block, and shove it in the bottom
      if (challengeBlock) {
        reparseBlocks.push({
          order: index++,
          blockType: challengeBlock.blockType as any,
          id:
            typeof challengeBlock.id === "string"
              ? challengeBlock.id
              : undefined,
        });
      }

      if (toDelete.length > 0) {
        await removeBlocks({
          variables: {
            ids: toDelete.map((block) => block.id as string),
          },
        });
      }

      if (type === "QUIZ") {
        await upsertQuestions({
          variables: {
            data: {
              questionBlocks: reparseBlocks as any,
            },
            id: router.query.id as string,
          },
          refetchQueries: [namedOperations.Query.checkpoint],
        });
      } else {
        await upsert({
          variables: {
            data: {
              blocks: reparseBlocks as any,
            },
            id: router.query.id as string,
          },
          refetchQueries: [namedOperations.Query.checkpoint],
        });
      }
      setLoading(true);
    } catch (err) {
      console.log(err);
      toast(
        <Feedback
          title="There's an error!"
          subtitle="Failed to update checkpoint"
          type="error"
          disableFeedback={true}
        />,
        {
          progress: undefined,
          toastId: 1,
          autoClose: 3000,
        },
      );
    }
  };

  React.useEffect(() => {
    if (
      loading &&
      !uploadBulkImagesResponse.loading &&
      !uploadSelectionImagesResponse.loading
    ) {
      setLoading(false);
      if (
        uploadBulkImagesResponse.error ||
        uploadSelectionImagesResponse.error
      ) {
        console.error({
          bi: uploadBulkImagesResponse.error,
          si: uploadSelectionImagesResponse.error,
        });
        toast(
          <Feedback
            title="Something went wrong!"
            subtitle="Media failed to upload"
            type="error"
            disableFeedback={true}
          />,
          {
            progress: undefined,
            toastId: 1,
            autoClose: 3000,
          },
        );
      } else {
        if (onboardStep < 40) {
          setOnboardingStep(40);
        } else if (onboardStep < 70) {
          setOnboardingStep(70);
        } else {
          setOnboardingStep(74);
        }
        router.push(
          `/navigator/courses/${
            checkpointResponse.data?.checkpoint.course?.id ||
            checkpointResponse.data?.checkpoint.parentCheckPoint?.courseId
          }/details`,
        );
        toast(
          <Feedback
            title="Checkpoint Updated!"
            subtitle="Your changes have been saved"
            type="success"
            disableFeedback={true}
          />,
          {
            progress: undefined,
            toastId: 1,
            autoClose: 3000,
          },
        );
      }
    }
  }, [
    loading,
    uploadBulkImagesResponse.loading,
    uploadSelectionImagesResponse.loading,
  ]);

  const stepsArr: Step[] = [
    {
      //0
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>
              Select the estimate duration needed for students to complete the
              current checkpoint.
            </p>
            <p>
              Eg. How long will students take to finish reading the text or
              watching the videos
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
            <button
              onClick={(): void => {
                setTourStep(1);
              }}
              className="flex items-center font-bold"
            >
              <p>Continue</p>
              <HiChevronRight size={16} />
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.0)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_25",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //1
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>Upload a thumbnail image for your checkpoint here.</p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
            <button
              onClick={(): void => {
                setTourStep(2);
              }}
              className="flex items-center font-bold"
            >
              <p>Continue</p>
              <HiChevronRight size={16} />
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.0)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_26",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //2
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>Fill in the checkpoint title. *required </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
            <button
              onClick={(): void => {
                setTourStep(3);
              }}
              className="flex items-center font-bold"
            >
              <p>Continue</p>
              <HiChevronRight size={16} />
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.0)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_27",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //3
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>Write a short description of the course.</p>
            <p>
              Eg. What is this checkpoint about? What will students learn from
              the checkpoint?
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
            <button
              onClick={(): void => {
                setTourStep(4);
              }}
              className="flex items-center font-bold"
            >
              <p>Continue</p>
              <HiChevronRight size={16} />
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.0)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_28",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //4
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>This is the preview of your checkpoint on the Coursemap.</p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
            <button
              onClick={(): void => {
                setTourStep(5);
              }}
              className="flex items-center font-bold"
            >
              <p>Continue</p>
              <HiChevronRight size={16} />
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.0)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_29",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //5
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>
              The second section is where you customize the checkpoint contents.
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
            <button
              onClick={(): void => {
                setTourStep(6);
              }}
              className="flex items-center font-bold"
            >
              <p>Continue</p>
              <HiChevronRight size={16} />
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.0)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_30",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //6
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>
              There are 3 types of contents that can be added in the
              Introduction (as well as Lesson, Challenge and End) checkpoint:
              “Text”, “Media” and “Attachment”.
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
            <button
              onClick={(): void => {
                setTourStep(7);
              }}
              className="flex items-center font-bold"
            >
              <p>Continue</p>
              <HiChevronRight size={16} />
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.0)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_31",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //7
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>Let’s try adding in some text, click this selection.</p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.85)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_32",
      disableOverlay: false,
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //8
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>Element block successfully added!</p>
            <p>
              Text elements are suitable to be used as description or
              instructions. Fill in your content in the text box below.
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
            <button
              onClick={(): void => {
                setTourStep(9);
              }}
              className="flex items-center font-bold"
            >
              <p>Continue</p>
              <HiChevronRight size={16} />
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_33",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //9
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>Let’s try adding in some media, click this selection.</p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.85)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_34",
      disableOverlay: false,
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //10
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>Element block successfully added!</p>
            <p>
              Media elements are suitable to be used as supporting images,
              tutorial videos and audio. Click “Choose File” to upload
              image/video/audio files.
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
            <button
              onClick={(): void => {
                setTourStep(11);
              }}
              className="flex items-center font-bold"
            >
              <p>Continue</p>
              <HiChevronRight size={16} />
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_35",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //11
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>Let’s try adding in some attachments, click this selection.</p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.85)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_36",
      disableOverlay: false,
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //12
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>Element block successfully added!</p>
            <p>
              Attachment elements are suitable to be used as supporting teaching
              materials for students to download. Fill in the desciption text,
              then click “Choose File” to upload your files.{" "}
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
            <button
              onClick={(): void => {
                setTourStep(13);
              }}
              className="flex items-center font-bold"
            >
              <p>Continue</p>
              <HiChevronRight size={16} />
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_37",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //13
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>To remove element blocks, click this button.</p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
            <button
              onClick={(): void => {
                setTourStep(14);
              }}
              className="flex items-center font-bold"
            >
              <p>Continue</p>
              <HiChevronRight size={16} />
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_38",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //14
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>
              To re-order the element blocks, click & HOLD this button to drag
              them around.
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
            <button
              onClick={(): void => {
                setTourStep(15);
              }}
              className="flex items-center font-bold"
            >
              <p>Continue</p>
              <HiChevronRight size={16} />
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_39",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //15
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>
              Click here once all the content are filled in. You can always edit
              it later.
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_40",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //16
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>Click here to select the type of the curent checkpoint.</p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.85)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_43",
      disableOverlay: false,
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //17
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>
              Lesson: where you place your learning materials and tutorials for
              students.
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
            <button
              onClick={(): void => {
                if (
                  document.querySelector(".tour_button_43")?.ariaExpanded ===
                  "true"
                ) {
                  setTourStep(18);
                }
              }}
              className="flex items-center font-bold"
            >
              <p>Continue</p>
              <HiChevronRight size={16} />
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.0)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_44",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //18
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>
              Quiz: where you can come up with quizes regarding the previous
              learning points for students to review their learning progress.
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
            <button
              onClick={(): void => {
                if (
                  document.querySelector(".tour_button_43")?.ariaExpanded ===
                  "true"
                ) {
                  setTourStep(19);
                }
              }}
              className="flex items-center font-bold"
            >
              <p>Continue</p>
              <HiChevronRight size={16} />
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.0)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_45",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //19
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>
              Challenge: where you can challenge your students to complete a
              work/task related to the previous lessons.
            </p>
            <p>
              Students will also be able to share their work on this checkpoint.
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
            <button
              onClick={(): void => {
                setTourStep(20);
              }}
              className="flex items-center font-bold"
            >
              <p>Continue</p>
              <HiChevronRight size={16} />
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.0)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_46",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //20
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>
              While Lesson and Challenge type checkpoints share the same
              customizable checkpoint details and content elements as
              Introduction, Quiz is slightly different.
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.85)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_45",
      disableOverlay: false,
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //21
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>
              For Quiz Checkpoints, the second section is where you create the
              quiz questions.
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
            <button
              onClick={(): void => {
                setTourStep(22);
              }}
              className="flex items-center font-bold"
            >
              <p>Continue</p>
              <HiChevronRight size={16} />
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.0)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_48",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //22
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>
              There are 4 types of question format to be choose from: “Drag &
              Drop”, “Objective”, “Hearing” and “Matching”.
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
            <button
              onClick={(): void => {
                setTourStep(23);
              }}
              className="flex items-center font-bold"
            >
              <p>Continue</p>
              <HiChevronRight size={16} />
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.0)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_49",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //23
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>Let’s try adding drag & drop question, click this selection.</p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.85)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_50",
      disableOverlay: false,
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //24
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>Click to expand</p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.85)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_accordion_0",
      disableOverlay: false,
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //25
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>This is the preview of the question.</p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
            <button
              onClick={(): void => {
                setTourStep(26);
              }}
              className="flex items-center font-bold"
            >
              <p>Continue</p>
              <HiChevronRight size={16} />
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.0)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_51",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //26
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>
              Type in the question here. Click on “Answer Block” to add a empty
              block at where you wish to input the answers.
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
            <button
              onClick={(): void => {
                setTourStep(27);
              }}
              className="flex items-center font-bold"
            >
              <p>Continue</p>
              <HiChevronRight size={16} />
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.0)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_52",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //27
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>To add more answer selections, click here.</p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.85)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_53",
      disableOverlay: false,
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //28
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>
              Fill in your first answer selection here. Then select the block
              which this answer is suppose to be placed.
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
            <button
              onClick={(): void => {
                setTourStep(29);
              }}
              className="flex items-center font-bold"
            >
              <p>Continue</p>
              <HiChevronRight size={16} />
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.0)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "right",
      target: ".navigator_tour_54",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //29
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>Let’s try adding an objective question, click this selection.</p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.85)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_55",
      disableOverlay: false,
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //30
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>Click to expand</p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.85)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_accordion_1",
      disableOverlay: false,
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //31
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>Fill in the checkpoint title here.</p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
            <button
              onClick={(): void => {
                setTourStep(32);
              }}
              className="flex items-center font-bold"
            >
              <p>Continue</p>
              <HiChevronRight size={16} />
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.0)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_56",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //32
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>Select the type of answers, Text or Image.</p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
            <button
              onClick={(): void => {
                setTourStep(33);
              }}
              className="flex items-center font-bold"
            >
              <p>Continue</p>
              <HiChevronRight size={16} />
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.0)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_57",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //33
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>
              Select the quantity of answers. Does this question has a single
              answer only? or it has multiple answers?
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
            <button
              onClick={(): void => {
                setTourStep(34);
              }}
              className="flex items-center font-bold"
            >
              <p>Continue</p>
              <HiChevronRight size={16} />
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.0)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_58",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //34
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>Click &apos;Add Selection&apos;</p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.85)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_59",
      disableOverlay: false,
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //35
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>
              Fill in / upload the image of your first answer selection here.
              Then click on the right box to select if this is / is one of the
              correct answer.
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
            <button
              onClick={(): void => {
                setTourStep(36);
              }}
              className="flex items-center font-bold"
            >
              <p>Continue</p>
              <HiChevronRight size={16} />
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.0)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_60",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //36
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>Let’s try adding a hearing question, click this selection.</p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.85)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_61",
      disableOverlay: false,
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //37
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>Click to expand</p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.85)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_accordion_2",
      disableOverlay: false,
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //38
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>Fill in checkpoint title here.</p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
            <button
              onClick={(): void => {
                setTourStep(39);
              }}
              className="flex items-center font-bold"
            >
              <p>Continue</p>
              <HiChevronRight size={16} />
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.0)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_62",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //39
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>Click here to upload an audio file.</p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
            <button
              onClick={(): void => {
                setTourStep(40);
              }}
              className="flex items-center font-bold"
            >
              <p>Continue</p>
              <HiChevronRight size={16} />
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.0)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_63",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //40
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>Type in the question here.</p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
            <button
              onClick={(): void => {
                setTourStep(41);
              }}
              className="flex items-center font-bold"
            >
              <p>Continue</p>
              <HiChevronRight size={16} />
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.0)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_64",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //41
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>Click &apos;Add Selection&apos;</p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.85)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_65",
      disableOverlay: false,
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //42
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>
              Fill in your first answer selection here. Then click on the right
              box to select if this is the correct answer.
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
            <button
              onClick={(): void => {
                setTourStep(43);
              }}
              className="flex items-center font-bold"
            >
              <p>Continue</p>
              <HiChevronRight size={16} />
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.0)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_60_1",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //43
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>Let’s try adding a matching question, click this selection.</p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.85)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_67",
      disableOverlay: false,
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //44
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>Click to expand</p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.85)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_accordion_3",
      disableOverlay: false,
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //45
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>Type in the description here.</p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
            <button
              onClick={(): void => {
                setTourStep(46);
              }}
              className="flex items-center font-bold"
            >
              <p>Continue</p>
              <HiChevronRight size={16} />
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.0)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_68",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //46
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>
              Fill in your first selection in the first box on the left. Then
              fill in it’s matching answer in the second box on the right.
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
            <button
              onClick={(): void => {
                setTourStep(47);
              }}
              className="flex items-center font-bold"
            >
              <p>Continue</p>
              <HiChevronRight size={16} />
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.0)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_69",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //47
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>
              Click here once all the content are filled in. You can always edit
              it later.
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.0)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_40",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //48
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>
              Click here to select “End”. Then fill in the required details.
            </p>
            <p>
              This checkpoint can be used as a conclusion for the whole course.
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.85)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "right",
      target: ".navigator_tour_43",
      disableOverlay: false,
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //49
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>Click on &apos;End&apos;</p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
            <button
              onClick={(): void => {
                setTourStep(50);
              }}
              className="flex items-center font-bold"
            >
              <p>Continue</p>
              <HiChevronRight size={16} />
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
          overlayColor: "rgba(0,0, 0, 0.85)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "right",
      target: ".navigator_tour_end",
      disableOverlay: false,
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //50
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>
              Click here once all the content are filled in. You can always edit
              it later.
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={updateOnboardStatus}
              className="flex items-center font-bold text-[#66FFEE] active:none"
            >
              <p>Skip Tutorial</p>
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "auto",
      target: ".navigator_tour_40",
      disableBeacon: true,
      spotlightClicks: true,
    },
  ];

  React.useEffect(() => {
    const onClick = (): void => {
      if (tourOpen) {
        if (
          document.querySelector(".tour_button_43")?.ariaExpanded === "true" &&
          tourStep == 16
        ) {
          setTourStep(17);
        } else if (
          document.querySelector(".navigator_tour_accordion_0")
            ?.ariaExpanded === "true" &&
          tourStep == 24
        ) {
          setTourStep(25);
        } else if (
          document.querySelectorAll(".quiz_block").length > 0 &&
          tourStep == 27
        ) {
          setTourStep(28);
        } else if (
          document.querySelector(".navigator_tour_accordion_1") !== undefined &&
          tourStep == 30 &&
          document.querySelector(".navigator_tour_accordion_1")
            ?.ariaExpanded === "true"
        ) {
          setTourStep(31);
        } else if (
          document.querySelectorAll(".quiz_block_2").length > 0 &&
          tourStep == 34
        ) {
          setTourStep(35);
        } else if (
          document.querySelector(".navigator_tour_accordion_2") !== undefined &&
          tourStep == 37 &&
          document.querySelector(".navigator_tour_accordion_2")
            ?.ariaExpanded === "true"
        ) {
          setTourStep(38);
        } else if (
          document.querySelectorAll(".quiz_block_3").length > 0 &&
          tourStep == 41
        ) {
          setTourStep(42);
        } else if (
          document.querySelector(".navigator_tour_accordion_3") !== undefined &&
          tourStep == 44 &&
          document.querySelector(".navigator_tour_accordion_3")
            ?.ariaExpanded === "true"
        ) {
          setTourStep(45);
        } else if (
          document.querySelector(".tour_button_43")?.ariaExpanded === "true" &&
          tourStep == 48
        ) {
          setTourStep(49);
        }
      }
    };
    window.addEventListener("click", onClick);

    return (): any => {
      window.removeEventListener("click", onClick);
    };
  }, [tourStep]);

  React.useEffect(() => {
    async function uploadBlockAssets(): Promise<void> {
      if (upsertedBlocks.data) {
        // Here we filter to get only the asset blocks, ignoring blocks of type TEXT
        const assetBlocksOnly =
          upsertedBlocks.data.updateCheckpointCreateManyBlocks.blocks?.filter(
            (block) =>
              block.blockType !== BlockType.Text &&
              block.blockType !== BlockType.Challenge,
          );

        if (assetBlocksOnly && assetBlocksOnly.length > 0) {
          // Here we filter our local state data for the same thing
          const localData = [];
          let index = 0;
          for (const block of currentBlocks) {
            if (block.blockType !== BlockGeneralType.Text) {
              localData.push({
                text: block.text,
                order: index,
                blockType: block.blockType as any,
                id: typeof block.id === "string" ? block.id : undefined,
                file: block.file,
                subtitle: block.subtitles,
              });
            }
            index++;
          }

          // Sort to be safe
          assetBlocksOnly.sort(sortAscending);
          localData.sort(sortAscending);

          // Now that we have two matching datasets, we can merge both data & call the uploadBulkImages
          const files = [];
          for (let i = 0; i < assetBlocksOnly.length; i++) {
            let subTitle = {};
            if (localData[i]?.subtitle)
              subTitle = {
                subtitles: [...(localData[i].subtitle as any[])],
              };
            if (localData[i]?.file)
              files.push({
                fileUpload: localData[i].file,
                id: assetBlocksOnly[i].id,
                ...subTitle,
              });
          }

          // We remove any block without files
          const finalParse = files.filter(
            (block) =>
              block.fileUpload !== null && block.fileUpload !== undefined,
          );
          await uploadBulkImages({
            variables: {
              files: finalParse,
            },
          });
        }
      }
    }

    // This one will be slightly different. We will only perform a normal block asset update for hearing.
    // For the selections, they have a separate mutation
    async function uploadQuestionAssets(): Promise<void> {
      if (upsertedQuestions.data) {
        const hearingBlocksOnly =
          upsertedQuestions.data.updateCheckpointCreateManyQuestionBlocks.blocks?.filter(
            (block) => block.questionBlock?.quizType === QuizType.Hearing,
          );

        const mediaAssetsOnly =
          upsertedQuestions.data.updateCheckpointCreateManyQuestionBlocks.blocks?.filter(
            (block) =>
              block.questionBlock?.quizType === QuizType.DragDrop ||
              block.questionBlock?.quizType === QuizType.Matching ||
              block.questionBlock?.quizType === QuizType.Objective,
          );

        const objectiveImageOnly =
          upsertedQuestions.data.updateCheckpointCreateManyQuestionBlocks.blocks?.filter(
            (block) =>
              block.questionBlock?.quizType === QuizType.Objective &&
              block.questionBlock.answerType === AnswerType.Image,
          );

        let hearingBlockPromise;
        let mediaBlockPromise;
        let objectiveImagePromise;

        if (hearingBlocksOnly && hearingBlocksOnly.length > 0) {
          // Here we filter our local state data for the same thing
          const localData = [];
          let index = 0;
          for (const block of currentBlocks) {
            if (block.quizType === QuizType.Hearing) {
              localData.push({
                order: index,
                file: block.file,
              });
            }
            index++;
          }

          // Sort to be safe
          hearingBlocksOnly.sort(sortAscending);
          localData.sort(sortAscending);

          // Now that we have two matching datasets, we can merge both data & call the uploadBulkImages
          const files = [];
          for (let i = 0; i < hearingBlocksOnly.length; i++) {
            files.push({
              fileUpload: localData[i].file,
              id: hearingBlocksOnly[i].id,
            });
          }

          // We remove any block without files
          const finalParse = files.filter(
            (block) =>
              block.fileUpload !== null && block.fileUpload !== undefined,
          );

          if (finalParse.length > 0) {
            hearingBlockPromise = uploadBulkImages({
              variables: {
                files: finalParse,
              },
            });
          }
        }

        if (mediaAssetsOnly && mediaAssetsOnly.length > 0) {
          // Here we filter our local state data for the same thing
          const localData = [];
          let index = 0;
          for (const block of currentBlocks) {
            if (
              block.quizType === QuizType.DragDrop ||
              block.quizType === QuizType.Matching ||
              block.quizType === QuizType.Objective
            ) {
              localData.push({
                order: index,
                file: block.file,
              });
            }
            index++;
          }

          // Sort to be safe
          mediaAssetsOnly.sort(sortAscending);
          localData.sort(sortAscending);

          // Now that we have two matching datasets, we can merge both data & call the uploadBulkImages
          const files = [];
          for (let i = 0; i < mediaAssetsOnly.length; i++) {
            files.push({
              fileUpload: localData[i].file,
              id: mediaAssetsOnly[i].id,
            });
          }

          // We remove any block without files
          const finalParse = files.filter(
            (block) =>
              block.fileUpload !== null && block.fileUpload !== undefined,
          );

          if (finalParse.length > 0) {
            mediaBlockPromise = uploadBulkImages({
              variables: {
                files: finalParse,
              },
            });
          }
        }

        if (objectiveImageOnly && objectiveImageOnly.length > 0) {
          // Here we filter our local state data for the same thing
          const localData = [];
          let index = 0;
          for (const block of currentBlocks) {
            if (
              block.quizType === QuizType.Objective &&
              block.answerType === AnswerType.Image
            ) {
              localData.push({
                order: index,
                selections: block.selections,
              });
            }
            index++;
          }

          // Sort to be safe
          objectiveImageOnly.sort(sortAscending);
          localData.sort(sortAscending);

          // Now we have two sets of blocks + selection.
          // What we really need is the selections themselves. We need to map and concat the arrays
          const objectiveSelectionIds = (
            objectiveImageOnly.map(
              (block) => block.questionBlock?.selections,
            ) as any
          )
            .reduce((pre: any[], cur: any) => pre.concat(cur))
            .map((selection: { id: any }) => selection.id);

          const localDataFiles = (
            localData.map((block) => block.selections) as any
          )
            .reduce((pre: any[], cur: any) => pre.concat(cur))
            .map((selection: any) => selection.file);

          // Now that we can merge both data & call the uploadSelectionImages
          const files = [];
          for (let i = 0; i < objectiveSelectionIds.length; i++) {
            files.push({
              fileUpload: localDataFiles[i],
              id: objectiveSelectionIds[i],
            });
          }

          // We remove any block without files
          const finalParse = files.filter(
            (block) =>
              block.fileUpload !== null && block.fileUpload !== undefined,
          );

          if (finalParse.length > 0) {
            objectiveImagePromise = uploadSelectionImages({
              variables: {
                files: finalParse,
              },
            });
          }
        }

        await Promise.all([
          hearingBlockPromise,
          mediaBlockPromise,
          objectiveImagePromise,
        ]);
      }
    }

    setToDelete([]);

    if (upsertedBlocks.data) {
      uploadBlockAssets();
    } else if (upsertedQuestions.data) {
      uploadQuestionAssets();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upsertedBlocks.data, upsertedQuestions.data]);

  React.useEffect(() => {
    const defaults: any = {
      title: checkpointResponse.data?.checkpoint.title,
      description: checkpointResponse.data?.checkpoint.description,
      type: checkpointResponse.data?.checkpoint.type,
      thumbnail: checkpointResponse.data?.checkpoint.image?.url,
      duration: checkpointResponse.data?.checkpoint.duration,
    };
    reset(defaults);
    setPreview(checkpointResponse.data?.checkpoint.image?.url);
    setBlocks(checkpointResponse.data?.checkpoint.blocks);
    if (checkpointResponse.data?.checkpoint) {
      setIsIntro(
        checkpointResponse.data.checkpoint.order === 0 &&
          checkpointResponse.data.checkpoint.parentCheckpointId === null,
      );
    }

    window.scrollTo(0, 0);
    if (tourOpen && !steps.length) {
      if (onboardStep >= 40 && onboardStep < 70) {
        setTourStep(16);
      } else if (onboardStep >= 70) {
        setTourStep(48);
      } else {
        setTourStep(0);
      }
      setSteps(stepsArr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkpointResponse.data]);

  React.useEffect(() => {
    async function queryCheckpoint(): Promise<void> {
      if (router.query && router.query.id) {
        await getCheckpoint({
          variables: {
            id: router.query.id as string,
          },
        });
      }
    }

    if (router.query && router.query.id) {
      queryCheckpoint();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const memoTenant = React.useMemo(() => {
    return getTenant(hostname).name;
  }, [hostname]);

  const [resetEvent, setResetEvent] = React.useState<any>();

  return (
    <LightBackground>
      <Head>
        <title>{memoTenant}</title>
      </Head>
      {loading ? (
        <div
          className={`absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-60 z-30`}
        >
          <div className="fixed top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] flex flex-col items-center justify-center">
            <PacmanLoader
              color={"#1CB0F6"}
              loading={loading}
              css="left: -12px;"
            />
            <h1 className="mt-12 text-lg font-extrabold text-white">
              Uploading...
            </h1>
            <h2 className="text-white ">This may take a while</h2>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="relative z-10 flex items-center min-h-screen">
        <form onSubmit={handleSubmit(updateCheckpoint)}>
          <Section size="2xl" className="mb-20">
            {/* <a
            className="flex items-center col-span-2 px-6 cursor-pointer group mb-11 lg:px-8 w-max"
            onClick={(): void => {
              checkpointResponse.data?.checkpoint.course
                ? router.push(
                    `/navigator/courses/${checkpointResponse.data?.checkpoint.course?.id}/details`,
                  )
                : router.back();
            }}
            role="none"
          >
            <Button
              className="mr-2 aspect-square group-hover:bg-gray-400 group-hover:border-b-gray-500 group-active:bg-gray-600"
              size="sm"
              variant="secondary"
            >
              <HiChevronLeft size={16} />
            </Button>
            <p className="uppercase">Back</p>
          </a> */}

            <div className="grid grid-cols-1 px-6 lg:space-x-24 lg:grid-cols-2 lg:px-8">
              <div className="flex flex-col justify-center">
                <p className="pb-6 text-3xl font-bold lg:text-4xl">
                  1. Checkpoint Details
                </p>
                <div className="flex flex-col">
                  <label htmlFor="text" className="">
                    Type
                  </label>
                  {/* <SelectField
                    options={
                      isIntro
                        ? IntroCheckpointTypeOptions
                        : NoIntroCheckpointTypeOptions
                    }
                    control={control}
                    setValue={setValue}
                    fieldName="type"
                    defaultValue={null}
                    errors={errors}
                    disabled={isIntro}
                    className="navigator_tour_43"
                  /> */}
                  <Listbox
                    value={type}
                    onChange={(option): void => {
                      setValue("type", String(option));
                    }}
                  >
                    <div className="relative z-20 ">
                      <Listbox.Button className="tour_button_43 relative flex py-2 px-2 items-center uppercase font-semibold overflow-hidden text-base rounded-xl w-full placeholder-gray-400 placeholder-opacity-50 border-gray-200 border-2  text-black navigator_tour_43">
                        {type}
                      </Listbox.Button>
                      <Listbox.Options className="absolute w-full mt-2 origin-top-right divide-y font-semibold text-base oveflow-hidden bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {isIntro
                          ? IntroCheckpointTypeOptions.map((option, index) => (
                              /* eslint-disable-next-line */
                              <Listbox.Option
                                key={index}
                                value={option.value}
                                className="px-2 first:rounded-t-md last:rounded-b-md hover:bg cursor-pointer py-2 hover:bg-blue-100"
                              >
                                {option.value}
                              </Listbox.Option>
                            ))
                          : NoIntroCheckpointTypeOptions.map(
                              (option, index) => (
                                /* eslint-disable-next-line */
                                <Listbox.Option
                                  key={index}
                                  value={option.value}
                                  onClick={(): void => {
                                    if (
                                      tourOpen &&
                                      option.value == "QUIZ" &&
                                      tourStep == 20
                                    ) {
                                      setTourStep(21);
                                    }
                                  }}
                                  className={clsx(
                                    "px-2 first:rounded-t-md last:rounded-b-md hover:bg cursor-pointer py-2 hover:bg-blue-100",
                                    type == option.value &&
                                      "bg-purple-200 text-[#9B26B6] hover:bg-purple-200",
                                    option.value == "LESSON" &&
                                      "navigator_tour_44",
                                    option.value == "QUIZ" &&
                                      "navigator_tour_45",
                                    option.value == "QUIZ" &&
                                      "navigator_tour_46",
                                    option.value == "END" &&
                                      "navigator_tour_end",
                                  )}
                                >
                                  {option.value}
                                </Listbox.Option>
                              ),
                            )}
                      </Listbox.Options>
                    </div>
                  </Listbox>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="text" className="">
                    Duration
                  </label>
                  <InputField
                    required
                    type="number"
                    min={min}
                    max={max}
                    placeholder="Duration"
                    className="navigator_tour_25"
                    registration={{
                      ...register("duration", { valueAsNumber: true }),
                    }}
                    error={errors.duration}
                  />
                </div>
                <div className="flex flex-col pb-4">
                  <div className="flex justify-between">
                    <label htmlFor="text" className="">
                      Thumbnail Image (Recommended 354px x 200px)
                    </label>
                    <HiOutlineTrash
                      className="mr-5 cursor-pointer"
                      size={20}
                      color="#FF4B4B"
                      onClick={(): any => {
                        setValue("thumbnail", null);
                        setPreview(undefined);
                        setResetEvent({
                          filename: null,
                        });
                      }}
                    />
                  </div>
                  <DropzoneField
                    setValue={setValue}
                    fieldName="thumbnail"
                    size="full"
                    variant="dark"
                    className="navigator_tour_26"
                    setPreview={setPreview}
                    resetEvent={resetEvent}
                  />
                </div>
                <div className="flex flex-col pb-4">
                  <label htmlFor="text">Checkpoint Title</label>
                  <InputField
                    required
                    type="text"
                    className="navigator_tour_27"
                    placeholder="Checkpoint Title"
                    registration={{ ...register("title") }}
                    error={errors.title}
                  />
                </div>
                <div className="flex flex-col pb-4">
                  <label htmlFor="text">Link</label>
                  <InputField
                    type="text"
                    placeholder="Checkpoint link"
                    registration={{ ...register("link") }}
                    error={errors.link}
                  />
                </div>
                <div className="relative flex flex-col">
                  <label htmlFor="text" className="">
                    Short Description
                  </label>
                  {description !== undefined && (
                    <SlateField
                      id="description"
                      setValue={setValue}
                      className="navigator_tour_28"
                      data={description || ""}
                    />
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <CheckpointCardProps
                  name={title || "Title"}
                  desc={description || "Description"}
                  thumbnail={preview}
                  className="w-full max-w-xs h-min navigator_tour_29"
                  preview
                />
              </div>
            </div>
            {type === "QUIZ" ? (
              <Quiz
                blocks={blocks}
                currentBlocks={currentBlocks}
                setCurrentBlocks={setCurrentBlocks}
                toDelete={toDelete}
                setToDelete={setToDelete}
                updateTourStep={updateTourStep}
                isText={isText}
                setIsText={setIsText}
              />
            ) : (
              <Lesson
                courseId={
                  checkpointResponse.data?.checkpoint.course?.id as string
                }
                blocks={blocks}
                control={control}
                register={register}
                currentBlocks={currentBlocks}
                setCurrentBlocks={setCurrentBlocks}
                toDelete={toDelete}
                setToDelete={setToDelete}
                updateTourStep={updateTourStep}
              />
            )}
          </Section>
          <FormFooter
            onCancel={(): void => {
              router.back();
            }}
          />
        </form>
      </div>
      <Joyride
        callback={handleJoyrideCallback}
        continuous
        hideBackButton
        hideCloseButton
        run={tourOpen}
        scrollToFirstStep
        showProgress
        showSkipButton
        steps={steps}
        stepIndex={tourStep}
        disableCloseOnEsc
        disableOverlayClose
        tooltipComponent={ParentTooltip}
        disableOverlay
        styles={{
          options: {
            width: "auto",
            zIndex: 10000,
          },
          spotlight: {
            borderRadius: 20,
            boxShadow: "0px 0px 16px 8px rgba(255,255,255,0.10)",
          },
        }}
      />
      <Dialog
        isOpen={isOpen}
        onClose={(): void => {
          setIsOpen(false);
          setTourOpen(true);
        }}
        className=""
      >
        <div className="flex flex-col items-center justify-center w-full">
          <p className="text-xl font-extrabold text-red-600 lg:text-2xl">
            Warning!
          </p>
          <p className="my-6 text-base text-center text-gray-600 lg:text-lg">
            Are you sure you want to end the tour?
          </p>
          <div className="flex flex-row items-center space-x-8">
            <Button
              variant="brand1"
              onClick={(): void => {
                setIsOpen(false);
                setTourOpen(true);
              }}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={updateOnboardStatus}>
              Confirm
            </Button>
          </div>
        </div>
      </Dialog>
    </LightBackground>
  );
};

export default withAuthenticated(withApollo(EditCheckpoint));

export const getServerSideProps = extractHostname;
