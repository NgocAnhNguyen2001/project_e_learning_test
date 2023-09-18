import Link from "next/link";
import React from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
// import BgImage from "../../../public/images/landing/bg-top.png";
import { Swiper, SwiperSlide } from "swiper/react";
// eslint-disable-next-line import/no-unresolved
import "swiper/css";
// eslint-disable-next-line
import "swiper/css/pagination";

import { Pagination } from "swiper";

import Section from "../Elements/Section";

import Image from "next/image";
interface IHeroSection {
  title: string;
  subtitle: string;
  images: string[];
  classes: string;
}

export const HeroSection: React.FC<IHeroSection> = ({
  classes,
  title,
  subtitle,
  images,
}): React.ReactElement => {
  const pagination = {
    clickable: true,
    renderBullet: (index: number, className: string): any => {
      return `<span key=${index} class="${className} swiper-pagination-bullet-size-custom swiper-green-active"></span>`;
    },
    type: "bullets" as "bullets" | "fraction" | "progressbar" | "custom",
    enabled: true,
  };

  return (
    <div
      className={`relative bg-left-bottom bg-no-repeat bg-cover text-white  overflow-hidden ${classes}`}
    >
      <Section size="2xl" padding="sm" className="relative z-10">
        <div className="pt-12 space-y-8">
          <div className="flex flex-col justify-center text-center pt-3 md:space-y-5  md:max-w-5xl mx-auto">
            <p className="text-5xl md:text-7xl font-black  w-full">{title},</p>
            <p className="text-5xl  font-black md:text-7xl pb-3">Reimagined.</p>
            <p className="text-xl font-bold md:text-3xl">{subtitle}</p>
            <div className="flex justify-center">
              <Link href="/adult/auth/signup" passHref>
                <div className="bg-[#FFAB00] shadow-[#FFAB00] shadow-[0_0px_16px_3px_rgba(100,67,0,0.3)] cursor-pointer px-10 py-3 rounded-full flex flex-row items-center justify-center mx-auto space-x-2 hover:scale-105 focus:scale-100 transition duration-200 ease-in-out disabled:cursor-not-allowed font-medium focus:outline-none mt-4">
                  <p className="uppercase font-bold text-lg ">
                    Sign up for free
                  </p>
                  <BsFillPlayCircleFill size={20} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Section>
      <div className="flex justify-center">
        <div className="lg:w-9/12 overflow-hidden rounded">
          <Swiper
            pagination={pagination}
            modules={[Pagination]}
            spaceBetween={30}
            slidesPerView={3}
            loop
            className="-mx-32"
          >
            {images.map((image) => (
              <SwiperSlide
                key={image}
                className="relative aspect-video h-full rounded-lg"
              >
                <div className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden">
                  <Image
                    layout="fill"
                    objectFit="contain"
                    alt=""
                    src={image}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
              </SwiperSlide>
            ))}
            {/* <SwiperSlide className="relative aspect-video h-full rounded-lg">
              <div className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden">
                <Image
                  layout="fill"
                  objectFit="contain"
                  alt=""
                  src="/images/landing/hero-navigation/2.webp"
                  className="object-fill w-full h-full"
                  priority
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className="relative aspect-video h-full rounded-lg overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full rounded-lg">
                <Image
                  layout="fill"
                  objectFit="contain"
                  alt=""
                  src="/images/landing/hero-navigation/3.webp"
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </SwiperSlide> */}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
