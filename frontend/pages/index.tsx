import Head from "next/head";
import React from "react";
import { Element, scroller } from "react-scroll";

import { CoursesHighlightSection } from "@/components/Landing/CoursesHighlightSection";

// import BgImage from "../public/images/landing/bg-bottom.png";

// import { AppDownloads } from "@/components/Landing/AppDownloads";

import { EndorsementSection } from "@/components/Landing/EndorsementSection";
import { FAQ } from "@/components/Landing/FAQ";
import { HeroSection } from "@/components/Landing/HeroSection";
import { SignUpSection } from "@/components/Landing/SignUpSection";
import { UniqueSection } from "@/components/Landing/UniqueSection";
import { VideoSection } from "@/components/Landing/Video";
import { LandingAppLayout } from "@/components/Layout";
import LandingFooter from "@/components/Layout/LandingFooter";
import { extractHostname, getTenant, Props } from "@/utils/tenant";
import { withApollo } from "utils/hooks/withApollo";
import { useStore } from "utils/hooks/zustand";

const Landing = ({ hostname }: Props): React.ReactElement => {
  const scrollRef = useStore((state) => state.scroll);
  const setScrollRef = useStore((state) => state.setScrollRef);

  const memoTenant = React.useMemo(() => getTenant(hostname), [hostname]);

  React.useEffect(() => {
    if (scrollRef) {
      setTimeout(() => {
        scroller.scrollTo(scrollRef, {
          duration: 800,
          delay: 0,
          smooth: "easeInOutQuart",
          offset: 300,
        });
        setScrollRef("");
      }, 100);
    }
  }, [scrollRef]);

  return (
    <LandingAppLayout hostname={hostname} noFooter>
      <Head>
        <title>{memoTenant.name}</title>
        <link
          rel="preload"
          href="/images/landing/landing-gradient.webp"
          as="image"
        />
      </Head>
      <div className="relative font-raleway">
        <HeroSection
          classes={memoTenant.backgroundClasses.hero}
          title={memoTenant.landing.heroTitle}
          subtitle={memoTenant.landing.heroSubtitle}
          images={memoTenant.landing.heroImages}
        />
        <VideoSection
          memoTenant={memoTenant.name}
          video={memoTenant.landing.previewSection.url}
          description={memoTenant.landing.previewSection.description}
        />
        {memoTenant.landing.unique ? (
          <UniqueSection memoTenant={memoTenant.name} />
        ) : null}
        <div
          className={`relative flex flex-col justify-between bg-top bg-no-repeat bg-cover ${
            memoTenant.backgroundClasses.courseHighlights
          }
          ${!memoTenant.landing.bottomHighlights && " mb-60"}
          `}
        >
          <Element name="categories" id="category">
            <CoursesHighlightSection
              memoTenant={memoTenant.name}
              memoTenantLogo={memoTenant.logo.png}
              memoTenantCourseImage={memoTenant.landing.courseImage}
              memoTenantClassnames={
                memoTenant.backgroundClasses.courseHighlightPaddingTop
              }
              memoTenantCourseCategories={memoTenant.courseCategories}
              memoTenantCourseCategoriesReplacments={
                memoTenant.courseCategoriesReplacment
              }
              bottomSectionRemove={!memoTenant.landing.bottomHighlights}
            />
          </Element>
        </div>
        <div className="-mt-80 relative z-20 flex flex-col justify-between bg-top bg-no-repeat bg-cover bg-signup">
          <SignUpSection
            memoTenant={memoTenant.name}
            memoTenantSignupImage={memoTenant.landing.signupImage}
          />
        </div>
        {memoTenant.landing.endorsement || memoTenant.landing.faq ? (
          <div className="relative flex flex-col justify-between min-h-screen bg-top bg-no-repeat bg-cover bg-faq pb-60">
            {memoTenant.landing.endorsement ? <EndorsementSection /> : null}
            {memoTenant.landing.faq ? (
              <Element name="faq" id="faq">
                <FAQ
                  memoTenant={memoTenant.name}
                  tenantMail={memoTenant.email}
                />
              </Element>
            ) : null}
          </div>
        ) : null}
        {/* <div className="-mt-60 relative z-20 flex flex-col justify-between bg-footer bg-bottom bg-no-repeat "> */}
        <div
          className={`relative z-20 flex flex-col justify-between bg-bottom bg-no-repeat bg-cover text-white fill-white ${memoTenant.backgroundClasses.footer}`}
        >
          <LandingFooter memoTenant={memoTenant} />
        </div>
      </div>
    </LandingAppLayout>
  );
};

export default withApollo(Landing);

export const getServerSideProps = extractHostname;
