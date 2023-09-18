// import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
// import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";

import FriendRequest from "@/components/Children/FriendRequest";
import {
  CourseCardProps,
  CourseCardSkeleton,
} from "@/components/Course/CourseCard";
import { Button, Dialog } from "@/components/Elements";
import { Card } from "@/components/Elements/Card";
import { Divider } from "@/components/Elements/Divider";
import Section from "@/components/Elements/Section";
import { Title } from "@/components/Elements/Title";
import { AppLayout } from "@/components/Layout";
import { Tooltip } from "@/components/Onboard";
import { extractHostname, getTenant, Props } from "@/utils/tenant";
import {
  useListFriendsQuery,
  useStudentQuery,
  useUpdateUserOnboardedMutation,
} from "schema/generated/graphql";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";
import { useStore } from "utils/hooks/zustand";
// import _ from "lodash";

const motivationalQuotes = [
  "Do you know the cornea is one of only two parts of the human body without blood vessels?",
  "Do you know Japan has one vending machine for every 40 people?",
  "Do you know lemons float, but limes sink?",
  "Do you know McDonald’s once made bubblegum-flavored broccoli?",
  "Do you know the first oranges weren’t orange?",
  "Do you know Scotland has 421 words for snow?",
  "Do you know peanuts aren’t technically nuts?",
  "Do you know armadillo shells are bulletproof?",
  "Do you know the world wastes about 1 billion metric tons of food each year?",
  "Do you know some octopus species lay 56,000 eggs at a time?",
  "Do you know cats have fewer toes on their back paws?",
  "Do you know blue whales eat half a million calories in one mouthful?",
  "Do you know the tiny pocket in jeans was designed to store pocket watches?",
  "Do you know turkeys can blush?",
  "Do you know most Disney characters wear gloves to keep animation simple?",
  "Do you know the man with the world’s deepest voice can make sounds humans can’t hear?",
  "Do you know the current American flag was designed by a high school student?",
  "Do you know cows don’t have upper front teeth?",
  "Do you know bananas grow upside down?",
  "Do you know there were active volcanoes on the moon when dinosaurs were alive?",
  "Do you know human noses and ears get bigger as we age?",
  "Do you know no number before 1,000 contains the letter ‘A’?",
  "Do you know movie trailers originally played after the movie?",
  "Do you know giraffe tongues can be 20 inches long?",
  "Do you know humans aren’t the only animals that dream?",
  "Do you know sloths have more neck bones than giraffes?",
  "Do you know bees can fly higher than Mount Everest?",
  "Do you know many feet bones don’t harden until you’re an adult?",
  "Do you know humans have jumped farther than horses in the Olympics?",
  "Do you know beethoven never knew how to multiply or divide?",
  "Do you know Japan released sushi-inspired Kit Kats?",
  "Do you know Steve Jobs, Steve Wozniak, and Ron Wayne started Apple Inc. on April Fools’ Day?",
  "Do you know your brain synapses shrink while you sleep?",
  "Do you know a waffle iron inspired one of the first pairs of Nikes?",
  "Do you know boars wash their food?",
  "Do you know baseball umpires used to sit in rocking chairs?",
  "Do you know the first commercial passenger flight lasted only 23 minutes?",
  "Do you know a woman called the police when her ice cream didn’t have enough sprinkles?",
  "Do you know the British Empire was the largest empire in world history?",
];

