import Link from "next/link";
import React from "react";

import { getTenant, Props } from "@/utils/tenant";
import FbLogo from "public/images/landing/socials/facebook.svg";
import IgLogo from "public/images/landing/socials/instagram.svg";
import LiLogo from "public/images/landing/socials/linkedin.svg";

import Section from "../Elements/Section";


const AboutFooter = ({ hostname }: Props): React.ReactElement => {
  const memoTenant = React.useMemo(() => getTenant(hostname), [hostname]);

  return (
    <Section size="2xl" padding="sm" className="mt-40 sm:mt-32">
      <div className="flex justify-start w-full pt-60">
        <div className="w-48">
          <img src={memoTenant.logo.landing} alt="" />
        </div>
      </div>
      <div className="flex">
        <div className="text-white opacity-60 pb-4">
          {`${memoTenant.name} Limited

${memoTenant.address}`
            .split("\n")
            .map((line, index) => (
              <div key={index} className={`pb-${line.trim() ? 1 : 4}`}>
                {line.trim()}
              </div>
            ))}
        </div>
      </div>
      <div className="grid md:grid-cols-4 gap-y-8">
        <div className="space-y-2 md:space-y-4">
          <p className="pb-4 text-white">Explore</p>
          <Link href="/courses" passHref>
            <div className="flex">
              <p className="text-white transition duration-200 ease-in-out cursor-pointer opacity-60 hover:opacity-100">
                Course Catalog
              </p>
            </div>
          </Link>
        </div>
        <div className="space-y-2 md:space-y-4">
          <p className="pb-4 text-white">Support</p>
          <Link href="/community-guidelines" passHref>
            <div className="flex">
              <p className="text-white transition duration-200 ease-in-out cursor-pointer opacity-60 hover:opacity-100">
                Community Guidelines
              </p>
            </div>
          </Link>
          <Link href="/terms" passHref>
            <div className="flex">
              <p className="text-white transition duration-200 ease-in-out cursor-pointer opacity-60 hover:opacity-100">
                Terms & Conditions
              </p>
            </div>
          </Link>
          <Link href="/privacy" passHref>
            <div className="flex">
              <p className="text-white transition duration-200 ease-in-out cursor-pointer opacity-60 hover:opacity-100">
                Privacy Policy
              </p>
            </div>
          </Link>
        </div>
        <div className="space-y-2 md:space-y-4">
          <p className="pb-4 text-white">Company</p>
          <div className="flex">
            <a
              href="https://medium.com/@novalearnorg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="text-white transition duration-200 ease-in-out cursor-pointer opacity-60 hover:opacity-100">
                News
              </p>
            </a>
          </div>
        </div>
        <div className="space-y-2 md:space-y-6">
          <p className="text-white">Join us on social media!</p>
          <div className="flex space-x-8">
            <a
              href="https://www.facebook.com/novalearnorg/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="transition duration-200 ease-in-out fill-white opacity-60 hover:opacity-100">
                <FbLogo />
              </div>
            </a>
            <a
              href="https://www.instagram.com/novalearnorg/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="transition duration-200 ease-in-out fill-white opacity-60 hover:opacity-100">
                <IgLogo />
              </div>
            </a>
            <a
              href="https://www.linkedin.com/company/novalearnorg/?originalSubdomain=hk"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="transition duration-200 ease-in-out fill-white opacity-60 hover:opacity-100">
                <LiLogo />
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="relative z-10 px-4 pt-20 text-sm text-center text-white opacity-60 md:pt-24 md:text-base">
        © Novalearn.org All Rights Reserved.
      </div>
    </Section>
  );
};

export default AboutFooter;
