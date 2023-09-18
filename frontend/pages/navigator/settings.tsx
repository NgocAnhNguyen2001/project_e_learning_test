import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";
import { useForm } from "react-hook-form";
import { HiChevronRight } from "react-icons/hi";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import * as z from "zod";

import { Button, Dialog } from "@/components/Elements";
import Section from "@/components/Elements/Section";
import { AppLayout } from "@/components/Layout";
import { ParentTooltip, ParentArrowTooltip } from "@/components/Onboard";
import SettingsTabs from "@/components/Settings/SettingsTabs";
import NotificationSettings from "@/components/Settings/Teacher/Notifications";
import PasswordSettings from "@/components/Settings/Teacher/Password";
import ProfileSettings from "@/components/Settings/Teacher/Profile";
import { extractHostname, getTenant, Props } from "@/utils/tenant";
import {
  useTeacherQuery,
  useUpdateUserOnboardedMutation,
} from "schema/generated/graphql";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";
import { useStore } from "utils/hooks/zustand";
export const getServerSideProps = extractHostname;

const schema = z.object({
  introduction: z.string().nullable(),
  jobTitle: z.optional(z.string()).nullable(),
  experiences: z
    .optional(
      z.array(
        z.object({
          title: z.string().nonempty("Job title is required!"),
          employer: z.string().nonempty("Job employer is required!"),
          startMonth: z
            .number()
            .min(1)
            .max(12)
            .refine((num) => num != null, "Starting month is required"),
          startYear: z
            .number()
            .min(1)
            .max(new Date().getFullYear())
            .refine((num) => num != null, "Starting year is required"),
          endMonth: z
            .number()
            .min(1)
            .max(12)
            .refine((num) => num != null, "End month is required"),
          endYear: z
            .number()
            .min(1)
            .max(new Date().getFullYear())
            .refine((num) => num != null, "End year is required"),
          description: z.string().nullable(),
        }),
      ),
    )
    .nullable(),
  education: z
    .optional(
      z.array(
        z.object({
          degree: z.string().nonempty("Degree field is required!"),
          school: z.string().nonempty("School name is required!"),
          startMonth: z
            .number()
            .min(1)
            .max(12)
            .refine((num) => num != null, "Starting month is required"),
          startYear: z
            .number()
            .min(1)
            .max(new Date().getFullYear())
            .refine((num) => num != null, "Starting year is required"),
          endMonth: z
            .number()
            .min(1)
            .max(12)
            .refine((num) => num != null, "End month is required"),
          endYear: z
            .number()
            .min(1)
            .max(new Date().getFullYear())
            .refine((num) => num != null, "End year is required"),
          description: z.string().nullable(),
        }),
      ),
    )
    .nullable(),
  certificates: z
    .optional(
      z.array(
        z.object({
          title: z.string().nonempty("Title is required!"),
          issuer: z.string().nonempty("Issuer is required!"),
          month: z
            .number()
            .min(1)
            .max(12)
            .refine((num) => num != null, "Month is required"),
          year: z
            .number()
            .min(1)
            .max(new Date().getFullYear())
            .refine((num) => num != null, "Year is required"),
          description: z.string().nullable(),
        }),
      ),
    )
    .nullable(),
  email: z.string().nonempty("Email is required!").email(),
  firstName: z.string().nonempty("First name is required!"),
  lastName: z.string().nonempty("Last name is required!"),
  gender: z.string().nullable(),
  nationality: z.string().nullable(),
  phoneNumber: z.string().nullable(),
});

