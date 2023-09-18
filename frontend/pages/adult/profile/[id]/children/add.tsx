import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";
import { HiChevronRight } from "react-icons/hi";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import { toast } from "react-toastify";

import { Button, Dialog } from "@/components/Elements";
import { Feedback } from "@/components/Feedback";
import { AppLayout } from "@/components/Layout";
import { ParentArrowTooltip } from "@/components/Onboard";
import AddChildForm from "@/components/Parent/Child/AddChildForm";
import { extractHostname, getTenant, Props } from "@/utils/tenant";
import {
  CreateChildInput,
  useAddChildMutation,
  useUpdateUserOnboardedMutation,
} from "schema/generated/graphql";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";
import { useStore } from "utils/hooks/zustand";
export const getServerSideProps = extractHostname;

const AddChildren = ({ hostname }: Props): React.ReactElement => {
  // ============HOOKS
  const router = useRouter();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setMe);
  const [addChild] = useAddChildMutation();
  const [updateUserOnboarded] = useUpdateUserOnboardedMutation();
  const setOnboardStep = useStore((state) => state.setOnboardStep);
  const setTourOpen = useStore((state) => state.setOnboarding);
  const tourOpen = useStore((state) => state.onboarding);
  const [tourStep, setTourStep] = React.useState(0);
  const [steps, setSteps] = React.useState<Step[]>([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  // ============EFFECTS
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (tourOpen) {
      setSteps([
        {
          content: (
            <div className="w-64 lg:w-80">
              <div className="font-semibold space-y-4">
                <p>Fill in the information</p>
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
          placement: "right",
          target: ".tour_4",
          disableBeacon: true,
          spotlightClicks: true,
        },
        {
          content: (
            <div className="w-64 lg:w-80">
              <div className="font-semibold space-y-4">
                <p>Your child will log in with the username created here. </p>
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
          placement: "bottom",
          target: ".tour_5",
          disableBeacon: true,
          spotlightClicks: true,
        },
        {
          content: (
            <div className="w-64 lg:w-80">
              <div className="font-semibold space-y-4">
                <p>
                  Create a 4-digit password only you and your child remembers.{" "}
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
          placement: "right",
          target: ".tour_6",
          spotlightClicks: true,
        },
        {
          content: (
            <div className="w-64 lg:w-80">
              <div className="font-semibold space-y-4">
                <p>
                  Click here once all the information are filled in. You can
                  always edit the details later.
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
          placement: "right",
          target: ".tour_7",
          spotlightClicks: true,
        },
      ]);
    }
  }, []);

  const memoTenant = React.useMemo(() => {
    return getTenant(hostname).name;
  }, [hostname]);

  // ============FUNCTIONS
  const closeTour = (): void => {
    setTourOpen(false);
    setIsOpen(false);
  };

  const childSubmit = async (data: CreateChildInput): Promise<void> => {
    try {
      await addChild({
        variables: {
          data: {
            loginPattern: data.loginPattern,
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            birthDate: data.birthDate,
          },
        },
      }).then(() => {
        setOnboardStep(7);
        router.push("/adult/home");
        // router.push(router.asPath.split("/add")[0]);
      });
    } catch (e: any) {
      if (e.graphQLErrors[0].message.includes("already used")) {
        toast(
          <Feedback
            title="There's an error!"
            subtitle="Username already in use"
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
        toast(
          <Feedback
            title="There's an error!"
            subtitle="Something went wrong"
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
    }
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
    } catch (error) {
      console.log(error);
    }
    router.push("/adult/home");
  };

  // ============VIEWS
  return (
    <AppLayout hostname={hostname}>
      <Head>
        <title>{memoTenant}</title>
      </Head>
      <div className="relative min-h-screen bg-fixed bg-bottom bg-no-repeat bg-cover bg-dashboard-light">
        <div className="absolute top-0 left-0 z-0 w-full h-full bg-white bg-opacity-90" />
        <div className="relative z-10">
          <AddChildForm onSubmit={childSubmit} />
        </div>
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
        disableOverlay
        tooltipComponent={ParentArrowTooltip}
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

export default withAuthenticated(withApollo(AddChildren));
