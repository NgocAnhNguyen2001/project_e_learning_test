import { format, fromUnixTime } from "date-fns";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

import { Card } from "@/components/Elements/Card";
import { Divider } from "@/components/Elements/Divider";
import Section from "@/components/Elements/Section";
import { Feedback } from "@/components/Feedback";
import { AppLayout } from "@/components/Layout";
import { extractHostname, getTenant, Props } from "@/utils/tenant";
import { useCheckoutDetailsLazyQuery } from "schema/generated/graphql";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";
import Head from "next/head";
export const getServerSideProps = extractHostname;

const CheckoutSuccess = ({ hostname }: Props): React.ReactElement => {
  // ============HOOKS
  const router = useRouter();

  const [details, setDetails] = React.useState<any>(null);

  const [getCheckoutDetails, checkoutDetails] = useCheckoutDetailsLazyQuery();

  // ============EFFECTS
  React.useEffect(() => {
    const getCheckoutInfo = async (sessionId: string): Promise<void> => {
      try {
        await getCheckoutDetails({
          variables: {
            checkoutSessionId: sessionId,
          },
        });
      } catch (err) {
        toast(
          <Feedback
            title="There's an error!"
            subtitle="Please refresh this page"
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

    if (router.query && router.query.session_id) {
      getCheckoutInfo(router.query.session_id as string);
    }
  }, [router, getCheckoutDetails]);

  React.useEffect(() => {
    if (checkoutDetails.data) {
      setDetails(checkoutDetails.data.checkoutSessionDetails);
    }
  }, [checkoutDetails.data]);

  const memoTenant = React.useMemo(() => {
    return getTenant(hostname).name;
  }, [hostname]);

  // ============FUNCTIONS

  // ============VIEWS
  return (
    <AppLayout hostname={hostname}>
      <Head>
        <title>{memoTenant}</title>
      </Head>
      <div className="relative z-10 flex min-h-screen">
        <Section size="2xl">
          <div className="flex flex-col">
            <div className="flex flex-row"></div>
            {details ? (
              <Card className="p-6">
                <div className="flex flex-row items-center">
                  <img
                    src="/images/common/success.svg"
                    alt=""
                    className="w-20 h-20 mr-16"
                  />
                  <div className="flex flex-col">
                    <p className="font-extrabold text-3xl lg:text-4xl">
                      Thank you for your purchase!
                    </p>
                    <p className="font-extrabold text-lg lg:text-xl text-gray-500">
                      Receipt #{details.invoice.number}
                    </p>
                  </div>
                </div>
                <Divider className="my-6" />
                <div className="flex flex-col">
                  <p className="text-gray-500 text-sm font-bold mb-2">
                    Items Purchased
                  </p>
                  {details.invoice.lines.data.map(
                    (line: any, index: number) => (
                      <p className="text-lg font-extrabold" key={index}>
                        {line.description}
                      </p>
                    ),
                  )}
                </div>
                <Divider className="my-6" />
                <div className="flex flex-col">
                  <p className="text-gray-500 text-sm font-bold mb-2">
                    Amount Paid
                  </p>
                  <p className="text-lg font-extrabold mb-6 uppercase">
                    {details.invoice.currency}{" "}
                    {(details.invoice.amount_paid / 100).toFixed(2)}
                  </p>
                  <p className="text-gray-500 text-sm font-bold mb-2">
                    Date Paid
                  </p>
                  <p className="text-lg font-extrabold mb-6">
                    {format(
                      fromUnixTime(details.invoice.created),
                      "MMMM d, yyyy",
                    )}
                  </p>
                  <p className="text-gray-500 text-sm font-bold mb-2">
                    Payment Method
                  </p>
                  <p className="text-lg font-extrabold uppercase">
                    {
                      details.paymentIntent.charges.data[0]
                        .payment_method_details[
                        details.paymentIntent.charges.data[0]
                          .payment_method_details.type
                      ].brand
                    }
                    -
                    {
                      details.paymentIntent.charges.data[0]
                        .payment_method_details[
                        details.paymentIntent.charges.data[0]
                          .payment_method_details.type
                      ].last4
                    }
                  </p>
                </div>
                <Divider className="my-6" />
                <p className="font-bold text-lg lg:text-xl text-gray-500">
                  If you have any question, contact us at{" "}
                  <a href="" className="text-brand1">
                    info@novalearn.com
                  </a>{" "}
                  or call at{" "}
                  <a href="" className="text-brand1">
                    +852 2688 0084
                  </a>
                </p>
                <Divider className="my-6" />
                <div className="flex flex-col">
                  <p className="text-gray-500 text-sm font-bold">
                    Address: Unit 3, 16th Floor W50, 50 Wong Chuk Hang Rd, Wong
                    Chuk Hang, Hong Kong
                  </p>
                  <p className="text-gray-500 text-sm font-bold">
                    Phone: <a className="text-brand1">+852 2688 0084</a>
                  </p>
                  <p className="text-gray-500 text-sm font-bold">
                    Email:{" "}
                    <a className="text-brand1 ml-1">info@novalearn.com</a>
                  </p>
                </div>
              </Card>
            ) : null}
          </div>
        </Section>
      </div>
    </AppLayout>
  );
};

export default withAuthenticated(withApollo(CheckoutSuccess));
