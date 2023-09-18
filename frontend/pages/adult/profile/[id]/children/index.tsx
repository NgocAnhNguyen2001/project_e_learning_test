import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";
import { useForm } from "react-hook-form";
import { HiChevronRight } from "react-icons/hi";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import * as z from "zod";

import { ChildDetail } from "@/components/Children";
import { Button, Dialog } from "@/components/Elements";
import { Card } from "@/components/Elements/Card";
import { Divider } from "@/components/Elements/Divider";
import Section from "@/components/Elements/Section";
import { AppLayout } from "@/components/Layout";
import { ParentArrowTooltip } from "@/components/Onboard";
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
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
});

const ChildrenPage = ({ hostname }: Props): React.ReactElement => {
  // ============HOOKS
  const router = useRouter();

  const [children, setChildren] = React.useState<any[]>([]);

  const { data } = useMeQuery();

  const { reset } = useForm({
    resolver: zodResolver(schema),
  });
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setMe);
  const [updateUserOnboarded] = useUpdateUserOnboardedMutation();
  const setTourOpen = useStore((state) => state.setOnboarding);
  const tourOpen = useStore((state) => state.onboarding);
  const [tourStep, setTourStep] = React.useState(0);
  const [steps, setSteps] = React.useState<Step[]>([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  // ============EFFECTS
  React.useEffect(() => {
    if (data) {
      const defaults: any = {
        firstName: data.me.firstName,
        lastName: data.me.lastName,
        email: data.me.parent?.email,
      };
      reset(defaults);
      if (data.me.parent && data.me.parent.children) {
        setChildren(data.me.parent.children);
      }
    }
  }, [data, reset]);

  React.useEffect(() => {
    if (tourOpen) {
      setSteps([
        {
          //mobile
          content: (
            <div className="w-64 lg:w-80">
              <div className="font-semibold space-y-4">
                <p>Click on Menu icon </p>
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
              <div className="font-semibold space-y-4">
                <p>
                  You can manage your child’s account here, including changing
                  username and password in case they forget.
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
          disableBeacon: true,
          tooltipComponent: ParentArrowTooltip,
          placement: "bottom",
          target: ".tour_10",
          spotlightClicks: true,
        },
        {
          content: (
            <div className="w-64 lg:w-80">
              <div className="font-semibold space-y-4">
                <p>
                  You can manage your child’s account here, including changing
                  username and password in case they forget.
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
          disableBeacon: true,
          tooltipComponent: ParentArrowTooltip,
          placement: "bottom",
          target: "#Children",
          spotlightClicks: true,
        },
        {
          content: (
            <div className="w-64 lg:w-80">
              <div className="font-semibold space-y-4">
                <p>
                  You can also access their NovaLearn account by signing in
                  here.
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
                    router.push("/adult/courses");
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
          placement: "top",
          target: ".tour_11",
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
  }, []);

  const memoTenant = React.useMemo(() => {
    return getTenant(hostname).name;
  }, [hostname]);

  // ============FUNCTIONS
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
          <Section>
            <div className="text-center ">
              <p className="pb-4 text-4xl font-bold">Children Account</p>
              {/* <p className="">A description about managing accounts</p> */}
            </div>
            <div className="py-12">
              <Divider />
            </div>
            <div className="flex flex-col justify-between lg:flex-row">
              <p className="text-2xl font-bold ">Manage Account</p>
              <button
                className="uppercase text-sky-400 w-max"
                onClick={(): Promise<boolean> =>
                  router.push(`${router.asPath}/add`)
                }
              >
                + Add new account
              </button>
            </div>
            <Card className="mt-6">
              {children.length > 0 ? (
                children.map(
                  (child, index): React.ReactElement => (
                    <div key={index}>
                      <ChildDetail child={child} />
                      {index != children.length - 1 ? <Divider /> : null}
                    </div>
                  ),
                )
              ) : (
                <div className="flex w-full items-center justify-center py-6">
                  No children yet
                </div>
              )}
            </Card>
            {/* <div className="mt-6 ">
              <p className="font-bold">What is a Novagem?</p>
            </div> */}
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
        </div>
      </div>
    </AppLayout>
  );
};

export default withAuthenticated(withApollo(ChildrenPage));
