import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import ReactPlayer from "react-player/youtube";

import Section from "../Elements/Section";

interface IVideoSection {
  memoTenant: string;
  video: string;
  description: string;
}

export const VideoSection = ({
  memoTenant,
  video,
  description,
}: IVideoSection): React.ReactElement => {
  return (
    <div className="relative z-10">
      <Section size="2xl" padding="sm">
        <div className="relative z-[-10] w-60 h-32 -ml-10 ">
          <Image
            layout="fill"
            objectFit="contain"
            src="/images/landing/bg-planet.webp"
            alt=""
            className=""
          />
        </div>
        <div className="flex flex-col lg:flex-row items-center space-x-5 space-y-3 -mt-16">
          <div className="w-full lg:w-1/2">
            <div className="pb-[56.25%] h-0 overflow-hidden relative rounded-xl">
              <div className="absolute top-0 left-0 w-full h-full object-cover">
                <ReactPlayer
                  url={video}
                  controls
                  width={"100%"}
                  height={"100%"}
                  light
                  className=""
                />
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2  gap-y-10">
            <div className="relative  h-32 xl:h-44 w-full">
              <Image
                layout="fill"
                objectFit="contain"
                src="/images/landing/brush-pink.png"
                alt=""
                className="absolute top-0 left-0 h-32 xl:h-40 w-full"
              />
              <p
                className="absolute font-black top-5 left-6 xl:top-10 xl:left-10 
                          pt-1 px-4 sm:px-24 lg:px-4 text-white mt-1 sm:mt-0
                          text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl"
              >
                {memoTenant.split(" ")[0]} lets kids guide their own experiences
              </p>
            </div>
            <p className="text-lg font-extrabold text-center md:text-2xl lg:ml-2 lg:text-left">
              {description}
            </p>
            <Link href="/adult/auth/signup" passHref>
              <div className="bg-[#39809E] shadow-[#39809E] shadow-[0_0px_16px_3px_rgba(100,67,0,0.3)]  w-60 px-3 py-4 rounded-full flex flex-row items-center justify-center mx-auto lg:mx-0 space-x-2 cursor-pointer mt-10">
                <p className="uppercase font-bold text-lg text-white">
                  Get Started
                </p>
                <BsFillPlayCircleFill size={30} className="text-white" />
              </div>
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
};
