import { zodResolver } from "@hookform/resolvers/zod";
// import { enableBodyScroll } from "body-scroll-lock";
import { format } from "date-fns";
// import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { FaUserAstronaut } from "react-icons/fa";
import { HiX, HiStar, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { toast } from "react-toastify";
import * as z from "zod";

import CourseThumbnail from "@/components/Course/CourseThumbnail/CourseThumbnail";
import { Button, Dialog } from "@/components/Elements";
import { Card } from "@/components/Elements/Card";
import { Divider } from "@/components/Elements/Divider";
// import { Progressbar } from "@/components/Elements/Progressbar";
import Section from "@/components/Elements/Section";
import { Title } from "@/components/Elements/Title";
import { Feedback } from "@/components/Feedback";
import { TextAreaField } from "@/components/Form";
import { AppLayout } from "@/components/Layout";
import { Tooltip } from "@/components/Onboard";
import { deserialize } from "@/utils/slate";
import { extractHostname, getTenant, Props } from "@/utils/tenant";
import {
  CourseReview,
  useCourseReviewsLazyQuery,
  useCourseWithEnrolledLazyQuery,
  useCreateCourseReviewMutation,
  useEnrollCourseMutation,
  useUpdateUserOnboardedMutation,
  useCreateAssessmentUserMutation,
} from "schema/generated/graphql";
import { withApollo } from "utils/hooks/withApollo";
import { useStore } from "utils/hooks/zustand";

const courseReviewSchema = z.object({
  score: z.number().int().min(1).max(5).default(1),
  comment: z.string(),
});

const preAssesmentCourseId = [
  // "8e58fbaf-8ef2-4998-b020-d3538ad9be41",
  "797732f2-93ea-4b1a-a290-44a6969e1380", //preassess 2
  // "0100e569-e0d1-4105-a0a7-30e46096499f",
  "4b873a62-0076-4644-a6df-6e2784a0a54c", //preassess 1
  "0f70cfeb-c031-4ca6-8555-7f16a2515d5e", // staging
  // "b4b2b560-75a2-481c-b124-1962ab8fabf5", //dev
];

const CourseDetails = ({ hostname }: Props): React.ReactElement => {
  // ============EFFECTS
  const router = useRouter();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setMe);
  const tourOpen = useStore((state) => state.onboarding);
  const setTourOpen = useStore((state) => state.setOnboarding);
  // const setOnboardStep = useStore((state)=> state.setOnboardStep);
  const tourStepStore = useStore((state) => state.onboardStep);

  const [steps, setSteps] = React.useState<Step[]>([]);
  const [tourStep, setTourStep] = React.useState(0);
  const [course, setCourse] = React.useState<any>();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [courseReviews, setCourseReviews] = React.useState<any>();
  const [isEnrolled, setIsEnrolled] = React.useState<boolean>(false);
  const [selectedStars, setSelectedStars] = React.useState<number>(1);
  const [hoverStars, setHoverStars] = React.useState<number>(selectedStars);
  const [displayReviewForm, setDisplayReviewForm] =
    React.useState<boolean>(false);

  const [enrollCourse] = useEnrollCourseMutation();
  const [createCourseReview] = useCreateCourseReviewMutation();
  const [updateUserOnboarded] = useUpdateUserOnboardedMutation();

  const [getCourse, courseResponse] = useCourseWithEnrolledLazyQuery();
  const [getCourseReviews, courseReviewsResponse] = useCourseReviewsLazyQuery();
  const [createAssesmentUsers] = useCreateAssessmentUserMutation();
  const [audio, setAudio] = React.useState<HTMLAudioElement[]>([]);
  const [audioState, setAudioState] = React.useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const {
    handleSubmit,
    formState: { isValid },
    setValue,
    register,
  } = useForm({
    resolver: zodResolver(courseReviewSchema),
  });

  const stepsArr: Step[] = [
    {
      content: (
        <div>
          <img
            className="absolute z-20 hidden -mt-44 -ml-60 sm:block"
            src="/images/onboarding/helios.png"
            alt=""
          />
          <div className="w-64 sm:w-80 sm:ml-[46px] sm:pl-4">
            <div className="space-y-4 font-semibold">
              <p>
                You can check each course details, the teacher&apos;s
                information and the other enrolled students
              </p>
              <button
                id="volume"
                className="w-6 h-6 text-gray-500 cursor-pointer"
                onClick={(): void => {
                  toggleVolume(0);
                }}
              >
                <img src="/images/onboarding/volume-on.svg" alt="" />
              </button>
            </div>
            <div className="flex items-center justify-between mt-4 gap-x-3">
              <button
                onClick={(): Promise<boolean> =>
                  router.push("/student/courses")
                }
                className="flex items-center font-bold focus:outline-none text-[#6B7280]"
              >
                <HiChevronLeft size={16} />
                <p>Back</p>
              </button>
              <button
                onClick={(): void => {
                  audio[0].pause();
                  setTourStep(1);
                }}
                className="flex items-center font-bold text-[#9B26B6]"
              >
                <p>Continue</p>
                <HiChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      ),
      placement: "center",
      target: "body",
      hideFooter: true,
      disableCloseOnEsc: true,
      disableOverlayClose: true,
      spotlightClicks: false,
    },
    {
      content: (
        <div>
          <img
            className="absolute z-20 -mt-52 -ml-60 md:t-[15 hidden sm:block"
            src="/images/onboarding/helios.png"
            alt=""
          />
          <div className="sm:ml-[46px] sm:pl-4 w-60 sm:w-80">
            <div className="space-y-4 font-semibold">
              <p>Click on Enroll Course to start the adventure!</p>
              <button
                id="volume"
                className="w-6 h-6 text-gray-500 cursor-pointer"
                onClick={(): void => {
                  toggleVolume(1);
                }}
              >
                <img src="/images/onboarding/volume-on.svg" alt="" />
              </button>
            </div>
            <div className="flex items-center justify-start mt-10">
              <button
                onClick={(): void => {
                  audio[1].pause();
                  setTourStep(0);
                }}
                className="flex items-center font-bold focus:outline-none text-[#6B7280]"
              >
                <HiChevronLeft size={16} />
                <p>Back</p>
              </button>
            </div>
          </div>
        </div>
      ),
      styles: {
        options: {
          overlayColor: "rgba(0,0, 0, 0.85)",
        },
      },
      placement: "bottom",
      target: ".tour_7",
      hideFooter: true,
      disableOverlay: false,
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      content: (
        <div>
          <img
            className="absolute z-20 -mt-52 sm:ml-[75%] lg:-ml-60 hidden sm:block"
            src="/images/onboarding/helios.png"
            alt=""
          />
          <div className="lg:ml-[46px] lg:pl-4">
            <div className="space-y-4 font-semibold">
              <p>Leave a review if you like this Course and tell us why!</p>
              <button
                id="volume"
                className="w-6 h-6 text-gray-500 cursor-pointer"
                onClick={(): void => {
                  toggleVolume(2);
                }}
              >
                <img src="/images/onboarding/volume-on.svg" alt="" />
              </button>
            </div>
            <div className="flex items-center justify-between mt-10">
              <button
                className="flex items-center font-bold text-[#6B7280] focus:outline-none"
                onClick={(): any => {
                  audio[2].pause();
                  router.push(`/student/courses/${router.query.id}/coursemap`);
                }}
              >
                <HiChevronLeft size={16} />
                <p>Back</p>
              </button>
              <button
                className="flex items-center font-bold text-[#9B26B6]"
                onClick={(): void => {
                  const mediaQuery = window.matchMedia("(min-width: 1024px)");
                  audio[2].pause();
                  // Check if hit lg breakpoint
                  const mobileMenuTourHandler = (e: any): void => {
                    if (e.matches) {
                      setTourStep(5);
                    } else {
                      setTourStep(3);
                    }
                  };

                  mediaQuery.addEventListener("change", mobileMenuTourHandler);

                  mobileMenuTourHandler(mediaQuery);
                }}
              >
                <p>Next</p>
                <HiChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "#00C7B1",
        },
      },
      placement: "left",
      target: ".tour_11",
      hideFooter: true,
      disableBeacon: true,
      spotlightClicks: false,
    },
    {
      content: (
        <div>
          <div className="space-y-4 font-semibold">
            <p>Click on the menu icon</p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={(): void => {
                setTourStep(2);
              }}
              className="flex items-center font-bold text-[#6B7280] active:none"
            >
              <HiChevronLeft size={16} />
              <p>Back</p>
            </button>
            <button
              onClick={(): void => {
                if (
                  document.querySelector(".mobile-menu")?.ariaExpanded ===
                  "true"
                ) {
                  setTourStep(4);
                }
              }}
              className="flex items-center font-bold text-[#9B26B6]"
            >
              <p>Next</p>
              <HiChevronRight size={16} />
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "transparent",
        },
      },
      placement: "bottom",
      target: ".mobile-menu",
      spotlightClicks: true,
    },
    {
      content: (
        <div>
          <div className="space-y-4 font-semibold">
            <p>Here is where you can design your Avatar!</p>
            <button
              id="volume"
              className="w-6 h-6 text-gray-500 cursor-pointer"
              onClick={(): void => {
                toggleVolume(3);
              }}
            >
              <img src="/images/onboarding/volume-on.svg" alt="" />
            </button>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={(): void => {
                audio[3].pause();
                setTourStep(3);
              }}
              className="flex items-center font-bold text-[#6B7280] focus:outline-none"
            >
              <HiChevronLeft size={16} />
              <p>Back</p>
            </button>
          </div>
        </div>
      ),
      placement: "bottom",
      target: "#Avatar",
      spotlightClicks: true,
    },
    {
      content: (
        <div>
          <img
            className="absolute z-20 -mt-44 -ml-52"
            src="/images/onboarding/helios.png"
            alt=""
          />
          <div className="pl-4 ml-16">
            <div className="flex justify-between space-x-4 font-semibold">
              <p>Here is where you can design your Avatar!</p>
              <img src="/images/onboarding/avatar.png" alt="" />
            </div>
            <button
              id="volume"
              className="w-6 h-6 text-gray-500 cursor-pointer"
              onClick={(): void => {
                toggleVolume(3);
              }}
            >
              <img src="/images/onboarding/volume-on.svg" alt="" />
            </button>
            <div className="flex items-center justify-between mt-10">
              <button
                onClick={(): void => {
                  audio[3].play();
                  setTourStep(2);
                }}
                className="flex items-center font-bold text-[#6B7280] focus:outline-none"
              >
                <HiChevronLeft size={16} />
                <p>Back</p>
              </button>
            </div>
          </div>
        </div>
      ),
      placement: "bottom",
      target: ".tour_12",
      hideFooter: true,
      disableBeacon: true,
      spotlightClicks: true,
    },
  ];

  // ============EFFECTS
  React.useEffect(() => {
    setAudio(
      !tourOpen
        ? []
        : [
            new Audio("/audio/onboarding/student/5.mp3"),
            new Audio("/audio/onboarding/student/6.mp3"),
            new Audio("/audio/onboarding/student/12.mp3"),
            new Audio("/audio/onboarding/student/13.mp3"),
          ],
    );
  }, []);

  React.useEffect(() => {
    if (courseResponse.data && courseResponse.data.course) {
      setCourse(courseResponse.data.course);
      if (user && courseResponse.data.course.enrolledCourses) {
        const enrolled =
          courseResponse.data.course.enrolledCourses.findIndex(
            (enrolled) => enrolled.studentId === user.id,
          ) !== -1;
        setIsEnrolled(enrolled);
      }
      if (tourOpen && !steps.length) {
        window.scrollTo(0, 0);
        if (tourStepStore == 11) {
          setTourStep(2);
        }
        setSteps(stepsArr);
      }
    }
  }, [courseResponse.data, user]);

  React.useEffect(() => {
    if (router.query && router.query.id) {
      getCourseData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  React.useEffect(() => {
    if (!router.query?.id) return;
    updateCourseReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, getCourseReviews]);

  React.useEffect(() => {
    if (!courseReviewsResponse.data) return;
    setCourseReviews(courseReviewsResponse.data.findManyCourseReviews);
  }, [courseReviewsResponse]);

  React.useEffect(() => {
    setValue("score", selectedStars);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStars]);

  const memoTenant = React.useMemo(() => {
    return getTenant(hostname);
  }, [hostname]);

  // ============FUNCTIONS
  const closeTour = (): void => {
    setTourOpen(false);
    setIsOpen(false);
  };

  const toggleVolume = (index: number): void => {
    let src = "";
    if (audioState[index]) {
      audio[index].pause();
      src = "/images/onboarding/volume-on.svg";
    } else {
      audio[index].play();
      src = "/images/onboarding/volume-off.svg";
    }
    const tempAudioState = audioState;
    tempAudioState[index] = !tempAudioState[index];
    setAudioState(tempAudioState);

    //toggle volume icon in button
    const elem = document.getElementById("volume");
    let child = elem?.lastElementChild;
    while (child) {
      elem?.removeChild(child);
      child = elem?.lastElementChild;
    }

    const volumeIcon = document.createElement("img");
    volumeIcon.setAttribute("src", src);
    volumeIcon.setAttribute("alt", "");
    elem?.appendChild(volumeIcon);
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
      router.push("/student/home");
    } catch (error) {
      console.log(error);
    }
  };

  const getCourseData = async (): Promise<void> => {
    await getCourse({
      variables: {
        id: router.query.id as string,
        // studentId: user?.id as string,
      },
    });
  };

  const updateCourseReviews = (): Promise<any> =>
    getCourseReviews({
      variables: {
        id: router.query.id as string,
      },
    });

  const submitCourseReview = (data: any): void => {
    createCourseReview({
      variables: {
        data: {
          comment: data.comment,
          courseId: router.query.id as string,
          score: data.score,
        },
      },
    })
      .then(() => {
        setDisplayReviewForm(false);
        updateCourseReviews();
        getCourseData();
        toast(
          <Feedback
            title="Course review submitted!!"
            type="success"
            disableFeedback={true}
          />,
          { toastId: 1, autoClose: 5000 },
        );
      })
      .catch((err) => {
        toast(
          <Feedback
            title="Course review submission failed"
            subtitle={err.message}
            type="error"
            disableFeedback={true}
          />,
          { toastId: 1, autoClose: 5000 },
        );
      });
  };

  const handleJoyrideCallback = (data: CallBackProps): void => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      // setTourOpen(false);
    }

    // logGroup(type, data);
  };

  const enroll = async (): Promise<void> => {
    try {
      if (
        user?.id &&
        router.query.id &&
        preAssesmentCourseId.includes((router.query.id as string) ?? "") &&
        courseResponse.data?.course.checkpoints?.filter(
          (checkpoint) => checkpoint.order == 0,
        )?.[0]?.id
      ) {
        createAssesmentUsers({
          variables: {
            data: {
              student: { connect: { id: user.id } },
              grade: 0,
              enrollCourse: {
                create: {
                  course: {
                    connect: {
                      id: router.query.id as string,
                    },
                  },
                  student: {
                    connect: {
                      id: user.id,
                    },
                  },
                },
              },
              EnrolledCheckpoint: {
                create: {
                  checkpoint: {
                    connect: {
                      id: courseResponse.data?.course.checkpoints?.filter(
                        (checkpoint) => checkpoint.order == 0,
                      )?.[0]?.id,
                    },
                  },
                  enrolledCourse: {
                    connect: {
                      studentId_id: {
                        studentId: user.id,
                        // id: "8e58fbaf-8ef2-4998-b020-d3538ad9be41",
                        // id: "c1fa9442-41f8-4c7b-b091-257d35780b9b", // ,pre assess 1
                        id: router.query.id as string,
                      },
                    },
                  },
                },
              },
            },
          },
        });
      } else {
        await enrollCourse({
          variables: {
            data: {
              id: router.query.id as string,
            },
          },
        });
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  // const disableBody = (target: any): void => disableBodyScroll(target);
  // const enableBody = (target: any): void => enableBodyScroll(target);

  // ============VIEWS

  return (
    <AppLayout hostname={hostname} darkLayout>
      <Head>
        <title>{memoTenant.name}</title>
      </Head>
      <div className="relative z-10 flex min-h-screen">
        <Section size="2xl">
          {/* <a
            className="flex items-center col-span-2 px-6 cursor-pointer group mb-11 lg:px-8 w-max"
            onClick={(): void => {
              router.push(`/student/courses/`);
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
            <p className="text-white uppercase">Back to course listing</p>
          </a> */}

          {/* Content */}
          {course ? (
            <div className="grid grid-cols-1 pt-8 space-y-6 lg:space-y-0 lg:space-x-12 lg:grid-cols-5">
              {/* Left Col */}
              <div className="lg:col-span-3">
                <div className="flex flex-col items-center lg:flex-row">
                  <CourseThumbnail
                    preview={course.thumbnail?.url ?? memoTenant.logo.png}
                  />
                  <p className="mt-4 text-2xl font-extrabold text-white lg:text-xl lg:mt-0">
                    {course.title}
                  </p>
                </div>

                {/* Course description */}
                <div className="mt-10">
                  <p className="text-lg font-extrabold text-white lg:text-xl">
                    About the course
                  </p>
                  <div className="flex flex-col text-base text-white lg:text-lg">
                    {deserialize(course.description)}
                  </div>
                </div>
                <div className="mt-10">
                  <p className="mb-5 text-xl font-bold text-white lg:text-2xl">
                    Information
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-12 md:grid-cols-4">
                    <Card className="px-4 py-3 text-white transition duration-150 ease-in-out transform cursor-pointer cols-span-1 hover:scale-105">
                      <Link
                        href={`/navigator/profile/${course.teacher.user.id}`}
                        passHref
                      >
                        <div className="flex flex-col">
                          {course.teacher.photo?.url ? (
                            <img
                              src={course.teacher.photo?.url}
                              alt=""
                              className="w-12 mb-4 rounded-full"
                            />
                          ) : (
                            <div className="w-12 h-12 mb-4 rounded-full">
                              <FaUserAstronaut size={48} />
                            </div>
                          )}
                          <p className="font-extrabold xl:text-xl">
                            {course.teacher.user.firstName}{" "}
                            {course.teacher.user.lastName}
                          </p>
                          <p className="text-sm font-bold opacity-60">
                            Teacher
                          </p>
                        </div>
                      </Link>
                    </Card>

                    <Card className="px-4 py-3 text-white cols-span-1 transition duration-150 ease-in-out transform hover:scale-105 cursor-pointer">
                      <div
                        className="flex flex-col"
                        onClick={(): Promise<boolean> =>
                          router.push({
                            pathname: "/student/courses",
                            query: {
                              currentCategory: course.category.name,
                            },
                          })
                        }
                      >
                        <img
                          src={course.category.activeImgUrl}
                          alt=""
                          className="w-12 max-w-3xl mb-4"
                        />
                        <p className="font-extrabold xl:text-xl">
                          {course.category.name}
                        </p>
                        <p className="text-sm font-bold opacity-60">Category</p>
                      </div>
                    </Card>
                    <Card className="px-4 py-3 text-white cols-span-1">
                      <div className="flex flex-col">
                        <img
                          src={`/images/course/information/difficulty_${course.level.toLowerCase()}.png`}
                          alt=""
                          className="w-12 max-w-3xl mb-4"
                        />
                        <p className="font-extrabold capitalize xl:text-xl">
                          {course.level.toLowerCase()}
                        </p>
                        <p className="text-sm font-bold opacity-60">
                          Difficulty
                        </p>
                      </div>
                    </Card>
                    <Card className="px-4 py-3 text-white cols-span-1">
                      <div className="flex flex-col">
                        <img
                          src="/images/course/information/duration.png"
                          alt=""
                          className="w-12 max-w-3xl mb-4"
                        />
                        <p className="font-extrabold xl:text-xl">
                          {course.duration} minutes
                        </p>
                        <p className="text-sm font-bold opacity-60">Duration</p>
                      </div>
                    </Card>
                  </div>
                </div>

                {/* <div className="mt-10">
                  <p className="mb-5 text-xl font-bold text-white lg:text-2xl">
                    Rewards
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-12">
                    <Card className="px-4 py-3 text-white cols-span-1">
                      <div className="flex flex-row">
                        <img
                          src="/images/course/information/rewards.png"
                          alt=""
                          className="w-12 max-w-3xl mr-4"
                        />
                        <div className="flex flex-col w-full">
                          <div className="flex flex-row items-center justify-between w-full">
                            <p className="text-lg font-extrabold lg:text-xl">
                              3,600
                            </p>
                            <p className="text-xs font-bold">+21.5%</p>
                          </div>
                          <Progressbar percent={80} customColor="#C042F1" />
                        </div>
                      </div>
                    </Card>
                    <Card className="px-4 py-3 text-white cols-span-1">
                      <div className="flex flex-row">
                        <img
                          src="/images/common/coin.svg"
                          alt=""
                          className="w-12 max-w-3xl mr-4"
                        />
                        <div className="flex flex-col items-start justify-start w-full">
                          <p className="text-lg font-extrabold lg:text-xl">
                            8,888,888
                          </p>
                          <p className="text-xs font-bold opacity-60">Coin</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div> */}

                {/* <div className="mt-10">
                  <p className="mb-5 text-xl font-bold text-white lg:text-2xl">
                    Participant ratings
                  </p>
                  <Card className="grid grid-cols-2 px-4 py-3 mb-12 text-white cols-span-1 gap-x-8 gap-y-2">
                    <div className="grid grid-cols-2">
                      <p className="col-span-1 text-base lg:text-lg">
                        Improve skill
                      </p>
                      <div className="flex flex-row items-center col-span-1 font-bold">
                        <Progressbar
                          percent={80}
                          customColor="#58cc02"
                          className="mr-3"
                        />
                        4.44
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <p className="col-span-1 text-base lg:text-lg">
                        Well-organized
                      </p>
                      <div className="flex flex-row items-center col-span-1 font-bold">
                        <Progressbar
                          percent={80}
                          customColor="#58cc02"
                          className="mr-3"
                        />
                        4.44
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <p className="col-span-1 text-base lg:text-lg">
                        Friendly
                      </p>
                      <div className="flex flex-row items-center col-span-1 font-bold">
                        <Progressbar
                          percent={80}
                          customColor="#58cc02"
                          className="mr-3"
                        />
                        44.44
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <p className="col-span-1 text-base lg:text-lg">
                        Learn new things
                      </p>
                      <div className="flex flex-row items-center col-span-1 font-bold">
                        <Progressbar
                          percent={80}
                          customColor="#58cc02"
                          className="mr-3"
                        />
                        44.44
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <p className="col-span-1 text-base lg:text-lg">Fun</p>
                      <div className="flex flex-row items-center col-span-1 font-bold">
                        <Progressbar
                          percent={80}
                          customColor="#58cc02"
                          className="mr-3"
                        />
                        4.44
                      </div>
                    </div>
                  </Card>
                </div> */}

                <div className="mt-10">
                  <div className="">
                    <p className="mb-5 text-xl font-bold text-white lg:text-2xl">
                      Testimonials
                    </p>
                  </div>
                  {courseReviews && courseReviews.length > 0 ? (
                    <div>
                      <div className="grid grid-cols-2 gap-6">
                        {courseReviews?.map?.(
                          (courseReview: CourseReview, index: number) => {
                            return (
                              <Card
                                key={index}
                                className="px-4 py-3 text-white cols-span-1"
                              >
                                <div className="flex flex-col">
                                  <div className="flex flex-row items-center mb-6">
                                    <div
                                      className={`flex w-1/6 mr-4 overflow-hidden border-2 border-gray-300 rounded-full aspect-square ${
                                        courseReview.user.student?.avatarImage
                                          ? "items-center"
                                          : "items-end"
                                      }`}
                                    >
                                      <img
                                        src={
                                          courseReview.user.student?.avatarImage
                                            ? courseReview.user.student
                                                ?.avatarImage.url
                                            : "/images/avatar-placeholder.png"
                                        }
                                        alt="avatar"
                                      />
                                    </div>
                                    <div className="flex flex-col flex-1">
                                      <p className="mb-2 text-base font-extrabold text-white lg:text-lg">
                                        {`${courseReview.user.firstName} ${courseReview.user.lastName}`}
                                      </p>
                                      <p className="mb-2 text-xs text-white lg:text-sm">
                                        {format(
                                          new Date(courseReview.createdAt),
                                          "MMMM d, yyyy",
                                        )}
                                      </p>
                                    </div>
                                    <div>{courseReview.score} out of 5</div>
                                  </div>
                                  <p className="text-sm lg:text-base">
                                    {courseReview.comment}
                                  </p>
                                </div>
                              </Card>
                            );
                          },
                        )}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="font-bold text-white opacity-80">
                        No course reviews yet.
                      </div>
                    </div>
                  )}
                </div>
                {courseReviews && courseReviews.length > 2 && (
                  <Button variant="ghost" size="none" className="mt-3">
                    Load all reviews
                  </Button>
                )}
              </div>

              {/* Right Col */}
              <div className="lg:col-span-2">
                <Card className="mb-6 text-white">
                  <div className="p-6">
                    <Title className="text-center">{"Start Journey"}</Title>
                    <p className="mt-6 text-center text-opacity-80">
                      It&apos;s a great day, {user?.firstName}.
                      <br />
                      Let&apos;s start a new journey today?
                    </p>
                    <div className="mt-6">
                      <div className="flex justify-center">
                        <div className="tour_7">
                          {isEnrolled ? (
                            <div
                              role="none"
                              data-tut="reactour__7"
                              className="flex flex-col items-center p-2 transition duration-200 ease-in-out group rounded-2xl hover:bg-white hover:bg-opacity-20 cursor-pointer"
                              onClick={(): Promise<boolean> =>
                                router.push(
                                  `/student/courses/${router.query.id}/coursemap`,
                                )
                              }
                            >
                              <img
                                src="/images/dashboard/continue-journey.png"
                                alt=""
                                className="w-24 transition duration-300 mx-auto ease-in-out group-hover:hidden"
                              />
                              <img
                                src="/images/dashboard/continue-journey-active.png"
                                alt=""
                                className="hidden w-24 transition duration-300 mx-auto ease-in-out group-hover:block"
                              />
                              <p className="mt-4 font-semibold text-center">
                                Continue Journey
                              </p>
                            </div>
                          ) : (
                            <button
                              className="flex flex-col items-center p-2 group transition duration-200 ease-in-out rounded-2xl hover:bg-white hover:bg-opacity-20"
                              data-tut="reactour__7"
                              onClick={(): any => {
                                if (user && user.role === "TEACHER") {
                                  router.push(
                                    `/navigator/courses/preview/${router.query.id}/coursemap`,
                                  );
                                } else if (user && user.role === "PARENT") {
                                  router.push(
                                    `/adult/courses/preview/${router.query.id}/coursemap`,
                                  );
                                } else if (user && user.role === "STUDENT") {
                                  enroll();
                                  router.push(
                                    `/student/courses/${router.query.id}/coursemap`,
                                  );
                                } else {
                                  router.push(`/auth/login?type=student`);
                                }
                              }}
                            >
                              <img
                                src="/images/dashboard/enroll.png"
                                alt=""
                                className="w-24 mx-auto"
                              />
                              <p className="mt-4 font-semibold text-center">
                                {user && user.role === "STUDENT"
                                  ? "Enroll Course"
                                  : "Preview Course"}
                              </p>
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-center">Or</div>
                      <div className="flex justify-center">
                        <Link
                          href={`${
                            user && user.role === "PARENT"
                              ? "/adult/courses"
                              : user && user.role === "TEACHER"
                              ? "/navigator/courses"
                              : user && user.role === "STUDENT"
                              ? "/student/courses"
                              : "/courses"
                          }`}
                          passHref
                        >
                          <button className="flex flex-col items-center col-span-5 p-2 group transition duration-200 ease-in-out rounded-2xl hover:bg-white hover:bg-opacity-20">
                            <div className="w-1/2">
                              <img
                                src="/images/dashboard/explore-courses.svg"
                                alt=""
                                className="transition duration-300 mx-auto ease-in-out group-hover:hidden w-14"
                              />
                              <img
                                src="/images/dashboard/explore-courses-active.png"
                                alt=""
                                className="hidden transition duration-300 mx-auto ease-in-out group-hover:block w-14"
                              />
                            </div>
                            <p className="mt-4 text-sm font-semibold text-center">
                              Explore Courses
                            </p>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <Divider />
                  <div className="p-6">
                    <Title className="text-center">
                      Share this course to your friends!
                    </Title>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <TwitterShareButton
                        title={`${courseResponse.data?.course.title}`}
                        url={`${process.env.NEXT_PUBLIC_BASE_PATH}/courses/${router.query.id}`}
                      >
                        <Card
                          border="custom"
                          className="flex flex-row items-center justify-center p-4 text-lg font-bold transition duration-150 ease-in-out transform xl:p-6 hover:scale-105 text-brand1 bg-brand1 border-brand1 bg-opacity-10 xl:text-xl"
                        >
                          <img
                            src="/images/course/information/twitter.png"
                            alt=""
                            className="mr-2 xl:mr-3"
                          />
                          <p>Twitter</p>
                        </Card>
                      </TwitterShareButton>
                      <FacebookShareButton
                        title={`${courseResponse.data?.course.title}`}
                        url={`${process.env.NEXT_PUBLIC_BASE_PATH}/courses/${router.query.id}`}
                      >
                        <Card
                          border="custom"
                          className="flex flex-row items-center justify-center p-4 text-lg font-bold text-blue-900 transition duration-150 ease-in-out transform bg-blue-900 border-blue-900 xl:p-6 hover:scale-105 bg-opacity-10 xl:text-xl"
                        >
                          <img
                            src="/images/course/information/facebook.png"
                            alt=""
                            className="mr-2 xl:mr-3"
                          />
                          <p>Facebook</p>
                        </Card>
                      </FacebookShareButton>
                    </div>
                  </div>
                </Card>
                <div data-tut="reactour__11" className="tour_11">
                  <Card className="mb-6 text-white">
                    <div className="flex flex-col p-6">
                      <div className="flex flex-row items-center justify-between">
                        <p className="text-lg font-extrabold text-white lg:text-xl">
                          Course Rating
                        </p>
                        <div className="flex items-center justify-end">
                          {displayReviewForm && (
                            <Button
                              variant="ghost"
                              size="none"
                              onClick={(): void => setDisplayReviewForm(false)}
                            >
                              <HiX size={24} />
                            </Button>
                          )}
                        </div>
                      </div>
                      {displayReviewForm && (
                        <form
                          onSubmit={handleSubmit(submitCourseReview)}
                          className="py-4"
                        >
                          <div className="grid grid-cols-5">
                            {Array.from(Array(5), (e, i) => {
                              return (
                                <button
                                  key={i}
                                  type="button"
                                  className={`${
                                    i + 1 > hoverStars
                                      ? "text-white"
                                      : "text-yellow-400"
                                  } lg:px-4 transition duration-150 ease-in-out`}
                                  onMouseEnter={(): void =>
                                    setHoverStars(i + 1)
                                  }
                                  onMouseLeave={(): void =>
                                    setHoverStars(selectedStars)
                                  }
                                  onClick={(): void => setSelectedStars(i + 1)}
                                >
                                  <HiStar size={48} />
                                </button>
                              );
                            })}
                          </div>
                          <p className="py-2 font-bold text-right">
                            {!courseResponse.data?.course?.rating ||
                            courseResponse.data.course.rating === "0"
                              ? "No rating yet"
                              : "Average " +
                                (+courseResponse.data?.course?.rating).toFixed(
                                  1,
                                ) +
                                " out of 5"}
                          </p>
                          <p className="text-sm font-semibold opacity-60">
                            Leave a feedback
                          </p>
                          <TextAreaField
                            placeholder="Enter your review..."
                            registration={{ ...register("comment") }}
                            background="white"
                            rows={4}
                            className="text-gray-500 rounded-xl"
                          />
                          <Button
                            disabled={!isValid}
                            type="submit"
                            variant="brand1"
                            className="w-full h-14 whitespace-nowrap"
                            size="sm"
                          >
                            Submit Review
                          </Button>
                        </form>
                      )}

                      {!displayReviewForm && (
                        <div>
                          <div className="flex items-center justify-between pt-6">
                            <img
                              src="/images/course/information/course_rating.png"
                              alt=""
                              className="w-16 h-16"
                            />
                            <p className="font-bold text-right">
                              {!courseResponse.data?.course?.rating ||
                              courseResponse.data.course.rating === "0"
                                ? "No rating yet"
                                : "Average " +
                                  (+courseResponse.data?.course
                                    ?.rating).toFixed(1) +
                                  " out of 5"}
                            </p>
                          </div>
                          {user?.role === "STUDENT" && (
                            <Button
                              variant="brand1"
                              className="w-full mt-6"
                              size="md"
                              onClick={(): void => setDisplayReviewForm(true)}
                            >
                              Leave a review
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
                <Card>
                  <div className="p-6">
                    <p className="mb-6 text-lg font-extrabold text-white lg:text-xl">
                      Enrolled Students (
                      {courseResponse?.data?.course?.enrolledCourses?.length})
                    </p>
                    {courseResponse?.data?.course?.enrolledCourses?.length ===
                    0 ? (
                      <p className="text-center text-white text-opacity-80">
                        No students yet
                      </p>
                    ) : (
                      <div className="space-y-3 overflow-y-auto max-h-60">
                        {courseResponse?.data?.course?.enrolledCourses?.map(
                          (enrolledCourse: any) => (
                            <Link
                              key={enrolledCourse.studentId}
                              passHref
                              href={`/student/profile/${enrolledCourse.studentId}`}
                            >
                              <div className="flex flex-row items-center cursor-pointer">
                                <div className="flex items-center justify-center w-12 h-12 mr-4 overflow-hidden border-2 border-gray-300 rounded-full aspect-square">
                                  <img
                                    src={
                                      enrolledCourse.student.avatarImage
                                        ? enrolledCourse.student.avatarImage.url
                                        : "/images/common/default.png"
                                    }
                                    alt="avatar"
                                    className="bg-white"
                                  />
                                </div>
                                <div className="flex flex-col space-y-2">
                                  <h1 className="text-sm font-extrabold text-white lg:text-base">
                                    {enrolledCourse.student.username}
                                  </h1>
                                </div>
                              </div>
                            </Link>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          ) : null}
        </Section>
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
        disableCloseOnEsc
        disableOverlayClose
        disableOverlay={false}
        steps={steps}
        stepIndex={tourStep}
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
        tooltipComponent={Tooltip}
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
    </AppLayout>
  );
};

export default withApollo(CourseDetails);

export const getServerSideProps = extractHostname;