const StudentHome = ({ hostname }: Props): React.ReactElement => {
  // ============HOOKS
  const router = useRouter();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setMe);
  const tourOpen = useStore((state) => state.onboarding);
  const setTourOpen = useStore((state) => state.setOnboarding);
  const [tourStep, setTourStep] = React.useState(0);
  const [steps, setSteps] = React.useState<Step[]>([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [onboardCourse, setOnboardCourse] = React.useState(false);
  const [onboardAvatar, setOnboardAvatar] = React.useState(false);
  const [pendingRequests, setPendingRequests] = React.useState<any[]>([]);
  const [motivationalQuote, setMotivationalQuote] = React.useState<string>("");
  const [hasOnboarding, setHasOnboarding] = React.useState<boolean>(
    !user?.onboarded,
  );
  const { data, loading } = useStudentQuery();
  const { data: friendResponse } = useListFriendsQuery();
  const [updateUserOnboarded] = useUpdateUserOnboardedMutation();

  const audio: HTMLAudioElement[] = !tourOpen
    ? []
    : [
        new Audio("/audio/onboarding/student/1.mp3"),
        new Audio("/audio/onboarding/student/2.mp3"),
        new Audio("/audio/onboarding/student/3.mp3"),
      ];
  const [audioState, setAudioState] = React.useState<boolean[]>([
    false,
    false,
    false,
  ]);

  // ============EFFECTS
  const memoTenant = React.useMemo(() => {
    return getTenant(hostname);
  }, [hostname]);

  React.useEffect(() => {
    if (data) {
      setOnboardCourse(data.me.student?.enrolledCourses?.length === 0);
      setOnboardAvatar(data?.me.student?.avatarImage === null);
    }
  }, [data]);

  React.useEffect(() => {
    if (onboardAvatar || onboardCourse) {
      setHasOnboarding(true);
    }
  }, [onboardAvatar, onboardCourse]);

  React.useEffect(() => {
    if (friendResponse && friendResponse.findAllFriends) {
      // We should only check those where requestee is me to get all sent pending requests
      // From that list, we only need to show those that are pending
      const friends: any[] = friendResponse.findAllFriends
        .filter(
          (friend: any) =>
            friend.requestee.id === user?.id &&
            friend.friendStatus === "PENDING",
        )
        .map((friend: any) => {
          return {
            ...friend.requester,
          };
        });
      setPendingRequests(friends);
    }
    setMotivationalQuote(
      motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)],
    );
  }, [friendResponse, user]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (tourOpen) {
      setSteps([
        {
          content: (
            <div className="space-y-4">
              <div className="text-center font-semibold space-y-4">
                <img
                  className="absolute z-20 right-0 -mr-52 -mt-36 hidden sm:block"
                  src="/images/onboarding/helios.png"
                  alt=""
                />
                <p>Hello, friend! I am Helios</p>
                <p>Let me show you the wonders of {memoTenant.name}!</p>
              </div>
              <button
                id="volume"
                className="h-6 w-6 text-gray-500 cursor-pointer"
                onClick={(): void => {
                  toggleVolume(0);
                }}
              >
                <img src="/images/onboarding/volume-on.svg" alt="" />
              </button>
              <div className="flex items-center justify-center gap-x-3 mt-">
                <Button
                  className="w-24"
                  size="sm"
                  variant="gray"
                  onClick={updateOnboardStatus}
                >
                  Skip
                </Button>
                <Button
                  className="w-52"
                  size="sm"
                  variant="brand1"
                  onClick={(): void => {
                    audio[0].pause();
                    setTourStep(1);
                  }}
                >
                  Begin Tutorial
                </Button>
              </div>
            </div>
          ),
          placement: "center",
          target: "body",
          hideFooter: true,
          disableBeacon: true,
        },
        {
          content: (
            <div>
              <div>
                <img
                  className="absolute z-20 -mt-36 -ml-72 hidden sm:block"
                  src="/images/onboarding/helios.png"
                  alt=""
                />
                <div className="w-64 sm:w-full space-y-4">
                  <div className="font-semibold flex flex-col lg:flex-row">
                    <img
                      src="/images/onboarding/home.png"
                      alt=""
                      height={8}
                      width={130}
                      className="object-contain self-center pb-4 lg:hidden"
                    />
                    <div className="space-y-4">
                      <p>
                        This is your Dashboard where you can pick a Course,
                        continue a lesson, change your Avatar’s outfit or update
                        your Profile.
                      </p>
                      <p>
                        You can always come back to your homepage anytime along
                        the way by hitting this rocket button.
                      </p>
                    </div>
                    <img
                      src="/images/onboarding/home.png"
                      alt=""
                      height={8}
                      width={130}
                      className="object-contain ml-4 hidden lg:block"
                    />
                  </div>
                  <button
                    id="volume"
                    className="h-6 w-6 text-gray-500 cursor-pointer"
                    onClick={(): void => {
                      toggleVolume(1);
                    }}
                  >
                    <img src="/images/onboarding/volume-on.svg" alt="" />
                  </button>
                  <div className="flex items-center justify-between mt-10">
                    <button
                      onClick={(): void => {
                        setTourStep(0);
                        audio[1].pause();
                      }}
                      className="flex items-center font-bold text-[#6B7280] active:none"
                    >
                      <HiChevronLeft size={16} />
                      <p>Back</p>
                    </button>
                    <button
                      onClick={(): void => {
                        // Check if hit lg breakpoint
                        const mediaQuery = window.matchMedia(
                          "(min-width: 1024px)",
                        );

                        const mobileMenuTourHandler = (e: any): void => {
                          e.matches ? setTourStep(4) : setTourStep(2);
                        };

                        mediaQuery.addEventListener(
                          "change",
                          mobileMenuTourHandler,
                        );

                        mobileMenuTourHandler(mediaQuery);

                        audio[1].pause();
                      }}
                      className="flex items-center font-bold text-[#9B26B6]"
                    >
                      <p>Next</p>
                      <HiChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ),
          placement: "center",
          target: "body ",
          hideFooter: true,
          disableBeacon: true,
        },
        {
          content: (
            <div>
              <div className="font-semibold space-y-4">
                <p>Click on the menu icon</p>
              </div>
              <div className="flex items-center justify-between mt-10">
                <button
                  onClick={(): void => setTourStep(1)}
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
                    )
                      setTourStep(3);
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
              <div className="font-semibold space-y-4">
                <p>You can hop back into an enrolled course here.</p>
                <button
                  id="volume"
                  className="h-6 w-6 text-gray-500 cursor-pointer"
                  onClick={(): void => {
                    toggleVolume(2);
                  }}
                >
                  <img src="/images/onboarding/volume-on.svg" alt="" />
                </button>
              </div>
              <div className="flex items-center justify-between mt-10">
                <button
                  onClick={(): void => {
                    audio[2].pause();
                    setTourStep(2);
                  }}
                  className="flex items-center font-bold text-[#6B7280] active:none"
                >
                  <HiChevronLeft size={16} />
                  <p>Back</p>
                </button>
                <button
                  onClick={(): void => {
                    // setTourStep(5)
                    audio[2].pause();
                    router.push("/student/courses");
                  }}
                  className="flex items-center font-bold text-[#9B26B6]"
                >
                  <p>Next</p>
                  <HiChevronRight size={16} />
                </button>
              </div>
            </div>
          ),
          placement: "bottom",
          target: "#Home",
          spotlightClicks: true,
        },
        {
          content: (
            <div>
              <div className="mr-[46px] pl-4">
                <img
                  className="absolute z-20 right-0 -mt-52 -mr-40"
                  src="/images/onboarding/helios.png"
                  alt=""
                />
                <div className="mr-[46px] pl-4">
                  <div className="font-semibold space-y-4">
                    <p>You can hop back into an enrolled course here.</p>
                    <button
                      id="volume"
                      className="h-6 w-6 text-gray-500 cursor-pointer"
                      onClick={(): void => {
                        toggleVolume(2);
                      }}
                    >
                      <img src="/images/onboarding/volume-on.svg" alt="" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-10">
                    <button
                      onClick={(): void => {
                        setTourStep(1);
                        audio[2].pause();
                      }}
                      className="flex items-center font-bold text-[#6B7280] active:none"
                    >
                      <HiChevronLeft size={16} />
                      <p>Back</p>
                    </button>
                    <button
                      onClick={(): void => {
                        audio[2].pause();
                        router.push("/student/courses");
                      }}
                      className="flex items-center font-bold text-[#9B26B6]"
                    >
                      <p>Continue</p>
                      <HiChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ),
          placement: "top",
          target: ".tour_2",
          hideFooter: true,
          disableBeacon: true,
          spotlightClicks: false,
        },
      ]);
    }
  }, [audioState, setAudioState]);

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

  // const disableBody = (target: any): void => disableBodyScroll(target);
  // const enableBody = (target: any): void => enableBodyScroll(target);

  const handleJoyrideCallback = (data: CallBackProps): void => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      setTourOpen(false);
    }
  };

  // ============VIEWS

  return (
    <AppLayout hostname={hostname} darkLayout>
      <Head>
        <title>{memoTenant.name}</title>
      </Head>
      <div className="relative z-10 flex min-h-screen tour_1">
        <Section size="2xl">
          <div className="pb-6 text-center text-white">
            <p className="pb-4 text-3xl font-bold font-header tracking-header">
              Welcome back {user?.firstName}
            </p>
            <p>{motivationalQuote}</p>
          </div>
          <Divider />

          {/* Content */}
          <div className="grid grid-cols-1 pt-8 space-y-6 lg:space-y-0 lg:space-x-12 lg:grid-cols-5">
            {/* Left Column */}
            <div className="space-y-12 lg:col-span-3">
              {hasOnboarding && (
                <div>
                  <Title className="flex items-center" variant="strike">
                    <img
                      src="/images/dashboard/gear.png"
                      alt=""
                      className="mr-2 w-8 h-8"
                    />
                    Finish Setting Up Your Account
                  </Title>
                  <div className="grid gap-4 mt-6">
                    {onboardAvatar && (
                      <div className="flex flex-col justify-between p-4 bg-white md:flex-row bg-opacity-20 rounded-xl">
                        <div className="flex items-center">
                          <img
                            src="/images/dashboard/gear.png"
                            alt=""
                            className="w-12 mr-4"
                          />
                          <p className="text-white">
                            Customize your avatar and your profile
                          </p>
                        </div>
                        <Link href="/student/avatar" passHref>
                          <Button className="mt-4 md:mt-0" variant="brand1">
                            Change Outfit
                          </Button>
                        </Link>
                      </div>
                    )}
                    {onboardCourse && (
                      <div className="flex flex-col justify-between p-4 bg-white md:flex-row bg-opacity-20 rounded-xl">
                        <div className="flex items-center">
                          <img
                            src="/images/dashboard/gear.png"
                            alt=""
                            className="w-12 mr-4"
                          />
                          <p className="text-white">
                            Start learning by enrolling in a course
                          </p>
                        </div>
                        <Link href="/student/courses" passHref>
                          <Button className="mt-4 md:mt-0" variant="brand1">
                            View Courses
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Courses section */}
              {data?.me.student?.enrolledCourses &&
                data?.me.student?.enrolledCourses?.length > 0 && (
                  <div className="tour_2">
                    <Title className="flex items-center" variant="strike">
                      <img
                        src="/images/dashboard/climber.png"
                        alt=""
                        className="mr-2"
                      />
                      Continue Where You Left Off
                    </Title>
                    <div className="grid gap-6 mt-6 md:gap-12 md:grid-cols-2">
                      {data.me.student.enrolledCourses
                        .filter((enrolledCourse) => {
                          return enrolledCourse.course.deleted === null;
                        })
                        .map((item: any, index: number) => {
                          if (
                            item.progress !== 100 &&
                            item.course.state == "PUBLISHED"
                          ) {
                            return (
                              <div
                                key={index}
                                onClick={(): any =>
                                  router.push(
                                    `/student/courses/${item.course.id}`,
                                  )
                                }
                                role="none"
                              >
                                <CourseCardProps
                                  hostname={hostname}
                                  name={item.course.title}
                                  difficulty={item.course.level}
                                  category={item.course.category}
                                  thumbnail={
                                    item.course.thumbnail?.url ??
                                    memoTenant.logo.png
                                  }
                                  duration={item.course.duration}
                                  teacher={item.course.teacher}
                                  className="cursor-pointer"
                                  classNameForHomepage="lg:pr-9 xl:pr-3"
                                />
                              </div>
                            );
                          }
                        })}
                    </div>
                  </div>
                )}
              {loading && (
                <div>
                  <Title className="flex items-center" variant="strike">
                    <div className="bg-gray-200 animate-pulse" />
                    Loading...
                  </Title>
                  <div className="grid gap-6 mt-6 md:gap-12 md:grid-cols-2">
                    <CourseCardSkeleton />
                    <CourseCardSkeleton />
                    <CourseCardSkeleton />
                    <CourseCardSkeleton />
                  </div>
                </div>
              )}
            </div>

            {/* Right Col */}
            <div className="lg:col-span-2">
              {/* <Card className="mb-6">
                <div className="px-6 pt-6 ">
                  <div className="">
                    <div className="text-white">
                      <p className="w-full text-xl font-bold text-center lg:text-2xl font-header tracking-header">
                        Claim your daily rewards!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid gap-4 p-6 md:grid-cols-2">
                  <Card
                    border="custom"
                    className="flex flex-col items-center p-6 text-lg font-bold text-red-600 bg-red-600 border-red-600 bg-opacity-10 lg:text-xl"
                  >
                    <img
                      src="/images/common/gem.svg"
                      alt=""
                      className="w-20 pb-4"
                    />
                    <p>+ 8,888,888</p>
                    <p>NovaGem</p>
                  </Card>
                  <Card
                    border="custom"
                    className="flex flex-col items-center p-6 text-lg font-bold text-yellow-600 bg-yellow-600 border-yellow-600 bg-opacity-10 lg:text-xl"
                  >
                    <img
                      src="/images/common/coin.svg"
                      alt=""
                      className="w-20 pb-4"
                    />
                    <p>+ 8,888,888</p>
                    <p>NovaCoins</p>
                  </Card>
                  <Card
                    border="custom"
                    className="flex flex-col items-center p-6 text-lg font-bold text-sky-400 bg-sky-400 border-sky-400 bg-opacity-10 lg:text-xl"
                  >
                    <img
                      src="/images/common/xp.svg"
                      alt=""
                      className="w-20 pb-4"
                    />
                    <p>+ 8,888,888</p>
                    <p>EXP</p>
                  </Card>
                  <Card
                    border="custom"
                    className="flex flex-col items-center p-6 text-lg font-bold text-lime-600 bg-lime-600 border-lime-600 bg-opacity-10 lg:text-xl"
                  >
                    <img
                      src="/images/common/tick.svg"
                      alt=""
                      className="w-20 pb-4"
                    />
                    <p className="text-center">Check-in Streak Badge</p>
                  </Card>
                </div>
              </Card> */}
              <Card className="mb-6 text-white">
                <div className="p-6">
                  <Title className="text-center">
                    {"What's your style today?"}
                  </Title>
                  <p className="mt-6 text-center text-opacity-80">
                    {
                      'Cycle something like "Let\'s try wearing a new hat / shirt / pants today!"'
                    }
                  </p>
                  {/* <div className="grid grid-cols-11 gap-4 mt-6">
                    <div className="flex flex-col items-center col-span-5">
                      <img src="/images/dashboard/store.png" alt="" />
                      <p className="mt-4 font-semibold text-center">
                        Shop New Look
                      </p>
                    </div>
                    <div className="flex items-center justify-center col-span-1">
                      OR
                    </div> */}
                  <div className="flex flex-col items-center col-span-5 mt-4">
                    <Link href="/student/avatar" passHref>
                      <button className="p-2 transition duration-200 ease-in-out group rounded-2xl hover:bg-white hover:bg-opacity-20">
                        <img
                          src="/images/dashboard/outfit.png"
                          alt=""
                          className="w-24 transition duration-300 mx-auto ease-in-out group-hover:hidden"
                        />
                        <img
                          src="/images/dashboard/outfit-active.png"
                          alt=""
                          className="hidden w-24 transition duration-300 mx-auto ease-in-out group-hover:block"
                        />
                        <p className="mt-4 font-semibold text-center">
                          Change Outfit
                        </p>
                      </button>
                    </Link>
                  </div>
                  {/* </div> */}
                </div>
              </Card>
              <Card className="mb-6 text-white">
                <Link href="/student/courses" passHref>
                  <div className="flex p-4 transition duration-200 ease-in-out hover:cursor-pointer hover:bg-white hover:bg-opacity-20 rounded-2xl">
                    <img
                      src="/images/dashboard/explore-courses-active.png"
                      alt=""
                      className="object-contain w-16 mr-4"
                    />
                    <div className="mr-4 grow">
                      <p className="font-bold font-header tracking-header">
                        Explore Courses
                      </p>
                      <p>
                        {
                          "Discover our carefully tailored courses that are ready to take you to the next level"
                        }
                      </p>
                    </div>
                    <div className="flex items-center justify-end w-1/12">
                      <HiChevronRight size={32} />
                    </div>
                  </div>
                </Link>
                {/* <Divider />
                <div className="flex p-4">
                  <img
                    src="/images/common/credit_cards.png"
                    alt=""
                    className="object-contain w-1/6 mr-4"
                  />
                  <div className="mr-4 grow">
                    <p className="font-bold font-header tracking-header">
                      {"See What's New in Stock"}
                    </p>
                    <p>
                      {
                        "We have recently added some new cool outfits for you to try out"
                      }
                    </p>
                  </div>
                  <div className="flex items-center justify-end w-1/12">
                    <HiChevronRight size={32} />
                  </div>
                </div>
                <Divider />
                <div className="flex p-4">
                  <img
                    src="/images/common/credit_cards.png"
                    alt=""
                    className="object-contain w-1/6 mr-4"
                  />
                  <div className="mr-4 grow">
                    <p className="font-bold font-header tracking-header">
                      Invite Friends
                    </p>
                    <p>
                      {
                        "Get 30-days access to premium content when your friends join"
                      }
                    </p>
                  </div>
                  <div className="flex items-center justify-end w-1/12">
                    <HiChevronRight size={32} />
                  </div>
                </div> */}
              </Card>
              <Card className="flex flex-col p-6 mb-6 text-white">
                <p className="w-full space-y-6 text-xl font-bold text-center lg:text-2xl">
                  Friend Requests ({pendingRequests.length})
                </p>
                <div>
                  {pendingRequests.length > 0 ? (
                    pendingRequests.map((friend, index) => (
                      <FriendRequest
                        key={index}
                        friend={friend}
                        className="mb-4"
                      />
                    ))
                  ) : (
                    <div className="flex items-center justify-center w-full pt-6">
                      No friend requests yet
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
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
    </AppLayout>
  );
};

export default withAuthenticated(withApollo(StudentHome));

export const getServerSideProps = extractHostname;
