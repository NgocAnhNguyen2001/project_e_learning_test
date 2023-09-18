import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";
import { Accordion } from "react-accessible-accordion";
import { HiChevronRight } from "react-icons/hi";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";

import { Button, Dialog } from "@/components/Elements";
import { Divider } from "@/components/Elements/Divider";
import Section from "@/components/Elements/Section";
import { Title } from "@/components/Elements/Title";
import { AppLayout } from "@/components/Layout";
import { ParentTooltip, ParentArrowTooltip } from "@/components/Onboard";
import ParentReportItem from "@/components/Reports/parentReportItem";
import { extractHostname, getTenant, Props } from "@/utils/tenant";
import {
  useParentReportQuery,
  useUpdateUserOnboardedMutation,
} from "schema/generated/graphql";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";
import { useStore } from "utils/hooks/zustand";
export const getServerSideProps = extractHostname;

const ParentReports = ({ hostname }: Props): React.ReactElement => {
  // ============HOOKS
  const { data } = useParentReportQuery();
  const router = useRouter();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setMe);
  const setTourOpen = useStore((state) => state.setOnboarding);
  const [tourStep, setTourStep] = React.useState(0);

  const tourOpen = useStore((state) => state.onboarding);
  const [steps, setSteps] = React.useState<Step[]>([]);
  // const [user, setUser] = React.useState<any>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [updateUserOnboarded] = useUpdateUserOnboardedMutation();
  // ============EFFECTS
  React.useEffect(() => {
    window.scrollTo(0, 0);
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
                  Here is the weekly reports of your child’s progress on
                  NovaLearn.
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
                    router.push(`/adult/profile/${user?.id}/children`);
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
          target: ".tour_9",
          spotlightClicks: true,
        },
        {
          content: (
            <div className="w-64 lg:w-80">
              <div className="font-semibold space-y-4">
                <p>
                  Here is the weekly reports of your child’s progress on
                  NovaLearn.
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
                    router.push(`/adult/profile/${user?.id}/children`);
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
          target: "#Reports",
          spotlightClicks: true,
        },
      ]);

      const mediaQuery = window.matchMedia("(min-width: 1024px)");

      const mobileMenuTourHandler = (e: any): void => {
        e.matches ? setTourStep(1) : setTourStep(0);
      };

      mediaQuery.addEventListener("change", mobileMenuTourHandler);

      mobileMenuTourHandler(mediaQuery);
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
      setTourOpen(false);
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
          <div className="flex flex-col items-center pb-8">
            <Title color="black">Child Report</Title>
            <p className="pt-6">
              {"Take a look at your children's performance"}
            </p>
          </div>
          <Divider />
          <Accordion
            allowZeroExpanded
            allowMultipleExpanded
            className="mt-8 border-2 border-gray-300 border-opacity-60 rounded-2xl"
          >
            {data &&
            data.me.parent?.children &&
            data?.me?.parent?.children?.length > 0 ? (
              data?.me.parent?.children.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`${
                      data.me.parent?.children &&
                      index === data.me.parent?.children.length - 1
                        ? ""
                        : "border-b-2"
                    } border-gray-300`}
                  >
                    <ParentReportItem child={item} />
                  </div>
                );
              })
            ) : (
              <div className="flex w-full items-center justify-center py-6">
                No children yet
              </div>
            )}
            {/* </div> */}
          </Accordion>
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
          tooltipComponent={ParentTooltip}
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

export default withAuthenticated(withApollo(ParentReports));
