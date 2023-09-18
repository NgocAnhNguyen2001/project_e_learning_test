import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import GuidelineData from "@/assets/guideline";
import Section from "@/components/Elements/Section";
import { AppLayout } from "@/components/Layout";
import LandingFooter from "@/components/Layout/LandingFooter";
import { extractHostname, getTenant, Props } from "@/utils/tenant";
import { withApollo } from "utils/hooks/withApollo";

const Terms = ({ hostname }: Props): React.ReactElement => {
  const memoTenant = React.useMemo(() => {
    return getTenant(hostname);
  }, [hostname]);

  const data = GuidelineData(memoTenant.name, memoTenant.email);

  return (
    <AppLayout hostname={hostname} darkLayout noFooter>
      <div className="bg-[#220A4F] relative min-h-screen">
        <div className="h-auto bg-fixed bg-center bg-no-repeat bg-cover bg-landing-top">
          <Section size="2xl" padding="sm">
            <div className="mt-32">
              <article className="mx-auto prose prose-invert lg:prose-xl">
                {/* eslint-disable-next-line react/no-children-prop */}
                <ReactMarkdown rehypePlugins={[rehypeRaw]} children={data} />
              </article>
            </div>
          </Section>
        </div>

        <LandingFooter memoTenant={memoTenant} />
      </div>
    </AppLayout>
  );
};

export default withApollo(Terms);

export const getServerSideProps = extractHostname;
