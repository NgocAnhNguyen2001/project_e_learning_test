// import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
// import dynamic from "next/dynamic";
import _ from "lodash";
import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";

import {
  CourseCardProps,
  CourseCardSkeleton,
} from "@/components/Course/CourseCard";
import { CourseCategoryPreview } from "@/components/CourseCategoryPreview";
import {
  CourseVideoPreview,
  CourseVideoPreviewSkeleton,
} from "@/components/CoursesVideoPreview";
import { Button, Dialog } from "@/components/Elements";
import Section from "@/components/Elements/Section";
// import { SelectFieldNoControl } from "@/components/Form/SelectFieldNoControl";
import { AppLayout } from "@/components/Layout";
import { Tooltip, PillTooltip, ParentArrowTooltip } from "@/components/Onboard";
// import { DifficultyOptionsWithAll } from "@/types/CourseDifficulty";
import { extractHostname, getTenant, Props } from "@/utils/tenant";
import {
  Course,
  State,
  useCategoriesQuery,
  useCoursesLazyQuery,
  useUpdateUserOnboardedMutation,
} from "schema/generated/graphql";
import { withApollo } from "utils/hooks/withApollo";
import { useStore } from "utils/hooks/zustand";

const Courses = ({ hostname }: Props): React.ReactElement => {
  // ============HOOKS
  const router = useRouter();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setMe);
  const tourOpen = useStore((state) => state.onboarding);
  const setTourOpen = useStore((state) => state.setOnboarding);

  const [tourStep, setTourStep] = React.useState(0);
  const [steps, setSteps] = React.useState<Step[]>([]);
  const [published, setPublished] = React.useState<any>([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [category, setCategory] = React.useState<any[]>([]);
  const [difficulty] = React.useState<any>(undefined);
  const [categoryOptions, setCategoryOptions] = React.useState<any>([]);
  const [videoPreviews, setVideoPreviews] = React.useState<any>([]);

  const [updateUserOnboarded] = useUpdateUserOnboardedMutation();
  const { data } = useCategoriesQuery();
  const [getCourses, courses] = useCoursesLazyQuery();
  const [isMobile, setIsMobile] = React.useState(false);

  const audio: HTMLAudioElement[] = !tourOpen
    ? []
    : [new Audio("/audio/onboarding/student/4.mp3")];
  const [audioState, setAudioState] = React.useState<boolean[]>([false]);

  // ============EFFECTS
  React.useEffect(() => {
    setIsMobile(window.innerWidth < 900);
    const handleResizeWindow = (): void => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", handleResizeWindow);

    return (): void => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  React.useEffect(() => {
    const onClick = (): void => {
      if (tourOpen) {
        if (
          document.querySelector(".mobile-user-menu")?.ariaExpanded ===
            "true" &&
          tourStep == 3 &&
          user?.role === "TEACHER"
        ) {
          setTourStep(4);
        }
      }
    };
    window.addEventListener("click", onClick);

    return (): any => {
      window.removeEventListener("click", onClick);
    };
  }, [tourStep]);

  // Find which courses have video intro
  React.useMemo(() => {
    const coursesWithVideo = _.filter(courses.data?.courses, {
      checkpoints: [
        {
          type: "INTRODUCTION",
          blocks: [{ mediaBlock: { asset: { fileType: "VIDEO" } } }],
        },
      ],
    });

    let url = "";

    const formatted = _.map(coursesWithVideo, function (course: Course) {
      course.checkpoints?.map((checkpoint) => {
        if (checkpoint.type === "INTRODUCTION") {
          checkpoint.blocks?.map((block) => {
            if (block.mediaBlock) {
              url = block.mediaBlock.asset?.url
                ? block.mediaBlock.asset?.url
                : "";
            }
          });
        }
      });

      return {
        title: course.title,
        id: course.id,
        videoUrl: url,
      };
    });

    setVideoPreviews(formatted);
  }, [courses.data]);

  React.useEffect(() => {
    if (data) {
      const temp: any = Array.from(data.categories);
      const sorted = temp
        .sort((a: any, b: any) => a.name.localeCompare(b.name))
        .map((category: any) => {
          return {
            label: category.name,
            value: category.name,
            activeImgUrl: category.activeImgUrl,
            inactiveImgUrl: category.inactiveImgUrl,
          };
        });
      // sorted.unshift({
      //   label: "All Categories",
      //   value: undefined,
      // });
      const categoryList = temp.map((category: any) => {
        return category.name;
      });
      setCategoryOptions(sorted);
      const { currentCategory } = router.query;
      setCategory(currentCategory ? [currentCategory] : categoryList);
    }
  }, [data]);

  React.useMemo(() => {
    getCourses({
      variables: {
        where: {
          published: {
            equals: true,
          },
          state: {
            equals: State.Published,
          },
        },
      },
    });
  }, [getCourses]);

  React.useMemo(() => {
    getCourses({
      variables: {
        where: {
          published: {
            equals: true,
          },
          level: {
            equals: difficulty,
          },
          state: {
            equals: State.Published,
          },
          category: {
            is: {
              name: {
                in: category,
              },
            },
          },
        },
      },
    });
  }, [difficulty, category, getCourses]);

  React.useMemo(() => {
    if (courses.data) {
      setPublished(courses.data.courses);
    }
  }, [courses.data]);

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
      if (user?.role === "STUDENT") {
        router.push("/student/home");
      } else if (user?.role === "PARENT") {
        router.push("/adult/home");
      } else {
        router.push("/navigator/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (tourOpen) {
      if (user?.role === "STUDENT") {
        setSteps([
          {
            content: (
              <div>
                <img
                  className="absolute z-20 hidden -mt-44 -ml-60 sm:block"
                  src="/images/onboarding/helios.png"
                  alt=""
                />
                <div className="sm:ml-[46px] sm:pl-4 w-64 sm:w-80">
                  <div className="space-y-4 font-semibold">
                    <p>
                      Scroll down to see all the courses or you can click on
                      Categories/Difficulty to search for your favourite course.
                    </p>
                    <p>
                      Some courses have suggested age groups (but, I believe you
                      can do it if you give it a go!).
                    </p>
                    <button
                      id="volume"
                      className="h-6 w-6 text-gray-500 cursor-pointer"
                      onClick={(): void => {
                        toggleVolume(0);
                      }}
                    >
                      <img src="/images/onboarding/volume-on.svg" alt="" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-10 gap-x-3">
                    <button
                      onClick={(): any => {
                        audio[0].pause();
                        router.push("/student/home");
                      }}
                      className="flex items-center font-bold focus:outline-none text-[#6B7280]"
                    >
                      <HiChevronLeft size={16} />
                      <p>Back</p>
                    </button>
                    <button
                      onClick={(): void => {
                        audio[0].pause();
                        setTourStep(tourStep + 1);
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
            disableOverlay: false,
            disableOverlayClose: true,
            spotlightClicks: false,
            disableScrolling: true,
          },
          {
            content: (
              <div className="text-center text-[#9B26B6] font-semibold">
                <p>Select a course that you are interested in</p>
              </div>
            ),
            styles: {
              options: {
                arrowColor: "transparent",
              },
            },
            tooltipComponent: PillTooltip,
            placement: "bottom",
            target: ".tour_2",
            disableBeacon: true,
          },
        ]);
      } else if (user?.role === "PARENT") {
        setSteps([
          {
            //mobile
            content: (
              <div className="w-64 lg:w-80">
                <div className="space-y-4 font-semibold">
                  <p>Click on Menu icon</p>
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
                        document.querySelector(".mobile-menu")?.ariaExpanded ===
                        "true"
                      ) {
                        setTourStep(2);
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
            disableBeacon: true,
            tooltipComponent: ParentArrowTooltip,
            placement: "bottom-start",
            target: ".tour_2_mobile",
            spotlightClicks: true,
          },
          {
            content: (
              <div className="w-64 lg:w-80">
                <div className="space-y-4 font-semibold">
                  <p>
                    You can preview all the courses on Novalearn here. New
                    courses are uploaded weekly!
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
                      router.push("/adult/billing");
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
            disableBeacon: true,
            tooltipComponent: ParentArrowTooltip,
            placement: "bottom-start",
            target: ".tour_12",
            spotlightClicks: true,
          },
          {
            //mobile
            content: (
              <div className="w-64 lg:w-80">
                <div className="space-y-4 font-semibold">
                  <p>
                    You can preview all the courses on Novalearn here. New
                    courses are uploaded weekly!
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
                      router.push("/adult/billing");
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
            disableBeacon: true,
            tooltipComponent: ParentArrowTooltip,
            placement: "bottom",
            target: "#Courses",
            spotlightClicks: true,
          },
        ]);
      } else {
        //NAVIGATOR
        setSteps([
          {
            //0
            content: (
              <div className="w-64 lg:w-80">
                <div className="space-y-4 font-semibold">
                  <p>Click on Menu icon</p>
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
                        document.querySelector(".mobile-menu")?.ariaExpanded ==
                        "true"
                      ) {
                        setTourStep(2);
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
            placement: "bottom-start",
            target: ".tour_2_mobile",
            disableOverlay: true,
            disableBeacon: true,
            spotlightClicks: true,
          },
          {
            //1
            content: (
              <div className="w-64 lg:w-80">
                <div className="space-y-4 font-semibold">
                  <p>
                    You can preview all the courses from other teachers on
                    Novalearn here.
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
            placement: "bottom-start",
            target: ".navigator_tour_83",
            disableBeacon: true,
            disableOverlay: true,
            spotlightClicks: true,
          },
          {
            //2
            content: (
              <div className="w-64 lg:w-80">
                <div className="space-y-4 font-semibold">
                  <p>
                    You can preview all the courses from other teachers on
                    Novalearn here.
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
            placement: "bottom-start",
            target: "#All-Courses",
            disableBeacon: true,
            spotlightClicks: true,
          },
          {
            //3
            content: (
              <div className="w-64 lg:w-80">
                <div className="space-y-4 font-semibold">
                  <p>Click on user icon</p>
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
            placement: "bottom-start",
            target: ".tour_15",
            disableBeacon: true,
            disableOverlay: false,
            spotlightClicks: true,
          },
          {
            //4
            content: (
              <div className="w-64 lg:w-80">
                <div className="space-y-4 font-semibold">
                  <p>Click on Settings to manage your account.</p>
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
            placement: "bottom-start",
            target: ".navigator_settings",
            disableOverlay: false,
            disableBeacon: true,
            spotlightClicks: true,
          },
        ]);
      }
      const mediaQuery = window.matchMedia("(min-width: 1024px)");

      const mobileMenuTourHandler = (e: any): void => {
        e.matches ? setTourStep(1) : setTourStep(0);
      };

      mediaQuery.addEventListener("change", mobileMenuTourHandler);

      mobileMenuTourHandler(mediaQuery);
    }
  }, []);

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
  // const disableBody = (target: any): void => disableBodyScroll(target);
  // const enableBody = (target: any): void => enableBodyScroll(target);

  const handleJoyrideCallback = (data: CallBackProps): void => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      // setTourOpen(false);
    }
  };
  // ============VIEWS
  return (
    <AppLayout
      hostname={hostname}
      darkLayout={memoTenant.backgroundClasses.coursesDarkBackground}
    >
      <Head>
        <title>{memoTenant.name}</title>
      </Head>
      <div
        className={`relative z-10 flex min-h-screen ${
          memoTenant.backgroundClasses.coursesDarkBackground
            ? "text-white"
            : "text-black"
        }`}
      >
        <Section size="2xl">
          <div>
            <div className="pb-6 text-center ">
              <p className="pb-4 text-3xl font-bold  font-header">
                {memoTenant.name} Courses
              </p>
              <p className="">
                Start a journey that is carefully created by our navigators for
                you to have-fun and earn rewards while learning
              </p>
            </div>
            <div className="flex flex-row items-center justify-center w-full space-x-6">
              <div className="w-full mx-auto xl:w-10/12">
                {/* <SelectFieldNoControl
                  options={categoryOptions}
                  setValue={setCategory}
                  defaultValue={null}
                  placeholder="Categories"
                /> */}
                <CourseCategoryPreview
                  categoryValue={category}
                  setCategory={setCategory}
                  categoryPreviews={categoryOptions}
                  isMobile={isMobile}
                  memoTenant={memoTenant}
                  darkBackground={
                    memoTenant.backgroundClasses.coursesDarkBackground
                  }
                />
              </div>
              {/* <div className="w-full max-w-2xs">
                <SelectFieldNoControl
                  options={DifficultyOptionsWithAll}
                  setValue={setDifficulty}
                  defaultValue={null}
                  placeholder="Difficulty"
                />
              </div> */}
            </div>

            {/* Content */}
            {memoTenant.courseDisplayVideo ? (
              !courses.loading && videoPreviews.length ? (
                <div className="flex w-full pt-4 pb-12 mt-2">
                  <div className="max-w-3xl mx-auto">
                    <CourseVideoPreview
                      videoPreviews={videoPreviews}
                      isMobile={isMobile}
                    />
                  </div>
                </div>
              ) : courses.loading ? (
                <div className="flex w-full pt-4 pb-12 mt-2">
                  <div className="max-w-3xl mx-auto">
                    <CourseVideoPreviewSkeleton isMobile={isMobile} />
                  </div>
                </div>
              ) : null
            ) : null}
            <div className="grid gap-8 tour_2 md:grid-cols-2 md:gap-12 lg:grid-cols-3 xl:grid-cols-4">
              {!memoTenant.removeCourses && published.length ? (
                published
                  .filter(
                    (course: Course) =>
                      memoTenant.courseCategories.includes("ALL") ||
                      memoTenant.courseCategories.includes(
                        _.toUpper(course.category?.name),
                      ),
                  )
                  .map((course: Course) => (
                    <div
                      onClick={(): any => {
                        if (user && user.role === "STUDENT") {
                          router.push(`/student/courses/${course.id}`);
                        } else if (user && user.role === "TEACHER") {
                          router.push(
                            `/navigator/courses/preview/${course.id}`,
                          );
                        } else if (user && user.role === "PARENT") {
                          router.push(`/adult/courses/preview/${course.id}`);
                        } else {
                          router.push(`/courses/${course.id}`);
                        }
                      }}
                      key={course.id}
                      role="none"
                      className="mt-4"
                    >
                      <CourseCardProps
                        hostname={hostname}
                        name={course.title}
                        difficulty={course.level}
                        category={course.category}
                        thumbnail={course.thumbnail?.url ?? memoTenant.logo.png}
                        duration={course.duration}
                        teacher={course.teacher}
                        className="cursor-pointer"
                      />
                    </div>
                  ))
              ) : !memoTenant.removeCourses && courses.loading ? (
                <>
                  <div className="mt-4">
                    <CourseCardSkeleton />
                  </div>
                  <div className="mt-4">
                    <CourseCardSkeleton />
                  </div>
                  <div className="mt-4">
                    <CourseCardSkeleton />
                  </div>
                  <div className="mt-4">
                    <CourseCardSkeleton />
                  </div>
                </>
              ) : (
                <div className="h-80 col-span-4 flex text-center items-center justify-center m-auto">
                  <h2 className="self-center text-6xl font-extrabold">
                    No courses to preview
                  </h2>
                </div>
              )}
            </div>
          </div>
        </Section>
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
          disableOverlay
          tooltipComponent={Tooltip}
          styles={{
            options: {
              width: "auto",
              zIndex: 10000,
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
      </div>
    </AppLayout>
  );
};

export default withApollo(Courses);

export const getServerSideProps = extractHostname;
