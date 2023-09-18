import { Menu } from "@headlessui/react";
import { useRouter } from "next/router";
import Head from "next/head";
import React, { useEffect } from "react";
import {
  HiOutlineDotsHorizontal,
  HiOutlineVolumeUp,
  HiPaperAirplane,
  HiX,
  HiXCircle,
  HiPlay,
  HiOutlineSearch,
} from "react-icons/hi";
import ReactPlayer from "react-player/file";
import { toast } from "react-toastify";

import { CheckpointFooter } from "@/components/Checkpoint/CheckpointFooter";
import DNDQuestion from "@/components/Checkpoint/Interactive/DragAndDrop/DNDQuestion";
import HearingQuestion from "@/components/Checkpoint/Interactive/Hearing/HearingQuestion";
import MatchingQuestion from "@/components/Checkpoint/Interactive/Matching/MatchingQuestion";
import ObjectiveQuestion from "@/components/Checkpoint/Interactive/Objective/ObjectiveQuestion";
import { ChallengeBlock } from "@/components/Checkpoint/ChallengeBlock";
import { VideoPlayer } from "@/components/Checkpoint/VideoPlayer";
import { Button, Dialog } from "@/components/Elements";
// import { Card } from "@/components/Elements/Card";
// import { Progressbar } from "@/components/Elements/Progressbar";
import { Card } from "@/components/Elements/Card";
import { Progressbar } from "@/components/Elements/Progressbar";
import Section from "@/components/Elements/Section";
import { Feedback } from "@/components/Feedback";
import { DropzoneField } from "@/components/Form/DropzoneField";
import { AppLayout } from "@/components/Layout/AppLayout";
import { deserialize } from "@/utils/slate";
import { sortAscending } from "@/utils/sorting";
import { extractHostname, getTenant, Props } from "@/utils/tenant";
import {
  BlockType,
  Challenge,
  FileType,
  namedOperations,
  QuizType,
  Role,
  TopicType,
  useCheckpointLazyQuery,
  useCompleteCheckpointMutation,
  useLikeChallengeMutation,
  useUploadChallengeMutation,
  useCommentChallengeMutation,
  useDeleteChallengeMutation,
  useGetSelfEnrolledCheckpointLazyQuery,
  useStartCheckpointMutation,
  useFindManyCheckpointsLazyQuery,
  useReportChallengeMutation,
  useCreateAssesmentBlockMutation,
  useFindOneAssessmentUserLazyQuery,
  AssessmentQuestionResult,
  AssessmentQuestionStatus,
  EnrolledState,
} from "schema/generated/graphql";
import { useResultCallback } from "utils/hooks/useResultCallback";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";
import { useStore } from "utils/hooks/zustand";
import { AiFillFile } from "react-icons/ai";

const preAssesmentCourseId = [
  // "8e58fbaf-8ef2-4998-b020-d3538ad9be41",
  "797732f2-93ea-4b1a-a290-44a6969e1380", //preassess 2
  // "0100e569-e0d1-4105-a0a7-30e46096499f",
  "4b873a62-0076-4644-a6df-6e2784a0a54c", //preassess 1
  "0f70cfeb-c031-4ca6-8555-7f16a2515d5e", // staging
  // "b4b2b560-75a2-481c-b124-1962ab8fabf5", //dev
];

