import Image from "next/image";
import React from "react";

import Section from "../Elements/Section";

const supports: any = [
  {
    imgUrl: "/images/landing/partners/cis.jpeg",
  },
  {
    imgUrl: "/images/landing/partners/cyberport-logo.png",
  },
  {
    imgUrl: "/images/landing/partners/ed21.jpeg",
  },
  {
    imgUrl: "/images/landing/partners/earcos.png",
  },
  {
    imgUrl: "/images/landing/partners/isns-logo.png",
  },
  {
    imgUrl: "/images/landing/partners/prister.png",
  },
  {
    imgUrl: "/images/landing/partners/steam-head.png",
  },
];

const features: any = [
  {
    imgUrl: "/images/landing/endorsements/kalkine.png",
  },
  {
    imgUrl: "/images/landing/endorsements/localiiz-logo.png",
  },
  {
    imgUrl: "/images/landing/endorsements/sassymama.png",
  },
  {
    imgUrl: "/images/landing/endorsements/the-standard.png",
  },
  {
    imgUrl: "/images/landing/endorsements/whizpa.png",
  },
];

export const EndorsementSection = (): React.ReactElement => {
  return (
    <div className="relative z-10 mt-44">
      <Section size="2xl" padding="md" className="relative z-10">
        <div className="bg-white px-5 pt-12 pb-28 text-center rounded-lg shadow-lg">
          <div className="w-full block mb-12">
            <div className="relative text-center">
              <img
                src="/images/landing/brush-green-3.png"
                alt=""
                className="absolute mx-auto text-center left-0 right-0 sm:w-6/12 md:w-4/12 lg:w-3/12 h-16 sm:h-auto xl:h-14"
              />
              <p className="font-black text-3xl text-center text-white z-20 absolute mx-auto left-0 right-0 top-3">
                Supported By
              </p>
            </div>
            <p className="mb-12 ">.</p>
            <div className="flex flex-col md:flex-row justify-center md:h-10 lg:h-16 space-x-4 w-60 md:w-auto mx-auto  space-y-10 md:space-y-0 ">
              {supports.map((support: any, index: number) => {
                return (
                  <div
                    className="relative w-full h-fit"
                    key={`support-${support.imgUrl}`}
                  >
                    <Image
                      layout="responsive"
                      width={"100%"}
                      height={"60%"}
                      objectFit="contain"
                      alt=""
                      key={index}
                      src={support.imgUrl}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full block xl:mt-32">
            <div className="relative text-center mt-16">
              <img
                src="/images/landing/brush-green-3.png"
                alt=""
                className="absolute mx-auto text-center left-0 right-0 sm:w-6/12 md:w-4/12 lg:w-3/12 h-16 sm:h-auto xl:h-14"
              />
              <p className="font-black text-3xl text-center text-white z-20 absolute mx-auto left-0 right-0 top-3">
                Featured On
              </p>
            </div>
            <p className="mb-12">.</p>
            <div className="flex flex-col md:flex-row justify-center md:h-8 lg:h-12 space-x-4 w-60 md:w-auto mx-auto mt-4 space-y-10 md:space-y-0">
              {features.map((feature: any, index: number) => {
                return (
                  <div
                    className="relative w-full h-fit"
                    key={`feature-${feature.imgUrl}`}
                  >
                    <Image
                      layout="responsive"
                      width={"100%"}
                      height={"60%"}
                      objectFit="contain"
                      alt=""
                      key={index}
                      src={feature.imgUrl}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};
