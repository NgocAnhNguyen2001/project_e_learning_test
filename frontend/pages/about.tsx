import Head from "next/head";
import React from "react";

// import BgImage from "../public/images/landing/bg-bottom.png";

// import { AppDownloads } from "@/components/Landing/AppDownloads";

import { AboutHeroSection } from "@/components/Landing/AboutHeroSection";
import { TeamSection } from "@/components/Landing/TeamSection";
import { LandingAppLayout } from "@/components/Layout";
import AboutFooter from "@/components/Layout/AboutFooter";
import { extractHostname, getTenant, Props } from "@/utils/tenant";
import { withApollo } from "utils/hooks/withApollo";

const About = ({ hostname }: Props): React.ReactElement => {
  const memoTenant = React.useMemo(() => getTenant(hostname).name, [hostname]);

  return (
    <LandingAppLayout hostname={hostname} noFooter>
      <Head>
        <title>{memoTenant}</title>
      </Head>
      <div className="relative font-raleway">
        <AboutHeroSection memoTenant={memoTenant} />
        <TeamSection memoTenant={memoTenant} />
        <div className=" -mt-96 relative z-20 flex flex-col justify-between bg-about-footer bg-bottom bg-no-repeat bg-cover mt-32">
          <AboutFooter hostname={hostname} />
        </div>
      </div>
    </LandingAppLayout>
  );
};

export default withApollo(About);

export const getServerSideProps = extractHostname;
