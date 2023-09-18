import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import PrivacyData from "@/assets/privacy";
import Section from "@/components/Elements/Section";
import { AppLayout } from "@/components/Layout";
import LandingFooter from "@/components/Layout/LandingFooter";
import { extractHostname, getTenant, Props } from "@/utils/tenant";
import { withApollo } from "utils/hooks/withApollo";

const Privacy = ({ hostname }: Props): React.ReactElement => {
  const memoTenant = React.useMemo(() => {
    return getTenant(hostname);
  }, [hostname]);

  const data = PrivacyData(memoTenant.name, memoTenant.email);
  return (
    <AppLayout hostname={hostname} darkLayout noFooter>
      <div className="bg-[#220A4F] relative min-h-screen">
        <div className="h-auto bg-fixed bg-center bg-no-repeat bg-cover bg-landing-top">
          <Section size="2xl" padding="sm">
            <div className="mt-32">
              <article className="mx-auto prose prose-invert lg:prose-xl">
                {/* eslint-disable-next-line react/no-children-prop */}
                <ReactMarkdown children={data} remarkPlugins={[remarkGfm]} />
              </article>
            </div>
          </Section>
        </div>

        <LandingFooter memoTenant={memoTenant} />
      </div>
    </AppLayout>
  );
};

export default withApollo(Privacy);

export const getServerSideProps = extractHostname;
