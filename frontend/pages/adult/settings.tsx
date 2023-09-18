import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";
import { useForm } from "react-hook-form";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import * as z from "zod";

import { Button, Dialog } from "@/components/Elements";
import Section from "@/components/Elements/Section";
import { AppLayout } from "@/components/Layout";
import { ParentArrowTooltip } from "@/components/Onboard";
import Account from "@/components/Settings/Parent/Account";
import NotificationSettings from "@/components/Settings/Parent/Notifications";
import Password from "@/components/Settings/Parent/Password";
import SettingsTabs from "@/components/Settings/SettingsTabs";
import { extractHostname, getTenant, Props } from "@/utils/tenant";
import {
  useMeQuery,
  useUpdateUserOnboardedMutation,
} from "schema/generated/graphql";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";
import { useStore } from "utils/hooks/zustand";
export const getServerSideProps = extractHostname;

const schema = z.object({
  email: z.string().nonempty("Email is required!").email(),
  firstName: z.string().nonempty("First name is required!"),
  lastName: z.string().nonempty("Last name is required!"),
});

const ParentSettings = ({ hostname }: Props): React.ReactElement => {
  const settings = ["Account", "Password"];
  // const settings = ["Account", "Password", "Notifications"];

  // ============HOOKS
  const [currentSetting, changeCurrentSetting] = React.useState("Account");
  const { data, refetch } = useMeQuery();
  const router = useRouter();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setMe);
  const setTourOpen = useStore((state) => state.setOnboarding);
  const tourOpen = useStore((state) => state.onboarding);
  const [steps, setSteps] = React.useState<Step[]>([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
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

  // ============EFFECTS
  React.useEffect(() => {
    if (data && data.me) {
      resetForm();
    }
    if (isSubmitted) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSubmitted]);

  React.useEffect(() => {
    window.scroll(0, 0);
    if (tourOpen) {
      setSteps([
        {
          content: (
            <div className="w-64 lg:w-80">
              <div className="font-semibold space-y-4">
                <p>
                  You can always restart the tutorial by clicking “Restart
                  Tutorial”.
                </p>
              </div>
              <div className="flex items-center justify-center mt-10">
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
          disableBeacon: true,
          tooltipComponent: ParentArrowTooltip,
          placement: "right",
          target: ".tour_17",
          spotlightClicks: true,
        },
      ]);
    }
  }, []);

  const memoTenant = React.useMemo(() => {
    return getTenant(hostname).name;
  }, [hostname]);

  // ============FUNCTIONS
  const getSettingsForm: any = () => {
    switch (currentSetting) {
      case "Account":
        return (
          <Account
            errors={errors}
            handleSubmit={handleSubmit}
            register={register}
          />
        );
      case "Password":
        return <Password />;
      case "Notifications":
        return (
          <NotificationSettings
            errors={errors}
            handleSubmit={handleSubmit}
            control={control}
            setValue={setValue}
          />
        );
    }
  };

  const resetForm = (): void => {
    if (Object.keys(errors).length == 0) {
      if (data && data.me) {
        const defaults: any = {
          firstName: data.me.firstName,
          lastName: data.me.lastName,
          email: data.me.parent?.email,
        };
        reset(defaults);
      }
    }
  };

  const closeTour = (): void => {
    setTourOpen(false);
    setIsOpen(false);
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
      router.push("/adult/home");
    } catch (error) {
      console.log(error);
    }
  };

  const handleJoyrideCallback = (data: CallBackProps): void => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      // setTourOpen(false);
    }
  };

  // ============VIEWS
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
                Back to parent account
              </p>
            </a>
          </Link> */}
          {/* Content */}
          <div className="grid grid-cols-1 mt-12 lg:space-y-6 lg:space-x-12 lg:grid-cols-5">
            {getSettingsForm()}
            <SettingsTabs
              darkBg={false}
              settings={settings}
              currentSetting={currentSetting}
              resetFormCallback={resetForm}
              changeTabCallback={changeCurrentSetting}
              isDirty={isDirty}
            />
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
          disableCloseOnEsc
          disableOverlayClose
          steps={steps}
          stepIndex={0}
          disableScrolling
          disableScrollParentFix
          styles={{
            options: {
              width: "auto",
              zIndex: 10000,
            },
          }}
          tooltipComponent={ParentArrowTooltip}
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

export default withAuthenticated(withApollo(ParentSettings));
