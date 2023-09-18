import { zodResolver } from "@hookform/resolvers/zod";
// import { enableBodyScroll } from "body-scroll-lock";
// import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";
import { useForm } from "react-hook-form";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import * as z from "zod";

import { Button, Dialog } from "@/components/Elements";
import Section from "@/components/Elements/Section";
import { AppLayout } from "@/components/Layout";
import { Tooltip } from "@/components/Onboard";
import SettingsTabs from "@/components/Settings/SettingsTabs";
import AccountSettings from "@/components/Settings/Student/Account";
import NotificationSettings from "@/components/Settings/Student/Notifications";
import { extractHostname, getTenant, Props } from "@/utils/tenant";
import {
  useChildLazyQuery,
  useUpdateUserOnboardedMutation,
} from "schema/generated/graphql";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";
import { useStore } from "utils/hooks/zustand";
export const getServerSideProps = extractHostname;

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z
    .string({
      errorMap: (issue, ctx) => {
        if (issue.code === z.ZodIssueCode.invalid_type) {
          if (issue.expected === "string") {
            return {
              message:
                "Username must only contain alphanumeric or underscore characters",
            };
          }
        }
        if (issue.code === z.ZodIssueCode.custom) {
          return { message: `less-than-${(issue.params || {}).minimum}` };
        }
        if (issue.code === "invalid_string") {
          return {
            message:
              "Username must only contain alphanumeric or underscore characters",
          };
        }
        return { message: ctx.defaultError };
      },
    })
    .min(4)
    .regex(/^[A-Z][A-Z0-9_]*[A-Z]$/i),
  birthDate: z.date().optional(),
  bio: z.optional(z.string()).nullable(),
  email: z.optional(z.string().email().or(z.literal(""))).nullable(),
});

const StudentSettings = ({ hostname }: Props): React.ReactElement => {
  // const settings = ["Account"];
  const settings = ["Account", "Notifications"];
  // ============HOOKS
  const router = useRouter();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setMe);
  const tourOpen = useStore((state) => state.onboarding);
  const setTourOpen = useStore((state) => state.setOnboarding);

  const [steps, setSteps] = React.useState<Step[]>([]);
  const [tourStep, setTourStep] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [currentSetting, changeCurrentSetting] = React.useState("Account");

  const [getChild, childResponse] = useChildLazyQuery();
  const [updateUserOnboarded] = useUpdateUserOnboardedMutation();

  const {
    handleSubmit,
    formState: { errors, isDirty, isSubmitted },
    control,
    setValue,
    reset,
    register,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [audioState, setAudioState] = React.useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const audio: HTMLAudioElement[] = !tourOpen
    ? []
    : [
        new Audio("/audio/onboarding/student/21.mp3"),
        new Audio("/audio/onboarding/student/22.mp3"),
      ];

  // ============EFFECTS
  React.useEffect(() => {
    const getChildData = async (): Promise<void> => {
      await getChild({
        variables: {
          id: user?.id as string,
        },
      });
    };

    if (user?.id) {
      getChildData();
      setSteps(stepsArr);
    }
  }, [user, getChild, audioState]);

  React.useEffect(() => {
    if (childResponse.data) {
      resetForm();
    }
    if (isSubmitted) {
      getChild({
        variables: {
          id: user?.id as string,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childResponse.data, isSubmitted]);

  const memoTenant = React.useMemo(() => {
    return getTenant(hostname).name;
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

  const updateOnboardStatus = async (): Promise<void> => {
    closeTour();
    audio[1].pause();
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

  const getSettingsForm: any = () => {
    switch (currentSetting) {
      case "Account":
        return (
          <AccountSettings
            handleSubmit={handleSubmit}
            errors={errors}
            register={register}
            control={control}
            setValue={setValue}
            userId={user?.id || ""}
          />
        );
      case "Notifications":
        return (
          <NotificationSettings
            // handleSubmit={handleSubmit}
            errors={errors}
            control={control}
            setValue={setValue}
            notificationSetting={
              childResponse.data?.child?.user.userNotificationSettings || []
            }
          />
        );
    }
  };

  const resetForm = (): void => {
    if (childResponse.data?.child) {
      const defaults: any = {
        username: childResponse.data?.child.username,
        email: childResponse.data?.child.email,
        firstName: childResponse.data?.child.user.firstName,
        lastName: childResponse.data?.child.user.lastName,
        birthDate: new Date(childResponse.data?.child.birthDate),
        bio: childResponse.data?.child.bio,
        notifications:
          (childResponse.data?.child.user.userNotificationSettings &&
            childResponse.data?.child.user.userNotificationSettings[0]
              ?.allowed) ||
          false,
      };
      reset(defaults);
    }
  };

  const handleJoyrideCallback = (data: CallBackProps): void => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      // setTourOpen(false);
    }

    // logGroup(type, data);
  };

  // ============VIEWS

  const stepsArr: Step[] = [
    {
      content: (
        <div>
          <img
            className="absolute z-20 hidden -mt-52 -ml-60 sm:block"
            src="/images/onboarding/helios.png"
            alt=""
          />
          <div className="w-64 sm:w-96 sm:ml-[46px] sm:pl-4">
            <div className="space-y-4 font-semibold">
              <p>
                You can change your account information and notification setting
                here!
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
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold text-center">
            <img
              className="absolute right-0 z-20 mr-[85%] lg:-mr-44 -mt-28 sm:block hidden"
              src="/images/onboarding/helios.png"
              alt=""
            />
            <p>
              You can always restart the tutorial by clicking Restart Tutorial.
            </p>
            <div>
              <p>Psst.. watch the Internet Safety course.</p>
              <p>I&apos;ll see you there!</p>
            </div>
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
          <div className="flex items-center justify-center mt-10 gap-x-3">
            <Button
              className="w-52"
              size="sm"
              variant="brand1"
              onClick={updateOnboardStatus}
            >
              End Tutorial
            </Button>
          </div>
        </div>
      ),
      placement: "bottom",
      target: ".tour_20",
      hideFooter: true,
      disableCloseOnEsc: true,
      disableOverlayClose: true,
      spotlightClicks: false,
    },
  ];

  return (
    <AppLayout hostname={hostname} darkLayout>
      <Head>
        <title>{memoTenant}</title>
      </Head>
      <div className="relative z-10 flex min-h-screen text-white">
        <Section size="2xl">
          {/* <Link href="/">
            <a className="flex items-center group">
              <Button
                className="mr-2 aspect-square group-hover:bg-gray-400 group-hover:border-b-gray-500 group-active:bg-gray-600"
                size="sm"
                variant="secondary"
              >
                <HiChevronLeft size={16} />
              </Button>
              <p className="text-sm text-white uppercase lg:text-base">
                Back to child account
              </p>
            </a>
          </Link> */}
          {/* Content */}
          <div className="grid grid-cols-1 mt-12 lg:space-y-6 lg:space-x-12 lg:grid-cols-5">
            {getSettingsForm()}
            <SettingsTabs
              darkBg
              settings={settings}
              currentSetting={currentSetting}
              resetFormCallback={resetForm}
              changeTabCallback={changeCurrentSetting}
              isDirty={isDirty}
            />
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

export default withAuthenticated(withApollo(StudentSettings));
