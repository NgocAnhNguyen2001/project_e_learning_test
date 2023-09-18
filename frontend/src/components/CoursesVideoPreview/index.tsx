import { useRouter } from "next/router";
import React from "react";
import {
  HiChevronRight,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiPlay,
} from "react-icons/hi";
import ReactPlayer from "react-player/file";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// eslint-disable-next-line import/no-unresolved
import "swiper/css";

import { useStore } from "utils/hooks/zustand";

import { Button } from "../Elements";

interface CarouselProps {
  videoPreviews?: any[];
  className?: string;
  isMobile?: boolean;
}

export const CourseVideoPreview = ({
  videoPreviews,
  className,
  isMobile = false,
}: CarouselProps): React.ReactElement => {
  const videoRef = React.useRef<any>();
  const user = useStore((state) => state.user);
  const router = useRouter();
  const [playing, setPlaying] = React.useState<boolean>(true);
  const [firstPlay, setFirstPlay] = React.useState<boolean>(true);
  const [urls, setUrls] = React.useState<any[]>([]);

  const updateUrl = async (): Promise<void> => {
    const urls = await Promise.all(
      videoPreviews!.map(async (item) => {
        return {
          name: item.title,
          url: item.videoUrl,
          available: await fetch(
            `/api/checkIfExists?url=${encodeURIComponent(
              item.videoUrl.replace(/\/media\//g, "/media/sd-"),
            )}`,
            { method: "HEAD" },
          )
            .then((res) => (res.ok ? true : false))
            .catch(() => false),
        };
      }),
    );

    const valids: string[] = urls.map(({ url, available }) =>
      available ? url.replace(/\/media\//g, "/media/sd-") : url,
    );
    setUrls(valids);
  };

  React.useEffect(() => {
    updateUrl();
  }, [videoPreviews]);

  const playPauseVideo = (): void => {
    if (!firstPlay) setPlaying(!playing);
    setFirstPlay(false);
  };

  const navigate = (id: string): void => {
    if (!user) {
      router.push(`/courses/${id}`);
    } else if (user.role === "STUDENT") {
      router.push(`/student/courses/${id}`);
    } else if (user.role === "TEACHER") {
      router.push(`/navigator/courses/preview/${id}`);
    } else {
      router.push(`/adult/courses/preview/${id}`);
    }
  };
  return (
    <div
      className={`${className} relative flex space-x-6 ${
        isMobile && "flex-col"
      }`}
    >
      <div className="flex items-center">
        <Button
          size="sm"
          variant="brand1"
          className={`carousel-custom-prev ${isMobile && "hidden"}`}
        >
          <HiOutlineChevronLeft />
        </Button>
      </div>
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
        watchSlidesProgress
      >
        {videoPreviews &&
          videoPreviews.length > 0 &&
          videoPreviews.map((item: any, index: number) => {
            return (
              <SwiperSlide
                key={index}
                className="relative h-0 pb-[56.25%] overflow-hidden border-2 border-white rounded-xl border-opacity-40"
              >
                {({ isActive, isVisible }): React.ReactElement => {
                  // if (!isVisible) {
                  //   // suppose to restart the last played video but didnt
                  //   videoRef.current?.seekTo(0);
                  // }

                  return (
                    <div className="absolute top-0 left-0 w-full h-full object-cover overflow-hidden">
                      <div className="absolute flex flex-col justify-between w-full h-full">
                        <div className="flex">
                          <p className="px-4 py-2 text-xl font-bold text-white bg-black bg-opacity-40 rounded-br-xl">
                            {item.title}
                          </p>
                        </div>
                        <button
                          className="absolute z-10 flex items-center justify-center w-full h-full text-white"
                          onClick={playPauseVideo}
                        >
                          {(!playing || firstPlay) && <HiPlay size={64} />}
                        </button>
                        <div className="absolute bottom-0 right-0 z-20">
                          <button
                            className="flex items-center px-4 py-2 text-xl font-bold text-white bg-black bg-opacity-40 rounded-tl-xl"
                            onClick={(): void => navigate(item.id)}
                          >
                            <p>View Course</p>
                            <HiChevronRight size={32} />
                          </button>
                        </div>
                      </div>
                      <ReactPlayer
                        ref={videoRef}
                        playing={isActive && isVisible && playing}
                        url={urls[index]}
                        width="100%"
                        height="100%"
                        muted={!isVisible || firstPlay}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  );
                }}
              </SwiperSlide>
            );
          })}
      </Swiper>
      <div
        className={`flex ${isMobile ? "justify-around mt-3" : "items-center"}`}
      >
        <Button
          size="sm"
          variant="brand1"
          className={`carousel-custom-prev w-4/12 ${!isMobile && "hidden"}`}
        >
          <HiOutlineChevronLeft />
        </Button>
        <Button
          size="sm"
          variant="brand1"
          className={`carousel-custom-next ${isMobile && "w-4/12"}`}
        >
          <HiOutlineChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default CourseVideoPreview;

export * from "./CourseVideoPreviewSkeleton";
