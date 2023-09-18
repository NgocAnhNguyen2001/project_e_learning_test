import { Tab } from "@headlessui/react";
import { format, fromUnixTime } from "date-fns";
import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";
import { HiSwitchHorizontal, HiChevronRight } from "react-icons/hi";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import { toast } from "react-toastify";

import { Button, Dialog } from "@/components/Elements";
import Section from "@/components/Elements/Section";
import { Feedback } from "@/components/Feedback";
import { AppLayout } from "@/components/Layout";
import { ParentArrowTooltip } from "@/components/Onboard";
import { extractHostname, getTenant, Props } from "@/utils/tenant";
import {
  useCheckoutSubscriptionMutation,
  // useTransactionHistoryQuery,
  useUpdateUserOnboardedMutation,
} from "schema/generated/graphql";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";
import { useStore } from "utils/hooks/zustand";

const ParentBilling = ({ hostname }: Props): React.ReactElement => {
  // ============HOOKS
  // const setLoading = useStore((state) => state.setLoading);
  const router = useRouter();
  // const { data, loading } = useTransactionHistoryQuery();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setMe);
  const setTourOpen = useStore((state) => state.setOnboarding);
  const tourOpen = useStore((state) => state.onboarding);
  const [tourStep, setTourStep] = React.useState(0);
  const [steps, setSteps] = React.useState<Step[]>([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [history] = React.useState<any[]>([]);
  const [customer] = React.useState<any>();
  const [upcoming] = React.useState<any>();
  const [checkout, checkoutResponse] = useCheckoutSubscriptionMutation();
  const [updateUserOnboarded] = useUpdateUserOnboardedMutation();

  // ============EFFECTS
  // React.useEffect(() => {
  //   setLoading(loading);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [loading]);

  // React.useEffect(() => {
  //   if (data?.transactionHistoryList) {
  //     setHistory(data.transactionHistoryList.history);
  //     setCustomer(data.transactionHistoryList.customer);
  //     setUpcoming(data.transactionHistoryList.upcoming);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [data]);

  React.useEffect(() => {
    if (
      checkoutResponse.data &&
      checkoutResponse.data.checkoutSubscriptionPlan
    ) {
      router.push(checkoutResponse.data.checkoutSubscriptionPlan);
    }
  }, [checkoutResponse.data]);

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
                <p>You can access payment billings here.</p>
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
          placement: "bottom-start",
          target: ".tour_13",
          spotlightClicks: true,
        },
        {
          content: (
            <div className="w-64 lg:w-80">
              <div className="font-semibold space-y-4">
                <p>You can access payment billings here.</p>
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
          target: "#Billing",
          spotlightClicks: true,
        },
        {
          content: (
            <div className="w-64 lg:w-80">
              <div className="font-semibold space-y-4">
                <p>
                  Click on “notification” to find what you have missed when you
                  were away.
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
                    const mediaQuery = window.matchMedia("(min-width: 1024px)");

                    const mobileMenuTourHandler = (e: any): void => {
                      e.matches ? setTourStep(4) : setTourStep(5);
                    };

                    mediaQuery.addEventListener(
                      "change",
                      mobileMenuTourHandler,
                    );

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
          placement: "bottom",
          target: ".tour_14",
          spotlightClicks: true,
        },
        {
          content: (
            <div className="w-64 lg:w-80">
              <div className="font-semibold space-y-4">
                <p>Click on the profile icon.</p>
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
          placement: "bottom",
          target: ".tour_15",
          disableBeacon: true,
          spotlightClicks: true,
        },
        {
          content: (
            <div className="w-64 lg:w-80">
              <div className="font-semibold space-y-4">
                <p>Click on Settings to manage your account.</p>
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
                    router.push("/adult/settings");
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
          target: "#Settings",
          spotlightClicks: true,
        },
        {
          content: (
            <div className="w-64 lg:w-80">
              <div className="font-semibold space-y-4">
                <p>Click on Settings to manage your account.</p>
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
                    router.push("/adult/settings");
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
          placement: "left",
          target: ".tour_16",
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

  React.useEffect(() => {
    const onClick = (): void => {
      if (
        document.querySelector(".mobile-user-menu")?.ariaExpanded === "true"
      ) {
        setTourStep(6);
      }
    };

    window.addEventListener("click", onClick);

    return (): any => {
      window.removeEventListener("click", onClick);
    };
  }, []);

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
        <Section size="xl">
          <div className="pb-10 text-center ">
            <p className="pb-4 text-3xl font-bold font-header tracking-header">
              Manage Billing
            </p>
            <p>
              Always keep payment details updated to avoid disturbance when
              children are learning
            </p>
          </div>

          {/* Content */}
          <Tab.Group>
            <div className="mx-auto">
              <div className="mt-4 mb-10">
                <Tab.List className="flex flex-row text-center text-gray-400 justify-center-mb-px">
                  <Tab
                    className={({ selected }): string =>
                      selected
                        ? "inline-block text-center flex-1 pb-3 tracking-wide no-underline border-b-2 border-brand1-500 text-brand1-500"
                        : "inline-block text-center flex-1 pb-3 tracking-wide no-underline border-b-2 border-gray-200"
                    }
                  >
                    General
                  </Tab>
                  <Tab
                    className={({ selected }): string =>
                      selected
                        ? "inline-block text-center flex-1 pb-3 tracking-wide no-underline border-b-2 border-brand1-500 text-brand1-500"
                        : "inline-block text-center flex-1 pb-3 tracking-wide no-underline border-b-2 border-gray-200"
                    }
                  >
                    History
                  </Tab>
                </Tab.List>
              </div>
            </div>
            <Tab.Panels>
              <Tab.Panel>
                {customer ? (
                  <>
                    <div className="flex flex-col my-6">
                      <p className="mb-2 font-bold text-gray-500">Plan</p>
                      {/* We can store the plan in backend perhaps, or not even show it */}
                      <p className="flex flex-row font-extrabold text-gray-800">
                        Premium
                      </p>
                      <button className="flex flex-row items-center mt-2 font-extrabold uppercase text-brand1">
                        <HiSwitchHorizontal className="mr-2" size={24} />
                        Change Plan
                      </button>
                    </div>
                    <div className="flex flex-col my-6">
                      <p className="mb-2 font-bold text-gray-500">
                        Next Auto Renewal
                      </p>
                      <p className="flex flex-row font-extrabold text-gray-800">
                        {format(fromUnixTime(upcoming.created), "dd MMM yyyy")}
                      </p>
                    </div>
                    <div className="flex flex-col my-6">
                      <p className="mb-2 font-bold text-gray-500">
                        Estimated Billing Amount
                      </p>
                      <p className="flex flex-row font-extrabold text-gray-800 uppercase">
                        {upcoming.currency}{" "}
                        {(upcoming.amount_due / 100).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex flex-col my-6">
                      <p className="mb-2 font-bold text-gray-500">
                        Payment Method
                      </p>
                      <p className="flex flex-row font-extrabold text-gray-800 capitalize">
                        {customer.payment_methods.data[0].card.brand}
                      </p>
                      <button className="flex flex-row items-center mt-2 font-extrabold uppercase text-brand1">
                        <HiSwitchHorizontal className="mr-2" size={24} />
                        Change Payment Method
                      </button>
                    </div>
                    <div className="flex flex-col my-6">
                      <p className="mb-2 font-bold text-gray-500">
                        Debit / Credit Card Number
                      </p>
                      <p className="flex flex-row font-extrabold text-gray-800">
                        ****-{customer.payment_methods.data[0].card.last4}
                      </p>
                    </div>
                    <div className="flex flex-col my-6">
                      <p className="mb-2 font-bold text-gray-500">
                        Billing Email
                      </p>
                      <p className="flex flex-row font-extrabold text-gray-800">
                        {/* We need to swap this to use the actual data from stripe */}
                        {customer.payment_methods.data[0].billing_details.email}
                      </p>
                    </div>
                    <div className="flex flex-col my-6">
                      <p className="mb-2 font-bold text-gray-500">
                        Billing Name
                      </p>
                      <p className="flex flex-row font-extrabold text-gray-800">
                        {customer.payment_methods.data[0].billing_details.name}
                      </p>
                    </div>
                    <div className="flex flex-col my-6">
                      <p className="mb-2 font-bold text-gray-500">
                        Billing Address
                      </p>
                      <p className="flex flex-row font-extrabold text-gray-800">
                        {
                          customer.payment_methods.data[0].billing_details
                            .address.line1
                        }
                      </p>
                      <p className="flex flex-row font-extrabold text-gray-800">
                        {
                          customer.payment_methods.data[0].billing_details
                            .address.line2
                        }
                      </p>
                      <p className="flex flex-row font-extrabold text-gray-800">
                        {
                          customer.payment_methods.data[0].billing_details
                            .address.city
                        }
                        {
                          customer.payment_methods.data[0].billing_details
                            .address.postal_code
                        }
                      </p>
                      <p className="flex flex-row font-extrabold text-gray-800">
                        {customer.payment_methods.data[0].billing_details
                          .address.state
                          ? `${customer.payment_methods.data[0].billing_details.address.state}, `
                          : ""}{" "}
                        {
                          customer.payment_methods.data[0].billing_details
                            .address.country
                        }
                      </p>
                    </div>
                    <div className="flex flex-col my-6">
                      <p className="mb-2 font-bold text-gray-500">
                        Credit Balance
                      </p>
                      <p className="flex flex-row font-extrabold text-green-400">
                        USD 0.00
                      </p>
                    </div>
                    <Button variant="danger">Cancel Subscription</Button>
                  </>
                ) : (
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
                )}
              </Tab.Panel>
              <Tab.Panel className="flex items-center justify-center w-full">
                <div className="flex flex-row items-center w-full overflow-x-auto">
                  <table className="rounded-3xl border-2 border-gray-200 w-full border-separate [border-spacing:0] overflow-hidden">
                    <thead className="bg-gray-200 bg-opacity-20">
                      <tr className="">
                        <th className="p-4 border-r-2 border-gray-200">Date</th>
                        <th className="p-4 border-r-2 border-gray-200">Item</th>
                        <th className="p-4 border-r-2 border-gray-200">
                          Status
                        </th>
                        <th className="p-4 border-r-2 border-gray-200">
                          Total
                        </th>
                        <th className="p-4 border-gray-200">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history &&
                        history.map((data) => (
                          <tr key={data.id} className="font-bold text-gray-600">
                            <td className="p-4 border-t-2 border-r-2 border-gray-200">
                              {format(fromUnixTime(data.created), "dd/MM/yy")}
                            </td>
                            <td className="flex-wrap w-full max-w-xs p-4 border-t-2 border-r-2 border-gray-200">
                              {data.invoice.lines.data.map(
                                (line: any, index: number) => (
                                  <span className="block" key={index}>
                                    {line.description}
                                  </span>
                                ),
                              )}
                            </td>
                            <td className="p-4 capitalize border-t-2 border-r-2 border-gray-200">
                              {data.charges.data[0].refunded
                                ? "Refunded"
                                : data.status === "succeeded"
                                ? "Paid"
                                : data.status}
                            </td>
                            <td className="p-4 uppercase border-t-2 border-r-2 border-gray-200 whitespace-nowrap">
                              {data.currency} {(data.amount / 100).toFixed(2)}
                            </td>
                            <td className="p-4 border-t-2 border-gray-200">
                              <a
                                href={data.invoice.hosted_invoice_url}
                                target="_blank"
                                className="font-extrabold text-brand1"
                                rel="noreferrer"
                              >
                                View
                              </a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
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
          stepIndex={tourStep}
          styles={{
            options: {
              width: "auto",
              zIndex: 10000,
            },
            spotlight: {
              boxShadow: "0px 0px 16px 8px rgba(255,255,255,0.10)",
              borderRadius: 20,
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

export default withAuthenticated(withApollo(ParentBilling));

export const getServerSideProps = extractHostname;