const TeacherSettings = ({ hostname }: Props): React.ReactElement => {
  const router = useRouter();
  const { data, refetch } = useTeacherQuery();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setMe);
  const tourOpen = useStore((state) => state.onboarding);
  const setTourOpen = useStore((state) => state.setOnboarding);
  const [updateUserOnboarded] = useUpdateUserOnboardedMutation();
  const [steps, setSteps] = React.useState<Step[]>([]);
  const [tourStep, setTourStep] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const {
    handleSubmit,
    formState: { errors, isDirty, isSubmitted },
    control,
    setValue,
    watch,
    reset,
    register,
  } = useForm({
    resolver: zodResolver(schema),
  });

  //=====FUNCTIONS
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

  const getSettingsForm: any = () => {
    switch (currentSetting) {
      case "Profile":
        return (
          <ProfileSettings
            handleSubmit={handleSubmit}
            errors={errors}
            register={register}
            setValue={setValue}
            watch={watch}
            control={control}
          />
        );
      case "Password":
        return <PasswordSettings />;
      case "Notifications":
        return (
          <NotificationSettings
            handleSubmit={handleSubmit}
            errors={errors}
            setValue={setValue}
            control={control}
          />
        );
    }
  };

  // const settings = ["Profile", "Password", "Notifications"];
  const settings = ["Profile", "Password"];

  const [currentSetting, changeCurrentSetting] = React.useState("Profile");

  const resetForm = (): void => {
    if (data && data.me) {
      const defaults = {
        firstName: data.me.firstName,
        lastName: data.me.lastName,
        jobTitle: data.me.teacher?.jobTitle,
        introduction: data.me.teacher?.introduction,
        gender: data.me.teacher?.gender,
        nationality: data.me.teacher?.nationality,
        email: data.me.teacher?.email,
        phoneNumber: data.me.teacher?.phoneNumber,
        experiences: data.me.teacher?.experiences
          ? data.me.teacher?.experiences
          : [],
        education: data.me.teacher?.education ? data.me.teacher?.education : [],
        certificates: data.me.teacher?.certificates
          ? data.me.teacher?.certificates
          : [],
      };
      reset(defaults);
    }
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (tourOpen) {
      setSteps([
        {
          //0
          content: (
            <div className="w-64 lg:w-80">
              <div className="space-y-4 font-semibold">
                <p>
                  As mentioned earlier, you can edit your Profile content here,
                  and also reset your account password.
                </p>
                <p>Do remember to click this button to save your changes!</p>
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
          placement: "bottom-start",
          target: ".navigator_tour_84",
          disableBeacon: true,
          disableOverlay: true,
          spotlightClicks: true,
        },
        {
          //0
          content: (
            <div className="w-64 lg:w-80">
              <div className="space-y-4 font-semibold">
                <p>
                  You can always restart the tutorial by clicking “Restart
                  Tutorial”.{" "}
                </p>
              </div>
              <div className="flex items-center justify-center text-center mt-10">
                <Button
                  className="w-52"
                  size="xs"
                  variant="brand1"
                  onClick={updateOnboardStatus}
                >
                  End Tutorial
                </Button>
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
          target: ".navigator_tour_85",
          disableBeacon: true,
          disableOverlay: true,
          spotlightClicks: true,
        },
      ]);
    }
  }, []);

  React.useEffect(() => {
    if (Object.keys(errors).length == 0) {
      if (data && data.me) {
        resetForm();
      }
      if (isSubmitted) {
        refetch();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSubmitted]);

  React.useEffect(() => {
    if (router.query.page) {
      changeCurrentSetting(router.query.page as string);
    }
  }, [router]);

  const memoTenant = React.useMemo(() => {
    return getTenant(hostname).name;
  }, [hostname]);

  return (
    <AppLayout hostname={hostname}>
      <Head>
        <title>{memoTenant}</title>
      </Head>
      <div className="relative z-10 flex min-h-screen">
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
              <p className="text-sm uppercase lg:text-base">
                Back to teacher account
              </p>
            </a>
          </Link> */}
          {/* Content */}
          <div className="grid grid-cols-1 mt-12 lg:space-y-6 lg:space-x-12 lg:grid-cols-5">
            {getSettingsForm()}
            <SettingsTabs
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
        steps={steps}
        stepIndex={tourStep}
        disableCloseOnEsc
        disableOverlayClose
        tooltipComponent={ParentTooltip}
        styles={{
          options: {
            width: "auto",
            zIndex: 10000,
          },
          spotlight: {
            borderRadius: 20,
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

export default withAuthenticated(withApollo(TeacherSettings));
