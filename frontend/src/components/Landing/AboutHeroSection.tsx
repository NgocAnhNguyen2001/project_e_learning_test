import Image from "next/image";
import React from "react";

// eslint-disable-next-line import/no-unresolved
import Section from "../Elements/Section";

interface IAboutHeroSection {
  memoTenant?: string;
}

export const AboutHeroSection: React.FC<IAboutHeroSection> = (
  props,
): React.ReactElement => {
  const { memoTenant } = props;

  return (
    <div className="relative bg-left-bottom bg-no-repeat bg-cover min-h-screen bg-about-gradient overflow-hidden pb-96 md:pb-0 ">
      <Section size="2xl" padding="sm" className="relative z-10 mt-3">
        <div className="pt-12 space-y-8">
          <div className="flex flex-col md:flex-row justify-center space-x-7 text-white md:max-w-5xl mx-auto">
            <div className="w-full md:w-5/12">
              <div className="relative w-full h-72 md:h-2/5">
                <Image
                  layout="fill"
                  objectFit="contain"
                  src="/images/landing/nova-team.webp"
                  alt=""
                />
              </div>
              <p className="relative text-6xl font-extrabold text-center md:text-left md:-mt-3 lg:-mt-2 md:ml-4 lg:ml-9">
                About {memoTenant}
              </p>
            </div>
            <div className="md:w-7/12 font-bold text-xl mt-10 md:mt-4">
              <p className="sm:text-sm md:text-base md:leading-tight xl:mb-40">
                {memoTenant} is an international STEAM learning platform that’s
                created with the vision to improve the quality of after-school
                learning for kids across the globe.
                <br />
                <br />
                {
                  " We believe in providing always-on access to world-class, exciting, and effective extracurricular learning as a means to increase education equity, bridge geographical gaps, and promote lifelong learning. It's our mission to provide research-backed, curricula-linked, and professionally-designed resources to help kids become whatever they want to be in life."
                }
                <br />
                <br />
                {memoTenant} is at the forefront of redefining after-school
                education for kids aged 6 – 12 by combining edutainment with
                gamification. We believe it’s not enough to provide entertaining
                and educational content — there must be elements of challenge,
                progress, and development to ensure that students are engaged
                and always improving.
                <br />
                <br />
                We team up with talented professionals to create the perfect
                extracurricular learning platform: Our courses are designed by
                IB-accredited professionals with decades of experience, while
                our videos are produced by innovators in the field.
                <br />
                <br />
                {`${memoTenant} is much more than just a learning platform. It's a
                one-of-a-kind community of original thinkers, creators, and
                innovators spanning various disciplines, all coming together
                with a common purpose to transform after-school education.`}
              </p>
            </div>
          </div>
        </div>
        <p className="mb-40"></p>
      </Section>
    </div>
  );
};
