import Link from "next/link";
import React from "react";

import { Button } from "@/components/Elements";
import Section from "@/components/Elements/Section";
import { LightBackground } from "@/components/Layout/LightBackground";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";
import { extractHostname, getTenant, Props } from "@/utils/tenant";
import Head from "next/head";

const CheckoutCancel = ({ hostname }: Props): React.ReactElement => {
  const memoTenant = React.useMemo(() => {
    return getTenant(hostname).name;
  }, [hostname]);

  // ============VIEWS
  return (
    <LightBackground>
      <Head>
        <title>{memoTenant}</title>
      </Head>
      <div className="relative z-10 flex min-h-screen">
        <Section size="xl">
          <div className="pb-6 text-center items-center justify-center w-full h-full flex flex-col">
            <img src="/images/common/error.svg" alt="" className="w-16 h-16" />
            <p className="pb-4 text-2xl lg:text-3xl font-extrabold tracking-header my-6">
              Error Processing Order
            </p>
            <p className="text-base lg:text-lg font-bold text-gray-700 mb-16">
              An error occured while placing order, please verify credit card
              info and try again
            </p>
            <Link href={`/adult/plans`} passHref>
              {/* TODO: redirect back to checkout again */}
              <Button variant="inverse">Go back to payment screen</Button>
            </Link>
          </div>
        </Section>
      </div>
    </LightBackground>
  );
};

export default withAuthenticated(withApollo(CheckoutCancel));

export const getServerSideProps = extractHostname;
