import { format, fromUnixTime } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";
import { HiChevronRight } from "react-icons/hi";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import { toast } from "react-toastify";

import { ChildOverview } from "@/components/Children";
import { Button, Dialog } from "@/components/Elements";
import { Card } from "@/components/Elements/Card";
import { Divider } from "@/components/Elements/Divider";
import Section from "@/components/Elements/Section";
import { Feedback } from "@/components/Feedback";
import { AppLayout } from "@/components/Layout";
import { ParentTooltip, ParentArrowTooltip } from "@/components/Onboard";
import { extractHostname, getTenant, Props } from "@/utils/tenant";
import {
  useCheckoutSubscriptionMutation,
  useMeQuery,
  // useTransactionHistoryQuery,
  useUpdateUserOnboardedMutation,
} from "schema/generated/graphql";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";
import { useStore } from "utils/hooks/zustand";

const ParentHome = ({ hostname }: Props): React.ReactElement => {
  // ============HOOKS
  const router = useRouter();
  const user = useStore((state) => state.user);
  const onboardStep = useStore((state) => state.onboardStep);
  const setUser = useStore((state) => state.setMe);
  const setLoading = useStore((state) => state.setLoading);
  const setTourOpen = useStore((state) => state.setOnboarding);
  const tourOpen = useStore((state) => state.onboarding);
  const [tourStep, setTourStep] = React.useState(0);
  const [steps, setSteps] = React.useState<Step[]>([]);
  const [customer] = React.useState<any>();
  const [upcoming] = React.useState<any>();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [children, setChildren] = React.useState<any>(undefined);
  const { data: me, loading } = useMeQuery();
  // const { data, loading } = useTransactionHistoryQuery();
  const [checkout, checkoutResponse] = useCheckoutSubscriptionMutation();
  const [updateUserOnboarded] = useUpdateUserOnboardedMutation();

  // ============EFFECTS
  React.useEffect(() => {
    if (me && me.me) {
      setUser(me.me);
    }
  }, []);

  React.useEffect(() => {
    if (me?.me.parent && me.me.parent.children) {
      setChildren(me.me.parent.children);
    }
  }, [me]);

  React.useEffect(() => {
    setLoading(loading);

    if (tourOpen && !steps.length) {
      window.scrollTo(0, 0);
      if (onboardStep == 7) {
        setTourStep(6);
      }
      setSteps(stepsArr);
    }
  }, [loading]);

  // React.useEffect(() => {
  //   if (data?.transactionHistoryList) {
  //     console.log(data.transactionHistoryList.customer);
  //     console.log(data.transactionHistoryList.upcoming);
  //     setCustomer(data.transactionHistoryList.customer);
  //     setUpcoming(data.transactionHistoryList.upcoming);
  //   }
  // }, [data]);

  React.useEffect(() => {
    if (
      checkoutResponse.data &&
      checkoutResponse.data.checkoutSubscriptionPlan
    ) {
      router.push(checkoutResponse.data.checkoutSubscriptionPlan);
    }
  }, [checkoutResponse.data, user]);

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
  };

  const stepsArr: Step[] = [
    {
      content: (
        <div>
          <div className="space-y-4 font-semibold text-center">
            <p>
              Welcome to Novalearn, {user?.firstName + " " + user?.lastName},
              where your child&apos;s after-school learning begins{" "}
            </p>
            <p>Let&apos;s get started.</p>
          </div>
          <div className="flex items-center justify-center mt-10 gap-x-3">
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
                // Check if hit lg breakpoint
                const mediaQuery = window.matchMedia("(min-width: 1024px)");

                const mobileMenuTourHandler = (e: any): void => {
                  e.matches ? setTourStep(1) : setTourStep(2);
                };

                mediaQuery.addEventListener("change", mobileMenuTourHandler);

                mobileMenuTourHandler(mediaQuery);
              }}
            >
              Begin Tutorial
            </Button>
          </div>
        </div>
      ),
      styles: {
        options: {
          overlayColor: "rgba(0,0, 0, 0.85)",
        },
      },
      placement: "center",
      target: "body",
      hideFooter: true,
      disableBeacon: true,
    },
    {
      //1
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>
              This is your Dashboard with quick access to your child’s progress,
              preview courses and manage billings.{" "}
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
                setTourStep(5);
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
      target: ".parent_tour_2",
      spotlightClicks: true,
      disableBeacon: true,
    },
    {
      //2-mobile
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
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
                // Check if hit lg breakpoint
                const mediaQuery = window.matchMedia("(min-width: 1024px)");

                const mobileMenuTourHandler = (e: any): void => {
                  e.matches ? setTourStep(4) : setTourStep(3);
                };

                mediaQuery.addEventListener("change", mobileMenuTourHandler);

                mobileMenuTourHandler(mediaQuery);
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
      spotlightClicks: true,
      disableBeacon: true,
    },
    {
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>
              This is your Dashboard with quick access to your child’s progress,
              preview courses and manage billings.
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
                setTourStep(4);
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
      target: "#Home",
      spotlightClicks: true,
      disableBeacon: true,
    },
    {
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>Click on Menu icon again.</p>
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
                setTourStep(5);
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
      target: ".tour_2_mobile",
      spotlightClicks: true,
      disableBeacon: true,
    },
    {
      content: (
        <div>
          <div className="space-y-4 font-semibold">
            <p>
              First, let’s create your child’s account. Click this button to
              begin.
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
          overlayColor: "rgba(0,0, 0, 0.85)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "right",
      target: ".tour_3",
      disableOverlay: false,
      spotlightClicks: true,
      disableBeacon: true,
    },
    {
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>Your child’s account is successfully created.</p>
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
                router.push("/adult/reports");
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
      disableBeacon: true,
      target: ".tour_8",
      spotlightClicks: true,
    },
  ];

  const memoTenant = React.useMemo(() => {
    return getTenant(hostname).name;
  }, [hostname]);

  // ============FUNCTIONS
  const purchase = async (priceId: string): Promise<void> => {
    try {
      await checkout({
        variables: {
          priceId,
        },
      });
    } catch (err) {
      toast(
        <Feedback
          title="There's an error!"
          subtitle="Unable to checkout item"
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

  // ============VIEWS
  return (
    <AppLayout hostname={hostname}>
      <Head>
        <title>{memoTenant}</title>
      </Head>
      <div className="relative z-10 flex min-h-screen">
        <Section size="2xl">
          <div className="pb-6 text-center ">
            <p className="pb-4 text-3xl font-bold font-header tracking-header">
              Welcome {user?.firstName} {user?.lastName}
            </p>
            <p>
              {
                "Keep track of your child's new learning progress & weekly reports for the week"
              }
            </p>
          </div>
          <Divider />

          {/* Content */}
          <div className="grid grid-cols-1 pt-8 space-y-6 lg:space-x-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              {children && children.length === 0 ? (
                <div className="flex flex-col items-center">
                  <img
                    src="/images/dashboard/child.png"
                    alt=""
                    className="w-24 pb-4"
                  />
                  <p className="pb-4 text-xl font-semibold text-center font-header tracking-header">
                    Start adding new child account
                  </p>
                  <p className="pb-4 text-center lg:w-1/2">
                    Get started by adding account for your children and let them
                    start learning
                  </p>
                  <Link
                    href={`/adult/profile/${user?.id}/children/add`}
                    passHref
                  >
                    <Button variant="brand1" className="tour_3">
                      + Add new account
                    </Button>
                  </Link>
                </div>
              ) : (
                // If children exist
                <div className="flex flex-col tour_2">
                  <div className="flex items-center justify-between pb-4">
                    <p className="text-lg font-bold grow lg:text-xl">
                      Children Account
                    </p>
                    <Link
                      href={`/adult/profile/${user?.id}/children/add`}
                      passHref
                    >
                      <Button variant="ghost" size="none" className="tour_3">
                        + Add New Account
                      </Button>
                    </Link>
                  </div>
                  <Card>
                    {children && children.length > 0 ? (
                      children.map((child: any, index: number) => (
                        <div className="flex flex-col tour_8" key={index}>
                          <ChildOverview child={child} />
                          {index !== children.length - 1 ? <Divider /> : null}
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center justify-center w-full py-6">
                        No children yet
                      </div>
                    )}
                  </Card>
                </div>
              )}
            </div>
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <div className="px-6 pt-6 ">
                  <p className="pb-6 text-xl font-bold font-header tracking-header">
                    Billings
                  </p>
                  {!customer || !upcoming ? (
                    <div className="flex flex-col items-center justify-center w-full py-6">
                      <img
                        src="/images/dashboard/add-course.png"
                        alt=""
                        className="w-16"
                      />
                      <p className="my-4 text-xl font-extrabold lg:text-2xl">
                        Join {memoTenant} Today!
                      </p>
                      <Button
                        variant="gray"
                        disabled
                        onClick={(): Promise<void> =>
                          purchase("price_1KZUQbK1uAefKQki8dENRTMU")
                        }
                      >
                        Subscribe Now
                      </Button>
                      <p className="pt-4 opacity-60">Coming soon!</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-5 space-x-4">
                      <div className="col-span-1">
                        <img src="/images/common/credit_cards.png" alt="" />
                      </div>
                      <div className="col-span-4 text-opacity-80">
                        <p className="pb-6">
                          Always keep payment details updated to avoid
                          disturbance when children are learning{" "}
                        </p>
                        <div className="pb-4">
                          <p className="">Plan</p>
                          <p className="font-bold">Premium</p>
                        </div>
                        <div className="pb-4">
                          <p className="">Next Auto Renewal</p>
                          <p className="font-bold">
                            {format(
                              fromUnixTime(upcoming.created),
                              "dd MMM yyyy",
                            )}
                          </p>
                        </div>
                        <div className="pb-4">
                          <p className="">Debit / Credit Card No.</p>
                          <p className="font-bold">
                            ****-{customer.payment_methods.data[0].card.last4}
                          </p>
                        </div>
                        <div className="pb-4">
                          <p className="">Price</p>
                          <p className="font-bold uppercase">
                            {upcoming.currency}{" "}
                            {(upcoming.amount_due / 100).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <Divider />
                {/* <div className="grid grid-cols-2 p-6 space-x-4">
                  <Link href={`/adult/billing`} passHref>
                    <Button variant="brand1" size="sm" className="col-span-2">
                      Manage Bill
                    </Button>
                  </Link>
                </div> */}
              </Card>
              <Card>
                <Link href="/adult/courses" passHref>
                  <div className="flex p-4 transition duration-200 ease-in-out hover:cursor-pointer hover:bg-gray-200 hover:bg-opacity-50 rounded-2xl">
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
                          "Discover our carefully tailored courses that are ready to take your children to the next level"
                        }
                      </p>
                    </div>
                    <div className="flex items-center justify-end w-1/12">
                      <HiChevronRight size={32} />
                    </div>
                  </div>
                </Link>
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
        tooltipComponent={ParentTooltip}
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

export default withAuthenticated(withApollo(ParentHome));

export const getServerSideProps = extractHostname;