const StudentCheckpointDetails = ({ hostname }: Props): React.ReactElement => {
  // ============HOOKS
  const router = useRouter();
  const { progress, setProgress, user, setScrollRef } = useStore();

  const [newExp, setNewExp] = React.useState(0);
  const [audio, setAudio] = React.useState<any>();
  const [totalExp, setTotalExp] = React.useState(0);
  const [steps, setSteps] = React.useState<number>(1);
  const [questions, setQuestions] = React.useState<any>();
  const [comment, setComment] = React.useState<string>("");
  const [checkpoint, setCheckpoint] = React.useState<any>();
  const [myChallengesCount, setMyChallengesCount] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isComplete, setIsComplete] = React.useState<boolean>(false);
  const [selectedAnswers, setSelectedAnswers] = React.useState<any>([]);
  const [reportChallengeId, setReportChallengeId] = React.useState<string>("");
  const [reportMessage, setReportMessage] = React.useState<string>("");
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    React.useState<boolean>(false);
  const [submissionData, setSubmissionData] = React.useState<Challenge | null>(
    null,
  );
  const [playing, setPlaying] = React.useState<boolean>(false);
  const [isMagnificationOpen, setIsMagnificationOpen] =
    React.useState<boolean>(false);
  const [sdUrls, setSdUrls] = React.useState<string[]>([]);
  const [hdUrls, setHdUrls] = React.useState<string[]>([]);
  const [getCheckpoint, checkpointResponse] = useCheckpointLazyQuery();
  const [fetchSelftEnrolled, selfEnrolled] =
    useGetSelfEnrolledCheckpointLazyQuery();
  const [fetchNextCheckpoint, nextCheckpoint] =
    useFindManyCheckpointsLazyQuery();
  const [findUserAssessment, userAssessment] =
    useFindOneAssessmentUserLazyQuery();
  const [uploadChallenge] = useUploadChallengeMutation();
  const [like, likeResponse] = useLikeChallengeMutation();
  const [deleteMySubmission] = useDeleteChallengeMutation();
  const [completeCheckpoint] = useCompleteCheckpointMutation();
  const [addComment, commentResponse] = useCommentChallengeMutation();
  const [startCheckpoint, startedCheckpoint] = useStartCheckpointMutation();
  const [createAssessmentBlock] = useCreateAssesmentBlockMutation();
  const [createReport] = useReportChallengeMutation();

  const messagesEndRef = React.createRef<HTMLDivElement>();
  const chatInputRef = React.createRef<any>();

  // ============EFFECTS
  React.useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  useEffect(() => {
    const courseId =
      checkpointResponse.data?.checkpoint.parentCheckPoint?.courseId ??
      checkpointResponse.data?.checkpoint.course?.id;
    if (!courseId || !router.query.id) return;
    findUserAssessment({
      variables: {
        where: {
          studentId: { equals: user?.id },
          courseId: { equals: checkpoint?.course?.id },
        },
      },
    });
    fetchSelftEnrolled({
      variables: {
        checkpointId: router.query.id as string,
        courseId: courseId as string,
      },
    }).catch((err) => err);
  }, [router.query.id, checkpointResponse.data?.checkpoint]);

  useEffect(() => {
    if (
      selfEnrolled.data?.getSelfEnrolledCheckpoint ||
      selfEnrolled.data === selfEnrolled.error
    )
      return;
    if (checkpointResponse.data === checkpointResponse.error) return;
    const checkpoint = checkpointResponse.data?.checkpoint;
    if (!checkpoint) return;
    startCheckpoint({
      variables: {
        id: router.query.id as string,
        enrolledCourseId:
          checkpoint.parentCheckPoint === null
            ? (checkpoint!.course!.id as string)
            : (checkpoint!.parentCheckPoint!.courseId as string),
      },
    }).catch((err) => err);
  }, [selfEnrolled.data, checkpointResponse.data]);

  useEffect(() => {
    if (!isComplete) return;
    const id = checkpointResponse.data?.checkpoint.enrolledCheckpoints?.find(
      (cp) => cp.enrolledStudentId === user?.id,
    )?.id;
    // if (!id || !isStudent) return;
    if (user?.role === "TEACHER" || user?.role === "PARENT") {
      const nextUrl = getNextCheckpointUrl();
      if (nextUrl) router.push(nextUrl);
      //   .then(() => setProgress(0));
      // setScrollRef(checkpoint.id);
      return;
    }
    if (id) {
      completeCheckpoint({
        variables: { id },
        onCompleted: ({ completeCheckpoint }) => {
          if (!completeCheckpoint.student.expLog) {
            setTotalExp(completeCheckpoint.student.EXP);
          }
          const newExp = completeCheckpoint.student.expLog!.reduce(
            (prev, curr) => prev + curr.expGained,
            0,
          );
          const prevExp = completeCheckpoint.student.EXP - newExp;
          setNewExp(newExp);
          setTotalExp(prevExp);
        },
      }).catch((err) => err);
    }
  }, [isComplete, checkpointResponse.data?.checkpoint]);

  useResultCallback(
    startedCheckpoint,
    () => {
      selfEnrolled.refetch();
      checkpointResponse.refetch();
    },
    () => 1,
  );

  const mySubmissionId = React.useMemo((): string | null => {
    if (checkpoint && checkpoint.blocks) {
      const challengeBlock = checkpoint.blocks.find(
        (block: any) => block.blockType === BlockType.Challenge,
      );
      if (challengeBlock?.challengeBlock) {
        const submission = challengeBlock.challengeBlock.challengeGallery.find(
          (submission: any) => submission.creatorId === user?.id,
        );
        if (submission) {
          return submission.id;
        }
      }
    }
    return null;
  }, [checkpoint, user?.id]);

  // Check if user is student, if not, set progress to 0
  React.useEffect(() => {
    if (user && user.role !== "STUDENT") {
      setProgress(0);
    }
  }, [user, setProgress]);

  React.useEffect(() => {
    scrollToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submissionData]);

  React.useEffect(() => {
    if (commentResponse.data && commentResponse.data.commentChallenge) {
      const submission: any = {
        ...commentResponse.data.commentChallenge,
      };
      setSubmissionData(submission);
    }
  }, [commentResponse.data]);

  React.useEffect(() => {
    if (likeResponse.data && likeResponse.data.updateLikeChallenge) {
      const submission: any = {
        ...likeResponse.data.updateLikeChallenge,
      };

      setSubmissionData(submission);
    }
  }, [likeResponse.data]);

  React.useEffect(() => {
    if (checkpointResponse.data && checkpointResponse.data.checkpoint) {
      if (
        checkpointResponse.data.checkpoint.enrolledCheckpoints?.some(
          (enrolled) =>
            enrolled.enrolledStudentId == user?.id &&
            enrolled.state == EnrolledState.Complete,
        ) &&
        preAssesmentCourseId.includes(
          checkpointResponse.data.checkpoint.course?.id ?? "",
        )
      ) {
        router.push(
          `/student/courses/${checkpointResponse.data.checkpoint.course?.id}/coursemap`,
        );
      }
      setCheckpoint(checkpointResponse.data.checkpoint);

      //Count the number of challenges for the current user
      let myChallenges = 0;
      checkpointResponse.data.checkpoint.blocks?.forEach((block) => {
        block.challengeBlock?.challengeGallery?.forEach((gallery) => {
          if (gallery.creatorId == user?.id) {
            myChallenges = myChallenges + 1;
          }
        });
      });
      setMyChallengesCount(myChallenges);

      if (
        checkpointResponse.data.checkpoint.type === TopicType.Quiz &&
        checkpointResponse.data.checkpoint.blocks
      ) {
        const questions = [...checkpointResponse.data.checkpoint.blocks].sort(
          sortAscending,
        );
        setQuestions(questions);
        setSteps(questions.length);
        setProgress(0);
      } else {
        if (checkpointResponse.data.checkpoint.blocks) {
          const audio: any = {};
          checkpointResponse.data.checkpoint.blocks
            .filter(
              (block) =>
                block.blockType === BlockType.Media &&
                block.mediaBlock?.asset?.fileType === FileType.Audio,
            )
            .forEach((block) => {
              if (block.mediaBlock && block.mediaBlock.asset) {
                audio[block.mediaBlock.asset?.id] = new Audio(
                  block.mediaBlock.asset?.url,
                );
              }
            });
          setAudio(audio);
        }
        setProgress(0);
        setQuestions(null);
        setSteps(1);
      }
    }
  }, [checkpointResponse.data]);

  React.useEffect(() => {
    if (progress === steps) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [progress, steps]);

  useEffect(() => {
    if (!checkpointResponse.data) return;
    fetchNextCheckpoint({
      variables: {
        where: ((): any => {
          const parentCheckpointId =
            checkpointResponse.data?.checkpoint.parentCheckpointId;
          const courseId = checkpointResponse.data?.checkpoint.course?.id;
          const order = checkpointResponse.data?.checkpoint.order as number;
          if (parentCheckpointId)
            return {
              order: { equals: order + 1 },
              parentCheckpointId: { equals: parentCheckpointId },
            };
          return {
            order: { equals: order + 1 },
            courseId: { equals: courseId },
          };
        })(),
      },
    });
  }, [checkpointResponse.data]);

  React.useEffect(() => {
    const getCheckpointData = async (): Promise<void> => {
      await getCheckpoint({
        variables: {
          id: router.query.id as string,
        },
      });
    };

    if (router.query && router.query.id) {
      getCheckpointData();
    }
  }, [router, getCheckpoint]);

  React.useEffect(() => {
    const getAvailableUrl = async (): Promise<void> => {
      if (checkpoint && checkpoint.blocks) {
        const challengeBlock = checkpoint.blocks.find(
          (block: any) => block.blockType === BlockType.Challenge,
        );
        if (challengeBlock?.challengeBlock?.challengeGallery) {
          setSdUrls(
            Array(
              challengeBlock?.challengeBlock?.challengeGallery?.length,
            ).fill(""),
          );
          setHdUrls(
            Array(
              challengeBlock?.challengeBlock?.challengeGallery?.length,
            ).fill(""),
          );
          const tempSdUrls = Array(
            challengeBlock?.challengeBlock?.challengeGallery?.length,
          ).fill("");
          const tempHdUrls = Array(
            challengeBlock?.challengeBlock?.challengeGallery?.length,
          ).fill("");
          for (
            let index = 0;
            index < challengeBlock?.challengeBlock?.challengeGallery?.length;
            index++
          ) {
            if (
              challengeBlock?.challengeBlock?.challengeGallery?.[index].asset
                .fileType === "VIDEO"
            ) {
              const oriUrl =
                challengeBlock?.challengeBlock?.challengeGallery?.[index].asset
                  .url;
              let ext: any = oriUrl.split(".");
              ext = ext[ext.length - 1];
              const tempSdUrl = oriUrl
                .replace(/(\/)(?=[^/]*$)/, `$&sd-`)
                .split(".")
                .slice(0, -1)
                .concat(ext.toLowerCase())
                .join(".");

              const tempHdUrl = oriUrl
                .replace(/(\/)(?=[^/]*$)/, `$&hd-`)
                .split(".")
                .slice(0, -1)
                .concat(ext.toLowerCase())
                .join(".");

              const sdStatus = await fetch(
                `/api/checkIfExists?url=${encodeURIComponent(tempSdUrl)}`,
                {
                  method: "HEAD",
                },
              ).then(function (res) {
                return res.ok;
              });
              const hdStatus = await fetch(
                `/api/checkIfExists?url=${encodeURIComponent(tempHdUrl)}`,
                {
                  method: "HEAD",
                },
              ).then(function (res) {
                return res.ok;
              });

              sdStatus
                ? (tempSdUrls[index] = tempSdUrl)
                : (tempSdUrls[index] = oriUrl);
              hdStatus
                ? (tempHdUrls[index] = tempHdUrl)
                : (tempHdUrls[index] = oriUrl);
            }
          }
          setSdUrls(tempSdUrls);
          setHdUrls(tempHdUrls);
        }
      }
    };
    getAvailableUrl().catch(console.error);
  }, [checkpoint]);

  const memoTenant = React.useMemo(() => {
    return getTenant(hostname).name;
  }, [hostname]);

  // ============FUNCTIONS
  const isStudent = user?.role === Role.Student;
  const nextCheckpointId = nextCheckpoint.data?.checkpoints[0]?.id;

  const getHdUrl = (submissionId: string): string => {
    if (checkpoint && checkpoint.blocks) {
      const challengeBlock = checkpoint.blocks.find(
        (block: any) => block.blockType === BlockType.Challenge,
      );
      const hdUrlIndex =
        challengeBlock?.challengeBlock.challengeGallery.findIndex(
          (elem: any) => elem.id == submissionId,
        );
      return hdUrls[hdUrlIndex];
    }
    return "";
  };

  const play = (id: string): void => {
    if (audio && audio[id]) {
      if (audio[id].paused) {
        audio[id].play();
      } else {
        audio[id].pause();
      }
    }
  };

  const likeSubmission = async (id: string): Promise<void> => {
    try {
      await like({
        variables: {
          id,
        },
        refetchQueries: [namedOperations.Query.checkpoint],
      });
    } catch (err) {
      console.error(err);
      toast(
        <Feedback
          title="There's an error!"
          subtitle="Unable to like submission"
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

  const deleteSubmission = async (id: string): Promise<void> => {
    try {
      await deleteMySubmission({
        variables: {
          id,
        },
        refetchQueries: [namedOperations.Query.checkpoint],
      });
      setIsDeleteConfirmationOpen(false);
      setIsOpen(false);
      setSubmissionData(null);
      toast(
        <Feedback
          title="Success!"
          subtitle="Submission removed"
          type="success"
          disableFeedback={true}
        />,
        {
          progress: undefined,
          toastId: 1,
          autoClose: 3000,
        },
      );
    } catch (err) {
      console.error(err);
      toast(
        <Feedback
          title="There's an error!"
          subtitle="Unable to like submission"
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

  const openModal = (id: string): void => {
    const challengeBlock = checkpoint.blocks.find(
      (block: any) => block.blockType === BlockType.Challenge,
    );
    if (challengeBlock) {
      const submission = challengeBlock?.challengeBlock?.challengeGallery?.find(
        (submission: any) => submission.id === id,
      );
      setSubmissionData(submission);
      setIsOpen(true);
    }
  };

  const scrollToBottom = (): void => {
    if (messagesEndRef && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const submitComment = async (id: string): Promise<void> => {
    try {
      if (comment !== "") {
        await addComment({
          variables: {
            challengeId: id,
            text: comment,
          },
          refetchQueries: [namedOperations.Query.checkpoint],
        });
        setComment("");
      }
    } catch (err) {
      console.error(err);
      toast(
        <Feedback
          title="There's an error!"
          subtitle="Unable to add comment"
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

  const upload = async (id: string, file: File): Promise<void> => {
    try {
      await uploadChallenge({
        variables: {
          id,
          file,
        },
        refetchQueries: [namedOperations.Query.checkpoint],
      });
    } catch (err) {
      console.error(err);
      toast(
        <Feedback
          title="There's an error!"
          subtitle="Unable to upload challenge"
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

  const checkAnswers = (): void => {
    // If no questions, we just continue to next page
    if (!questions || questions.length < 1) {
      if (checkpoint.type === TopicType.Challenge) {
        // If challenge, we need to see if the user has already uploaded a challenge
        const challengeBlock = checkpoint.blocks.find(
          (block: any) => block.blockType === BlockType.Challenge,
        );
        if (challengeBlock) {
          if (!mySubmissionId) {
            toast(
              <Feedback
                title="Missing submission!"
                subtitle="Please submit your answer to the challenge"
                type="error"
                disableFeedback={true}
              />,
              {
                progress: undefined,
                toastId: 1,
                autoClose: 3000,
              },
            );
            return;
          }
        }
      }
      setProgress(progress + 1);
    } else {
      // We need to properly check answers
      // Matching will have different criterias
      // DND also now has different criterias
      let hasWrong = true;
      let allCorrectSelected = false;
      if (questions[progress].questionBlock.quizType === QuizType.Matching) {
        const answerLen = selectedAnswers.length;
        const questionLen = questions[progress].questionBlock.pairs.length;
        allCorrectSelected =
          selectedAnswers.filter((ans: any) => ans.state !== "CORRECT")
            .length === 0;
        hasWrong = answerLen !== questionLen;
      } else if (
        questions[progress].questionBlock.quizType === QuizType.DragDrop
      ) {
        const selections = questions[progress].questionBlock.selections;
        hasWrong = !!selectedAnswers.find(
          (ans: any) => ans && ans.some((a: any) => a && a.isCorrect === false),
        );
        !selectedAnswers.length
          ? (allCorrectSelected = false)
          : (allCorrectSelected = true);
        selectedAnswers.length ===
        questions[progress].questionBlock.selections.filter(
          (selection: any) => selection.isCorrect,
        ).length
          ? (allCorrectSelected = true)
          : (allCorrectSelected = false);
        // Check if the order (position) is correct
        for (let i = 0; i < selectedAnswers.length; i++) {
          if (selectedAnswers[i]) {
            if (!selectedAnswers[i].length) {
              allCorrectSelected = false;
              break;
            }
            selectedAnswers[i].forEach((ans: any) => {
              const correspondingAns = selections.find(
                (real: any) => real && ans && real.id === ans.id,
              );
              allCorrectSelected &&=
                correspondingAns && ans && correspondingAns.order === ans.order;
            });
          } else {
            allCorrectSelected = false;
            break;
          }
        }
      } else {
        const selections = questions[progress].questionBlock.selections;
        hasWrong = !!selectedAnswers.find(
          (ans: any) => ans.isCorrect === false,
        );
        allCorrectSelected =
          selectedAnswers.filter((ans: any) => ans.isCorrect === true)
            .length ===
          selections.filter((selection: any) => selection.isCorrect === true)
            .length;
      }
      if (
        (hasWrong || !allCorrectSelected) &&
        !preAssesmentCourseId.includes(checkpoint.course?.id)
      ) {
        toast(
          <Feedback
            title="Incorrect!"
            subtitle="Please try again!"
            type="error"
            disableFeedback={false}
          />,
          {
            progress: undefined,
            toastId: 1,
            autoClose: 3000,
          },
        );
      } else if (
        preAssesmentCourseId.includes(checkpoint.course?.id) &&
        (hasWrong || !allCorrectSelected)
      ) {
        toast(
          <Feedback title="Incorrect!" type="error" disableFeedback={true} />,
          {
            progress: undefined,
            toastId: 1,
            autoClose: 3000,
          },
        );
        setSelectedAnswers([]);
        createAssessmentBlock({
          variables: {
            data: {
              assessmentUser: {
                connect: {
                  id: userAssessment.data?.findOneAssessmentUser.id,
                },
              },
              result: AssessmentQuestionResult.Incorrect,
              status: AssessmentQuestionStatus.Completed,
              question: {
                connect: {
                  id: questions[progress].id,
                },
              },
            },
          },
        });
        setProgress(progress + 1);
      } else {
        if (questions[progress].questionBlock.quizType === QuizType.Hearing) {
          const audio = document.getElementById(
            "hearing-audio",
          ) as HTMLAudioElement;
          audio.pause();
        }

        toast(
          <Feedback title="Correct!" type="success" disableFeedback={true} />,
          {
            progress: undefined,
            toastId: 1,
            autoClose: 3000,
          },
        );
        if (preAssesmentCourseId.includes(checkpoint.course?.id)) {
          createAssessmentBlock({
            variables: {
              data: {
                assessmentUser: {
                  connect: {
                    id: userAssessment.data?.findOneAssessmentUser.id,
                  },
                },
                result: AssessmentQuestionResult.Correct,
                status: AssessmentQuestionStatus.Completed,
                question: {
                  connect: {
                    id: questions[progress].id,
                  },
                },
              },
            },
          });
        }
        setSelectedAnswers([]);
        setProgress(progress + 1);
        // if (progress === steps - 1) {
        //   router
        //     .push(getNextCheckpointUrl() ?? getCourseUrl())
        //     .then(() => setProgress(0));
        //   setScrollRef(checkpoint.id);
        // }
      }
    }
  };

  const getCourseUrl = (): string => {
    if (isStudent) {
      return `/student/courses/${
        checkpoint.course?.id || checkpoint.parentCheckPoint?.courseId
      }/coursemap`;
    } else if (user?.role === "PARENT") {
      return `/adult/courses/preview/${
        checkpoint.course?.id || checkpoint.parentCheckPoint?.courseId
      }/coursemap`;
    } else {
      return `/navigator/courses/preview/${
        checkpoint.course?.id || checkpoint.parentCheckPoint?.courseId
      }/coursemap`;
    }
  };

  const getNextCheckpointUrl = (): string | null => {
    if (!nextCheckpointId) return null;
    if (user?.role === "STUDENT") {
      return `/student/checkpoint/${nextCheckpointId}`;
    } else if (user?.role === "PARENT") {
      return `/adult/checkpoint/${nextCheckpointId}`;
    } else {
      return `/navigator/checkpoint/${nextCheckpointId}`;
    }
  };

  // This function checks if I already liked a specific submission
  const checkAlreadyLiked = (submissionId: string): boolean => {
    const challengeBlock = checkpoint.blocks.find(
      (block: any) => block.blockType === BlockType.Challenge,
    );
    if (challengeBlock?.challengeBlock) {
      const submission = challengeBlock.challengeBlock.challengeGallery.find(
        (submission: any) => submission.id === submissionId,
      );
      return !!submission?.likes?.find(
        (like: any) => like.likerId === user?.id,
      );
    }
    return false;
  };

  const reportSubmission = (challengeId: string): void => {
    setReportChallengeId(challengeId);
  };

  const submitReport = async (): Promise<void> => {
    await createReport({
      variables: {
        challengeId: reportChallengeId,
        report: reportMessage,
      },
    })
      .then(() => {
        toast(
          <Feedback
            title="Report submitted!"
            type="success"
            disableFeedback={true}
          />,
          {
            progress: undefined,
            toastId: 1,
            autoClose: 3000,
          },
        );
      })
      .catch((err) => {
        console.log("err -----> ", err);
        toast(
          <Feedback
            title="An error has occured!"
            type="error"
            disableFeedback={true}
          />,
          {
            progress: undefined,
            toastId: 1,
            autoClose: 3000,
          },
        );
      })
      .finally(() => {
        setReportChallengeId("");
        setReportMessage("");
      });
  };

  const ref = React.useRef(null);
  // ============VIEWS
  return (
    <AppLayout darkLayout>
      <Head>
        <title>{memoTenant}</title>
      </Head>
      <div className="relative z-10 flex min-h-screen text-white">
        <Section size="2xl">
          <a
            className="flex items-center lg:col-span-2 px-0 cursor-pointer group mb-4 lg:mb-0 lg:px-6"
            onClick={(): void => {
              checkpoint.course?.id || checkpoint.parentCheckPoint?.courseId
                ? user?.role === Role.Student
                  ? router.push(
                      `/student/courses/${
                        checkpoint.course?.id ||
                        checkpoint.parentCheckPoint?.courseId
                      }/coursemap`,
                    )
                  : user?.role === Role.Parent
                  ? router.push(
                      `/adult/courses/preview/${
                        checkpoint.course?.id ||
                        checkpoint.parentCheckPoint?.courseId
                      }/coursemap`,
                    )
                  : router.push(
                      `/navigator/courses/preview/${
                        checkpoint.course?.id ||
                        checkpoint.parentCheckPoint?.courseId
                      }/coursemap`,
                    )
                : router.back();
            }}
            role="none"
          >
            {!isComplete && <HiX size={24} className="text-gray-400" />}
          </a>
          {checkpoint ? (
            user?.role !== "STUDENT" || !isComplete ? (
              checkpoint.type === TopicType.Quiz ? (
                <div className="flex flex-col w-full pb-48 lg:px-36 xl:px-60">
                  {questions[progress] ? (
                    questions[progress].questionBlock.quizType ===
                    QuizType.DragDrop ? (
                      <DNDQuestion
                        block={questions[progress].questionBlock}
                        selectedAnswers={selectedAnswers}
                        setSelectedAnswers={setSelectedAnswers}
                      />
                    ) : questions[progress].questionBlock.quizType ===
                      QuizType.Objective ? (
                      <ObjectiveQuestion
                        block={questions[progress].questionBlock}
                        selectedAnswers={selectedAnswers}
                        setSelectedAnswers={setSelectedAnswers}
                      />
                    ) : questions[progress].questionBlock.quizType ===
                      QuizType.Hearing ? (
                      <HearingQuestion
                        block={questions[progress].questionBlock}
                        selectedAnswers={selectedAnswers}
                        setSelectedAnswers={setSelectedAnswers}
                      />
                    ) : questions[progress].questionBlock.quizType ===
                      QuizType.Matching ? (
                      <MatchingQuestion
                        courseId={checkpoint.course?.id as string}
                        block={questions[progress].questionBlock}
                        selectedAnswers={selectedAnswers}
                        setSelectedAnswers={setSelectedAnswers}
                      />
                    ) : null
                  ) : null}
                </div>
              ) : (
                <div className="flex flex-col w-full mb-10 lg:px-32 lg:mb-36">
                  <h1 className="text-xl font-extrabold lg:text-2xl">
                    {checkpoint.title}
                  </h1>
                  {checkpoint.link && (
                    <a
                      href={
                        checkpoint.link.includes("http")
                          ? checkpoint.link
                          : `https://${checkpoint.link}`
                      }
                    >
                      <p className="text-sm lg:text-lg">{checkpoint.link}</p>
                    </a>
                  )}
                  <p className="flex flex-col mt-4 lg:mt-2 text-sm lg:text-base opacity-80">
                    {deserialize(checkpoint.description)}
                  </p>
                  {checkpoint.blocks &&
                    checkpoint.blocks.map((block: any) =>
                      block.blockType === BlockType.Text ? (
                        <div
                          className="flex flex-col mt-4 text-sm lg:text-base opacity-80"
                          key={block.id}
                        >
                          {deserialize(block.textBlock.text)}
                        </div>
                      ) : block.blockType === BlockType.Media ? (
                        <div
                          className="flex flex-col w-full mt-4 lg:mt-2 text-sm lg:text-base"
                          key={block.id}
                        >
                          {/* This should render depending on the asset type */}

                          {block.mediaBlock.asset?.fileType ===
                          FileType.Image ? (
                            <div className="object-contain py-2 overflow-hidden lg:h-[320px] xl:h-[448px] rounded-2xl">
                              <img
                                src={block.mediaBlock.asset?.url}
                                alt=""
                                className="h-full rounded-2xl"
                              />
                            </div>
                          ) : block.mediaBlock.asset?.fileType ===
                            FileType.Audio ? (
                            <div className="flex flex-row items-center justify-center w-full">
                              <Button
                                onClick={(): void =>
                                  play(block.mediaBlock.asset?.id)
                                }
                                variant="brand1"
                                className="my-6 w-max"
                              >
                                <HiOutlineVolumeUp size={48} />
                              </Button>
                            </div>
                          ) : block.mediaBlock.asset?.fileType ===
                            FileType.Video ? (
                            <>
                              {/* <div className="w-full py-2 overflow-hidden rounded-2xl"> */}
                              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                              <VideoPlayer
                                url={block.mediaBlock.asset?.url}
                                playerProps={{
                                  className: "w-full aspect-video rounded-2xl",
                                  width: "100%",
                                  height: "100%",
                                }}
                                subtitles={block.mediaBlock.asset.Subtitles}
                              />
                              {/* {video({
                                  className: "w-full aspect-video rounded-2xl",
                                  width: '100%',
                                  height: '100%',
                                })} */}
                              {/* <video
                                  src={block.mediaBlock.asset?.url}
                                  controls
                                  className="w-full aspect-video rounded-2xl"
                                /> */}
                              {/* </div> */}
                            </>
                          ) : (
                            <Button
                              className="w-full py-2 text-sm lg:text-base"
                              key={block.id}
                              variant="brand1"
                              onClick={(): any =>
                                window.open(
                                  block.mediaBlock.asset?.url,
                                  "_blank",
                                )
                              }
                            >
                              Download Media
                            </Button>
                          )}
                        </div>
                      ) : block.blockType === BlockType.Attachment ? (
                        <div className="flex flex-col">
                          <p className="mt-4 text-sm font-extrabold text-white lg:text-base">
                            {block.attachmentBlock.text}
                          </p>
                          <Button
                            className="max-w-md mt-2 text-sm lg:text-base"
                            key={block.id}
                            variant="brand1"
                            onClick={(): any =>
                              window.open(
                                block.attachmentBlock.asset?.url,
                                "_blank",
                              )
                            }
                          >
                            Download Attachment
                          </Button>
                        </div>
                      ) : block.blockType === BlockType.Question ? (
                        <p
                          className="mt-4 text-sm lg:text-base opacity-80"
                          key={block.id}
                        >
                          {block.textBlock.text}
                        </p>
                      ) : block.blockType === BlockType.Challenge ? (
                        <div
                          className="flex flex-col items-center justify-center mt-6"
                          key={block.id}
                        >
                          <p className="my-4 text-base font-extrabold text-white lg:text-lg">
                            Challenge Gallery
                          </p>
                          {myChallengesCount >= 5 ? (
                            mySubmissionId && (
                              <Button
                                className="mt-12"
                                variant="brand1"
                                onClick={(): void => openModal(mySubmissionId)}
                              >
                                View Submission
                              </Button>
                            )
                          ) : (
                            <DropzoneField
                              className="mt-12"
                              onChange={upload}
                              id={block.id}
                              fieldName="challenge"
                            />
                          )}
                          {/* Render all the challenges here */}
                          <div className="grid items-center justify-center grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6 w-full">
                            {block.challengeBlock.challengeGallery.map(
                              (submission: any, index: number) => (
                                <ChallengeBlock
                                  submission={submission}
                                  index={index}
                                  checkAlreadyLiked={checkAlreadyLiked}
                                  likeSubmission={likeSubmission}
                                  openModal={openModal}
                                  sdUrls={sdUrls}
                                  key={submission.id}
                                  deleteSubmission={deleteSubmission}
                                />
                              ),
                            )}
                          </div>
                        </div>
                      ) : null,
                    )}
                  {/* {checkpoint.type === TopicType.Challenge && (
                    // <Button
                    //   onClick={(): void => console.log("Submit")}
                    //   variant="brand1"
                    //   className="max-w-md mt-4 text-sm lg:text-base"
                    // >
                    //   Submit Challenge
                    // </Button>
                  // )} */}
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center w-full px-12 py-6 lg:py-10 lg:px-36">
                <div className="flex flex-col items-center justify-center w-full lg:max-w-2xl">
                  <h1 className="text-3xl font-extrabold lg:text-4xl">
                    Lesson Complete!
                  </h1>
                  <div className="mt-8 mb-10">
                    <lottie-player
                      id="chestOpen"
                      ref={ref}
                      autoplay
                      mode="normal"
                      src="/images/course/checkpoint/content/lf30_8vkl3hiq.json"
                      style={{ width: "300px", height: "300px" }}
                    ></lottie-player>
                  </div>
                  {/* <Card className="flex flex-col items-center justify-between w-full px-4 py-5 mt-12 mb-6 lg:flex-row">
                    <p className="mb-2 text-base font-extrabold uppercase">
                      Novacoin Earned
                    </p>
                    <div className="flex flex-row items-center">
                      <img
                        src="/images/common/coin.svg"
                        alt=""
                        className="w-8 mr-4"
                      />
                      <p className="text-lg font-extrabold text-yellow-500 lg:text-xl">
                        8,888,888
                      </p>
                    </div>
                  </Card> */}
                  <Card className="grid self-center w-full grid-cols-2 px-4 py-5">
                    <p className="self-center col-span-2 mb-4 text-base font-extrabold uppercase lg:col-span-1 lg:mb-0 justify-self-center lg:justify-self-start">
                      EXP Earned
                    </p>
                    <div className="flex flex-col items-center col-span-2 font-extrabold lg:col-span-1">
                      <div className="flex flex-row items-center w-full">
                        <img
                          src="/images/dashboard/exp.png"
                          alt=""
                          className="w-5 mr-1"
                        />
                        Lv.{Math.floor((totalExp + newExp) / 1000) + 1}
                        <div className="relative w-full ml-4">
                          <Progressbar
                            percent={((totalExp + newExp) % 1000) / 10}
                            customColor="#1CB0F6"
                            className="w-full"
                          />
                          <p className="absolute left-0 text-xs font-extrabold opacity-80 -top-4">
                            +{newExp}
                          </p>
                          <p className="absolute right-0 text-xs font-extrabold opacity-80 -top-4">
                            +{(newExp / 1000) * 100}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )
          ) : null}
        </Section>
        {!isComplete ? (
          <CheckpointFooter
            padding="xs"
            onPrimary={(): void => {
              checkAnswers();
            }}
            primaryText="Check"
            secondaryText="Discuss"
          />
        ) : (
          <CheckpointFooter
            padding="xs"
            onPrimary={(): void => {
              if (questions) {
                if (isComplete) {
                  router.push(getNextCheckpointUrl() ?? getCourseUrl());
                  setScrollRef(checkpoint.id);
                } else {
                  // when user answer questions
                  checkAnswers();
                }
              } else {
                // when content is not quiz
                setScrollRef(checkpoint.id);
                router.push(getNextCheckpointUrl() ?? getCourseUrl());
              }
            }}
            primaryText={nextCheckpointId ? "Continue" : "Finish"}
            secondaryText={undefined}
            buttonAttr={{
              disabled: checkpointResponse.loading,
            }}
            buttons={
              <Button
                disabled={checkpointResponse.loading}
                variant="gray"
                type="submit"
                className="mr-4"
                onClick={(): void => {
                  setScrollRef(nextCheckpointId ?? checkpoint.id);
                  router.push(getCourseUrl()).then(() => setProgress(0));
                }}
              >
                Back To Course
              </Button>
            }
          />
        )}
      </div>
      <Dialog
        initialFocus={chatInputRef}
        isOpen={isOpen}
        onClose={(): void => {
          setPlaying(false);
          setIsOpen(false);
        }}
        className="lg:max-w-3xl"
      >
        {submissionData && (
          <div className="grid grid-cols-3 gap-x-8">
            <div className="flex flex-col justify-between w-full h-full col-span-2">
              <div className="relative flex flex-col items-center justify-center w-full h-full overflow-hidden bg-black rounded-xl">
                <div className="absolute top-0 left-0 flex flex-row items-center justify-between w-full p-4 z-10">
                  <p className="font-bold text-white">
                    {submissionData.creator.username}
                  </p>
                  {submissionData.creatorId === user?.id ? (
                    <div className="relative flex flex-row">
                      <HiOutlineSearch
                        size={24}
                        color="white"
                        cursor="pointer"
                        className="mr-1"
                        onClick={(): void => setIsMagnificationOpen(true)}
                      />
                      <div
                        className="mr-2 cursor-pointer"
                        onClick={(): void => setIsDeleteConfirmationOpen(true)}
                      >
                        <img
                          src={
                            "/images/course/checkpoint/content/remove-file.svg"
                          }
                          alt=""
                        />
                      </div>
                    </div>
                  ) : (
                    <Menu>
                      <Menu.Button className="relative flex flex-row">
                        <HiOutlineSearch
                          size={24}
                          color="white"
                          cursor="pointer"
                          className="mr-1"
                          onClick={(): void => setIsMagnificationOpen(true)}
                        />
                        <HiOutlineDotsHorizontal
                          size={24}
                          color="white"
                          cursor="pointer"
                        />
                      </Menu.Button>
                      <Menu.Items className="absolute flex flex-col px-4 py-2 text-gray-600 bg-white rounded-lg top-10 right-4">
                        <Menu.Item>
                          {({ active }): any => (
                            <button
                              onClick={(): void =>
                                reportSubmission(submissionData.id)
                              }
                              className={`${
                                active && "bg-gray-200 rounded-md"
                              } px-2 py-1 cursor-pointer`}
                            >
                              Report submission
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  )}
                </div>
                {submissionData?.asset.fileType === "VIDEO" ? (
                  <div className="relative flex items-center justify-center mx-auto text-center px-auto">
                    <ReactPlayer
                      playing={playing}
                      url={getHdUrl(submissionData.id)}
                      width="100%"
                      height="100%"
                    />
                    <button
                      className="absolute flex items-center justify-center w-full h-full text-white"
                      onClick={(): void => setPlaying(!playing)}
                    >
                      {!playing && <HiPlay size={64} />}
                    </button>
                  </div>
                ) : submissionData.asset?.fileType == "DOCUMENTS" ? (
                  <a href={submissionData.asset.url} className="cursor-pointer">
                    <AiFillFile size={96} color="white" />
                  </a>
                ) : (
                  <img
                    src={submissionData?.asset.url}
                    className="cursor-pointer"
                    alt=""
                  />
                )}
              </div>
              <div className="flex flex-row items-center justify-between mt-4">
                <div className="flex flex-row">
                  {checkAlreadyLiked(submissionData?.id || "") ? (
                    <img
                      src="/images/dashboard/heart.png"
                      alt=""
                      className="cursor-pointer w-6 mr-2"
                      onClick={(): Promise<void> =>
                        likeSubmission(submissionData?.id || "")
                      }
                    />
                  ) : (
                    <img
                      src="/images/dashboard/heart-outline.png"
                      alt=""
                      className="cursor-pointer w-6 mr-2"
                      onClick={(): Promise<void> =>
                        likeSubmission(submissionData?.id || "")
                      }
                    />
                  )}
                  <p className="font-bold text-gray-500">
                    {submissionData?.likes?.length} likes
                  </p>
                </div>
                <div className="flex flex-row">
                  {submissionData?.comments?.length ? (
                    <img
                      src="/images/dashboard/comment.png"
                      alt=""
                      className="w-6 mr-2"
                    />
                  ) : (
                    <img
                      src="/images/dashboard/comment-active.png"
                      alt=""
                      className="w-6 mr-2"
                    />
                  )}
                  <p className="font-bold text-gray-500">
                    {submissionData?.comments?.length} comments
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col h-full col-span-1">
              <div className="flex flex-row items-center justify-between w-full">
                <p className="font-bold text-gray-600">Comments</p>
                <HiXCircle
                  size={24}
                  color="#e34286"
                  cursor="pointer"
                  onClick={(): void => setIsOpen(false)}
                />
              </div>
              {/* Comments here */}
              <div className="flex flex-col w-full h-full min-h-[22.5rem] overflow-y-auto">
                {submissionData &&
                submissionData.comments &&
                submissionData.comments.length > 0 ? (
                  submissionData.comments.map((comment) => (
                    <div className="flex flex-row" key={comment.id}>
                      {/* <img
                        src={comment.commenter.student?.avatarImage?.url}
                        alt=""
                      /> */}
                      <div className="flex flex-col">
                        <p className="font-bold text-gray-600">
                          {comment.commenter.firstName}{" "}
                          {comment.commenter.lastName}
                        </p>
                        <p className="text-gray-600">{comment.text}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-full">
                    <p className="font-bold text-gray-400">No comments</p>
                    <p className="text-center text-gray-400">
                      Be the first to share a comment!
                    </p>
                  </div>
                )}
                <div
                  className="flex float-left clear-both"
                  ref={messagesEndRef}
                ></div>
              </div>
              <form
                className="flex flex-row items-center justify-between"
                onSubmit={(e: any): void => {
                  e.preventDefault();
                  submitComment(submissionData.id);
                }}
              >
                <input
                  type="text"
                  placeholder="Leave your comment"
                  className="block w-full text-black placeholder-gray-400 placeholder-opacity-50 border-2 border-gray-200 bg-gray-50 rounded-xl focus:ring-0 focus:border-black"
                  value={comment}
                  onChange={(e: any): void => {
                    setComment(e.target.value);
                  }}
                  ref={chatInputRef}
                />
                <HiPaperAirplane
                  size={24}
                  className="ml-2 transform rotate-90 text-brand1"
                  cursor="pointer"
                  onClick={(): Promise<void> =>
                    submitComment(submissionData.id)
                  }
                />
              </form>
            </div>
          </div>
        )}
        <Dialog
          isOpen={isMagnificationOpen}
          onClose={(): void => setIsMagnificationOpen(false)}
          className="relative sm:max-w-5xl"
        >
          <img
            src={submissionData?.asset.url}
            className="w-full object-cover"
            alt=""
          />
          <HiXCircle
            size={24}
            color="#e34286"
            cursor="pointer"
            onClick={(): void => setIsMagnificationOpen(false)}
            className="absolute top-6 right-6"
          />
        </Dialog>
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
                onClick={(): Promise<void> =>
                  deleteSubmission(submissionData?.id || "")
                }
              >
                Confirm
              </Button>
            </div>
          </div>
        </Dialog>
        <Dialog
          isOpen={reportChallengeId.length > 0}
          onClose={(): void => setReportChallengeId("")}
          className=""
        >
          <div className="flex flex-col items-center justify-center w-full">
            <p className="text-xl font-extrabold text-red-600 lg:text-2xl">
              Warning!
            </p>
            <p className="my-6 text-base text-center text-gray-600 lg:text-lg">
              Provide a reason for your report
            </p>
            <input
              value={reportMessage}
              onChange={(e): void => {
                setReportMessage(e.target.value);
              }}
              type="text"
              placeholder="Leave your report"
              className="block w-full text-black placeholder-gray-400 placeholder-opacity-50 border-2 border-gray-200 bg-gray-50 rounded-xl focus:ring-0 focus:border-black"
            />
            <div className="flex flex-row items-center my-3 space-x-8">
              <Button
                variant="brand1"
                onClick={(): void => {
                  setReportMessage("");
                  setReportChallengeId("");
                }}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={(): Promise<void> => submitReport()}
              >
                Confirm
              </Button>
            </div>
          </div>
        </Dialog>
      </Dialog>
    </AppLayout>
  );
};

export default withAuthenticated(withApollo(StudentCheckpointDetails));

export const getServerSideProps = extractHostname;
