import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";
import {
  HiUserAdd,
  HiUserRemove,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import Joyride, { CallBackProps, EVENTS, STATUS, Step } from "react-joyride";
import { toast } from "react-toastify";

import { Button, Dialog } from "@/components/Elements";
import Section from "@/components/Elements/Section";
import { Feedback } from "@/components/Feedback";
import { AppLayout } from "@/components/Layout";
import { Tooltip } from "@/components/Onboard";
import { extractHostname, getTenant, Props } from "@/utils/tenant";
import {
  namedOperations,
  useAcceptFriendMutation,
  useAddFriendMutation,
  useChildLazyQuery,
  useDeclineFriendMutation,
  useListFriendsQuery,
  useStartChatMutation,
  useUpdateUserOnboardedMutation,
  useCountCourseQuery,
  useFindManyChallengesQuery,
  EnrolledCourse,
  Student,
  State,
} from "schema/generated/graphql";
import { withApollo } from "utils/hooks/withApollo";
import { useStore } from "utils/hooks/zustand";
import { AvatarSection } from "@/components/Profile/AvatarSection";
import { JournalSection } from "@/components/Profile/JournalSection";
import { EnrolledCourses } from "@/components/Profile/EnrolledCourses";
import { FriendSection } from "@/components/Profile/FriendSection";
export const getServerSideProps = extractHostname;

// const badges = [
//   {
//     title: "Badge Title",
//     description: "Badge description",
//   },
//   {
//     title: "Badge Title",
//     description: "Badge description",
//   },
//   {
//     title: "Badge Title",
//     description: "Badge description",
//   },
//   {
//     title: "Badge Title",
//     description: "Badge description",
//   },
// ];

// const submissions = [
//   {
//     name: "Origami with YB",
//     checkpoint: "Paper Dino",
//   },
//   {
//     name: "Origami with YB",
//     checkpoint: "End",
//   },
//   {
//     name: "Origami with YB",
//     checkpoint: "End",
//   },
// ];

const StudentProfile = ({ hostname }: Props): React.ReactElement => {
  // ============HOOKS
  const router = useRouter();
  const me = useStore((state) => state.user);
  const tourOpen = useStore((state) => state.onboarding);
  const setLoading = useStore((state) => state.setLoading);
  const setTourOpen = useStore((state) => state.setOnboarding);
  const setUser = useStore((state) => state.setMe);

  const [steps, setSteps] = React.useState<Step[]>([]);
  const [tourStep, setTourStep] = React.useState(0);
  const [profileData, setProfileData] = React.useState<any>();
  const [friends, setFriends] = React.useState<Student[]>([]);
  const [isOwnProfile, setIsOwnProfile] = React.useState<boolean>(false);
  const [journalTab, setJournalTab] = React.useState<"WORKS" | "FAVOURITES">(
    "WORKS",
  );
  const [friendshipState, setFriendshipState] = React.useState<
    "PENDING_ME_ACCEPT" | "ACCEPTED" | "PENDING" | "DECLINED" | null
  >(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const [displayTab, setDisplayTab] = React.useState<
    "MAIN" | "FRIENDS" | "JOURNAL" | "COURSES"
  >("MAIN");

  const [getUser, userResponse] = useChildLazyQuery({
    onCompleted: () => {
      setDisplayTab("MAIN");
    },
  });
  const { data: friendResponse } = useListFriendsQuery({
    variables: {
      where: {
        OR: [
          { requesteeId: { equals: router.query.id as string } },
          { requesterId: { equals: router.query.id as string } },
        ],
      },
    },
  });
  const { data: courseCount } = useCountCourseQuery({
    variables: {
      where: {
        state: { equals: State.Published },
      },
    },
  });
  const { data: challenges } = useFindManyChallengesQuery({
    variables: { where: { creatorId: { equals: router.query.id as string } } },
  });

  const { data: favouriteChallenges } = useFindManyChallengesQuery({
    variables: {
      where: {
        likes: { some: { likerId: { equals: router.query.id as string } } },
      },
    },
  });

  const [addFriend] = useAddFriendMutation();
  const [acceptFriend] = useAcceptFriendMutation();
  const [declineFriend] = useDeclineFriendMutation();
  const [startChat, chatResponse] = useStartChatMutation();
  const [updateUserOnboarded] = useUpdateUserOnboardedMutation();
  const [audio, setAudio] = React.useState<HTMLAudioElement[]>([]);
  const [audioState, setAudioState] = React.useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  const stepsArr: Step[] = [
    {
      content: (
        <div>
          <img
            className="absolute z-20 -mt-52 -ml-60 hidden sm:block"
            src="/images/onboarding/helios.png"
            alt=""
          />
          <div className="w-64 sm:w-96 sm:ml-[46px] sm:pl-4">
            <div className="space-y-4 font-semibold">
              <p>
                You will see your Avatar, About Me, Friends and Courses here.
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
            <div className="flex items-center justify-between mt-10">
              <button
                onClick={(): any => {
                  audio[0].pause();
                  router.push("/student/avatar");
                }}
                className="flex items-center font-bold text-[#6B7280] focus:outline-none"
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
                <p>Next</p>
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
            className="absolute z-20 -mt-52 -ml-60 hidden sm:block"
            src="/images/onboarding/helios.png"
            alt=""
          />
          <div className="w-64 sm:w-full sm:ml-[46px] sm:pl-4">
            <div className="space-y-4 font-semibold">
              <p>Click Edit Profile to update your About Me.</p>
              <button
                id="volume"
                className="h-6 w-6 text-gray-500 cursor-pointer"
                onClick={(): void => {
                  toggleVolume(1);
                }}
              >
                <img src="/images/onboarding/volume-on.svg" alt="" />
              </button>
            </div>
            <div className="flex items-center justify-between mt-10">
              <button
                onClick={(): any => {
                  audio[1].pause();
                  router.push("/student/avatar");
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
      placement: "bottom-end",
      target: ".tour_18",
      hideFooter: true,
      disableCloseOnEsc: true,
      disableOverlayClose: true,
      spotlightClicks: true,
    },
  ];
  // ============EFFECTS
  React.useEffect(() => {
    setAudio([
      new Audio("/audio/onboarding/student/19.mp3"),
      new Audio("/audio/onboarding/student/20.mp3"),
    ]);
  }, []);

  // Checks the list of friends
  React.useEffect(() => {
    if (friendResponse && friendResponse.findAllFriends) {
      let friends: any[] = friendResponse.findAllFriends.map((user: any) => {
        // If people request me
        if (user.requestee.id === me?.id || user.requester.id === me?.id) {
          if (
            user.requester.id === router.query.id ||
            user.requestee.id === router.query.id
          ) {
            // We should check if I need to accept friend request
            if (user.friendStatus === "PENDING") {
              setFriendshipState("PENDING_ME_ACCEPT");
            } else {
              setFriendshipState(user.friendStatus);
            }
          }
        }
        // If I am viewing the person I request
        if (
          user.requestee.id === router.query.id ||
          user.requester.id === router.query.id
        ) {
          if (user.requestee.id === me?.id || user.requester.id === me?.id) {
            setFriendshipState(user.friendStatus);
          }
        }
        // get friends simplified
        if (user.friendStatus === "ACCEPTED") {
          if (user.requestee.id === router.query.id) {
            return {
              ...user.requester,
            };
          } else {
            return {
              ...user.requestee,
            };
          }
        }
      });

      friends = friends.filter((friend: any) => friend !== undefined);

      setFriends(friends);
    }
  }, [friendResponse, me, router]);

  // Retrieves the user profile
  React.useEffect(() => {
    if (router && router.query.id) {
      setLoading(true);

      if (me && router.query.id === me.id) {
        setIsOwnProfile(true);
      } else {
        setIsOwnProfile(false);
      }

      getUser({
        variables: {
          id: router.query.id as string,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, me]);

  // Sets the user profile
  React.useEffect(() => {
    if (userResponse && userResponse.data) {
      setProfileData(userResponse.data?.child);
    }
    setSteps(stepsArr);
    setLoading(userResponse.loading);
  }, [userResponse?.data]);

  // Once a chat is created, we can navigate to the chat
  React.useEffect(() => {
    if (chatResponse && chatResponse.data) {
      router.push("/student/chat");
    }
  }, [chatResponse?.data]);

  const memoTenant = React.useMemo(() => {
    return getTenant(hostname).name;
  }, [hostname]);

  // ============FUNCTIONS
  const handleJoyrideCallback = (data: CallBackProps): void => {
    const { status, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
    if (
      !finishedStatuses.includes(status) &&
      status == STATUS.RUNNING &&
      type == EVENTS.STEP_AFTER
    ) {
      setTourStep(1);
    }

    // logGroup(type, data);
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

  const closeTour = (): void => {
    setTourOpen(false);
    setIsOpen(false);
  };

  const updateOnboardStatus = async (): Promise<void> => {
    closeTour();
    setUser({ ...me, onboarded: true });
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

  const sendFriendRequest = async (): Promise<void> => {
    try {
      await addFriend({
        variables: {
          id: router.query.id as string,
        },
        refetchQueries: [namedOperations.Query.listFriends],
      });
      toast(
        <Feedback
          title="Success!"
          subtitle="Friend request sent"
          type="success"
          disableFeedback={true}
        />,
        {
          progress: undefined,
          toastId: 1,
          autoClose: 3000,
        },
      );
    } catch (e) {
      toast(
        <Feedback
          title="There's an error!"
          subtitle="Unable to send friend request"
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

  const acceptFriendRequest = async (): Promise<void> => {
    try {
      await acceptFriend({
        variables: {
          id: router.query.id as string,
        },
        refetchQueries: [namedOperations.Query.listFriends],
      });
      toast(
        <Feedback
          title="Success!"
          subtitle="Friend request accepted"
          type="success"
          disableFeedback={true}
        />,
        {
          progress: undefined,
          toastId: 1,
          autoClose: 3000,
        },
      );
    } catch (e) {
      toast(
        <Feedback
          title="There's an error!"
          subtitle="Unable to accept friend request"
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

  const declineFriendRequest = async (): Promise<void> => {
    try {
      await declineFriend({
        variables: {
          id: router.query.id as string,
        },
        refetchQueries: [namedOperations.Query.listFriends],
      });
      toast(
        <Feedback
          title="Success!"
          subtitle="Friend request declined"
          type="success"
          disableFeedback={true}
        />,
        {
          progress: undefined,
          toastId: 1,
          autoClose: 3000,
        },
      );
    } catch (e) {
      toast(
        <Feedback
          title="There's an error!"
          subtitle="Unable to decline friend request"
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

  const beginChat = async (): Promise<void> => {
    try {
      await startChat({
        variables: {
          data: {
            userId: profileData.id,
            name: profileData.username,
          },
        },
      });
    } catch (e) {
      toast(
        <Feedback
          title="There's an error!"
          subtitle="Unable to start chat with user"
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

  const checkAlreadyLiked = (challengeId: string): boolean => {
    let challenge;
    if (journalTab == "WORKS") {
      challenge = challenges?.findChallenges.find(
        (item) => item.id === challengeId,
      );
    } else
      challenge = favouriteChallenges?.findChallenges.find(
        (item) => item.id === challengeId,
      );
    if (!challenge) return false;
    const submission = challenge.challengeBlock.challengeGallery?.find(
      (submission: any) => challengeId === submission.id,
    );
    return !!submission?.likes?.find((like: any) => like.likerId === me?.id);
  };

  // ============VIEWS

  const FriendButton = (): React.ReactElement => {
    return (
      // If not own profile, we also need to check if they are already friends.
      // If yes, we can start chat. If no, we show a button to add friends
      // If they are not friends, we need to check if they already sent a friend request.
      // If yes, what is the status?
      me?.role === "STUDENT" && !friendshipState ? (
        <div role="none" onClick={sendFriendRequest}>
          <button className="flex flex-row items-center justify-center font-sans text-sm font-extrabold uppercase text-white lg:text-base">
            <HiUserAdd size={24} className="mr-3" color="white" />
            Add Friend
          </button>
        </div>
      ) : friendshipState === "ACCEPTED" ? (
        <div role="none" onClick={beginChat}>
          <button className="flex flex-row items-center justify-center font-sans text-sm font-extrabold uppercase text-white lg:text-base">
            <img
              src="/images/common/edit.svg"
              alt="Edit"
              className="mr-3 svg-white"
            />
            Start Chat
          </button>
        </div>
      ) : friendshipState === "PENDING_ME_ACCEPT" ? (
        <div className="flex flex-col">
          <div role="none" onClick={acceptFriendRequest} className="mb-2">
            <button className="flex flex-row items-center justify-center font-sans text-sm font-extrabold uppercase text-white lg:text-base">
              <HiUserAdd size={24} className="mr-3" color="white" />
              Accept Friend
            </button>
          </div>
          <div role="none" onClick={declineFriendRequest}>
            <button className="flex flex-row items-center justify-center font-sans text-sm font-extrabold text-red-500 uppercase lg:text-base">
              <HiUserRemove size={24} className="mr-3" />
              Decline Friend
            </button>
          </div>
        </div>
      ) : friendshipState === "PENDING" ? (
        <button className="flex flex-row items-center justify-center font-sans text-sm font-extrabold uppercase text-white lg:text-base">
          Friend Request Sent
        </button>
      ) : (
        <></>
      ) // If declined, I guess we dont show anything yet
    );
  };

  return (
    <AppLayout hostname={hostname} noFooter>
      <Head>
        <title>{memoTenant}</title>
      </Head>
      <div className="relative z-10 flex min-h-screen " data-tut="reactour__17">
        <Section size="2xl">
          {/* Content */}
          {profileData && (
            <div className="mt-4">
              <div className="flex md:hidden col-span-0 md:col-span-2 flex-col items-center justify-end h-96">
                <AvatarSection profileData={profileData} />
              </div>
              <div className="grid grid-cols-5 pt-8 mb-6 gap-x-6 lg:space-x-12 lg:grid-cols-5 h-4/5">
                <div className="hidden md:flex col-span-0 md:col-span-2 flex-col items-center justify-end h-96">
                  <AvatarSection profileData={profileData} />
                </div>
                <div className="col-span-5 md:col-span-3">
                  {displayTab == "MAIN" && (
                    <>
                      <div className="p-6 text-white">
                        <div className="flex justify-between">
                          <div className="col-span-1">
                            <p className="text-lg font-bold lg:text-2xl font-header tracking-header">
                              {profileData.user.firstName}{" "}
                              {profileData.user.lastName}
                            </p>
                          </div>
                          <div className="col-span-1 justify-self-end">
                            {isOwnProfile ? (
                              <Link href="/student/settings" passHref>
                                <button
                                  className="tour_18 flex flex-row items-center justify-center font-sans text-sm font-extrabold uppercase text-white lg:text-sm"
                                  data-tut="reactour__18"
                                  onClick={(): void => {
                                    audio[1].pause();
                                    audio[1].currentTime = 0;
                                    router.push("/student/settings");
                                  }}
                                >
                                  <img
                                    src="/images/common/edit.svg"
                                    alt="Edit"
                                    className="mr-2 svg-white"
                                  />
                                  Edit Profile
                                </button>
                              </Link>
                            ) : (
                              me && <FriendButton />
                            )}
                          </div>
                        </div>
                        {profileData && profileData.bio && (
                          <p className="opacity-80">{profileData.bio}</p>
                        )}
                      </div>
                      <div className="flex flex-col gap-y-4">
                        {/* TODO: Create badges and display them
                       <div className="flex flex-col bg-[#2D0745]/70 w-full rounded-md p-4">
                       <div className="flex flex-row justify-between">
                       <p className="text-white text-base font-bold">
                       Badges Earned (4 / 20)
                       </p>
                       <HiChevronRight className="w-8 h-8 text-white" />
                       </div>
                       <div className="flex flex-row gap-x-8 p-4">
                       {["", "", ""].map((badges) => (
                         <di className="rounded-full w-24 h-24 xl:w-36 xl:h-36 border-2 border-dashed border-white"></div>
                      ))}
                    </div>
                  </div> */}
                        {[
                          {
                            text: `Courses Enrolled (${
                              userResponse.data?.child.enrolledCourses?.filter(
                                (course) => course.course.published,
                              ).length ?? 0
                            } / ${courseCount?.adminCountCourse})`,
                            onClick: (): void => {
                              setDisplayTab("COURSES");
                            },
                          },
                          {
                            text: `My Journal (${
                              challenges?.findChallenges.length ?? 0
                            })`,
                            onClick: (): void => {
                              setDisplayTab("JOURNAL");
                            },
                          },
                          {
                            text: `My Friends (${friends.length ?? 0})`,
                            onClick: (): void => {
                              setDisplayTab("FRIENDS");
                            },
                          },
                        ].map((detail) => (
                          <div
                            className="flex flex-row items-center justify-between bg-[#2D0745]/70 w-full rounded-md p-4 h-20 cursor-pointer"
                            onClick={detail.onClick}
                            key={detail.text}
                          >
                            <p className="text-white text-base font-bold">
                              {detail.text}
                            </p>
                            <HiChevronRight className="w-8 h-8 text-white" />
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  {displayTab == "COURSES" && (
                    <EnrolledCourses
                      courseCount={courseCount}
                      enrolledCourse={
                        userResponse.data?.child
                          .enrolledCourses as EnrolledCourse[]
                      }
                      setDisplayTab={setDisplayTab}
                    />
                  )}
                  {displayTab == "FRIENDS" && (
                    <FriendSection
                      friends={friends}
                      setDisplayTab={setDisplayTab}
                    />
                  )}
                  {displayTab == "JOURNAL" && (
                    <JournalSection
                      challenges={
                        journalTab == "WORKS" ? challenges : favouriteChallenges
                      }
                      checkAlreadyLiked={checkAlreadyLiked}
                      journalTab={journalTab}
                      setDisplayTab={setDisplayTab}
                      setJournalTab={setJournalTab}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
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

export default withApollo(StudentProfile);
