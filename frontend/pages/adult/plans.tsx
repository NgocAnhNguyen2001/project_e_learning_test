import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";
import { toast } from "react-toastify";

import { Button } from "@/components/Elements";
import { Card } from "@/components/Elements/Card";
import { Divider } from "@/components/Elements/Divider";
import Section from "@/components/Elements/Section";
import { Feedback } from "@/components/Feedback";
import { AppLayout } from "@/components/Layout";
import { extractHostname, getTenant, Props } from "@/utils/tenant";
import {
  useCheckoutSubscriptionMutation,
  useStripeProductsQuery,
} from "schema/generated/graphql";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";
import { useStore } from "utils/hooks/zustand";
export const getServerSideProps = extractHostname;

const ParentPlans = ({ hostname }: Props): React.ReactElement => {
  // ============HOOKS
  const user = useStore((state) => state.user);
  const router = useRouter();
  const { data } = useStripeProductsQuery();
  const [products, setProducts] = React.useState<any[]>([]);
  const [checkout, checkoutResponse] = useCheckoutSubscriptionMutation();

  // ============EFFECTS
  React.useEffect(() => {
    if (data && data.stripeProducts) {
      setProducts(data.stripeProducts);
    }
  }, [data]);

  React.useEffect(() => {
    if (
      checkoutResponse.data &&
      checkoutResponse.data.checkoutSubscriptionPlan
    ) {
      router.push(checkoutResponse.data.checkoutSubscriptionPlan);
    }
  }, [checkoutResponse.data, router]);

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
          <div className="grid grid-cols-4 my-10 gap-4">
            {products.map((product) => (
              <Card
                className="flex flex-col p-6 w-full col-span-1"
                key={product.id}
              >
                <p className="mb-4 font-extrabold">{product.name}</p>
                <p className="mb-4 font-extrabold text-brand1">
                  {product.prices[0].currency.toUpperCase()}{" "}
                  {(product.prices[0].amount / 100).toFixed(2)}
                </p>
                <Button
                  variant="brand1"
                  onClick={(): Promise<void> => purchase(product.prices[0].id)}
                >
                  Purchase
                </Button>
              </Card>
            ))}
          </div>
        </Section>
      </div>
    </AppLayout>
  );
};

export default withAuthenticated(withApollo(ParentPlans));
