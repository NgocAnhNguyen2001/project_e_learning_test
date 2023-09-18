import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// eslint-disable-next-line import/no-unresolved
import "swiper/css";
import { Navigation } from "swiper";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

import { Button } from "../Elements";

interface CarouselProps {
  videoPreviews?: any[];
  className?: string;
  isMobile?: boolean;
}

export const CourseVideoPreviewSkeleton = ({
  className,
  isMobile = false,
}: CarouselProps): React.ReactElement => {
  return (
    <div
      className={`${className} relative flex space-x-6 ${
        isMobile && "flex-col"
      }`}
    >
      {!isMobile && (
        <div className="flex items-center">
          <Button
            size="sm"
            variant="brand1"
            className="carousel-custom-prev"
            disabled
          >
            <HiOutlineChevronLeft />
          </Button>
        </div>
      )}
      <Swiper
        modules={[Navigation]}
        spaceBetween={50}
        slidesPerView={1}
        loop
        allowTouchMove={false}
        className="flex w-[80vw] lg:w-screen"
        navigation={{
          nextEl: `.carousel-custom-next`,
          prevEl: `.carousel-custom-prev`,
        }}
      >
        <SwiperSlide
          key={0}
          className="relative h-0 pb-[56.25%] overflow-hidden border-2 border-white rounded-xl border-opacity-40"
        >
          <div className="absolute top-0 left-0 w-full h-full animate-pulse bg-gray-200">
            <div className="md:w-44 sm:w-32 w-14" />
          </div>
        </SwiperSlide>
      </Swiper>
      <div
        className={`flex ${isMobile ? "justify-around mt-3" : "items-center"}`}
      >
        {isMobile && (
          <Button
            size="sm"
            variant="brand1"
            className={`carousel-custom-prev ${isMobile && "w-4/12"}`}
            disabled
          >
            <HiOutlineChevronLeft />
          </Button>
        )}
        <Button
          size="sm"
          variant="brand1"
          className={`carousel-custom-next ${isMobile && "w-4/12"}`}
          disabled
        >
          <HiOutlineChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default CourseVideoPreviewSkeleton;
