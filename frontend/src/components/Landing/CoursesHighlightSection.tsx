import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { useWindowSize } from "rooks";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import capitalize from "lodash/toUpper";

import { useCategoriesQuery, useCoursesQuery } from "schema/generated/graphql";

import Section from "../Elements/Section";

// eslint-disable-next-line
import "swiper/css";
// eslint-disable-next-line
import "swiper/css/pagination";

type LayoutType = "desktop" | "tablet" | "mobile";

interface ICoursesHighlightSection {
  memoTenantLogo: string;
  memoTenant: string;
  memoTenantClassnames: string;
  memoTenantCourseImage?: string;
  memoTenantCourseCategories: string[];
  memoTenantCourseCategoriesReplacments?: any;
  bottomSectionRemove: boolean;
}

export const CoursesHighlightSection = ({
  memoTenant,
  memoTenantLogo,
  memoTenantClassnames,
  memoTenantCourseImage,
  memoTenantCourseCategories,
  memoTenantCourseCategoriesReplacments,
  bottomSectionRemove,
}: ICoursesHighlightSection): React.ReactElement => {
  const router = useRouter();
  const { innerWidth } = useWindowSize();

  const [layout, setLayout] = React.useState<LayoutType | null>(
    innerWidth
      ? innerWidth > 1280
        ? "desktop"
        : innerWidth <= 768
        ? "mobile"
        : "tablet"
      : null,
  );

  React.useEffect(() => {
    if (innerWidth && innerWidth > 1280 && layout !== "desktop")
      return setLayout("desktop");
    else if (innerWidth && innerWidth <= 768 && layout !== "mobile")
      return setLayout("mobile");
    else if (
      innerWidth &&
      innerWidth > 768 &&
      innerWidth < 1280 &&
      layout !== "tablet"
    )
      return setLayout("tablet");
  }, [innerWidth]);

  React.useEffect(() => {
    renderCourseSwiper();
  }, [layout]);

  const renderCourseSwiper = (): React.ReactElement => {
    return (
      <>
        <Swiper
          pagination={pagination}
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          loop
          className="hidden md:block"
        >
          {getCoursesSwiper()}
        </Swiper>
        {/* Mobile VIEW */}
        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={3}
          loop
          className="-mx-60 overflow-hidden md:hidden"
        >
          {courses?.courses?.map((course) => (
            <SwiperSlide
              className="relative aspect-video h-full overflow-hidden"
              key={course.id}
            >
              <div className="relative w-full h-64 rounded-lg overflow-hidden absolute">
                <Image
                  layout="fill"
                  objectFit="contain"
                  alt=""
                  src={
                    memoTenantCourseImage ??
                    (course.thumbnail?.url
                      ? `${course.thumbnail?.url}?x-oss-process=image/resize,w_400,limit_0`
                      : memoTenantLogo)
                  }
                  className="object-cover w-full h-full rounded-lg cursor-pointer"
                  onClick={(): void => {
                    router.push(`/courses/${course.id}`);
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    );
  };

  const pagination = {
    // el: "z-40",
    clickable: true,
    renderBullet: (index: number, className: string): any => {
      return `<span key=${index} class="${className} swiper-pagination-bullet-size-custom swiper-orange-active"></span>`;
    },
    type: "bullets" as "bullets" | "fraction" | "progressbar" | "custom",
    enabled: true,
  };
  const { data: courses } = useCoursesQuery({
    variables: {
      where: {
        published: { equals: true },
      },
    },
  });

  const { data: categories } = useCategoriesQuery();

  const getCoursesSwiper = (): React.ReactElement[] => {
    let slide: React.ReactElement[] = [];
    const slides: React.ReactElement[][] = [];
    courses?.courses?.forEach((course) => {
      slide.push(
        <div
          className="relative w-full h-64 rounded-lg overflow-hidden"
          key={course.id}
        >
          <Image
            layout="fill"
            objectFit="contain"
            alt=""
            src={
              memoTenantCourseImage ??
              (course.thumbnail?.url
                ? `${course.thumbnail?.url}?x-oss-process=image/resize,w_400,limit_0`
                : memoTenantLogo)
            }
            className="object-cover w-full h-full rounded-lg cursor-pointer aspect-video"
            onClick={(): void => {
              router.push(`/courses/${course.id}`);
            }}
          />
        </div>,
      );
      if (slide.length == (layout === "tablet" ? 4 : 6)) {
        slides.push(slide);
        slide = [];
      }
    });
    return slides.map((slide, idx) => (
      <SwiperSlide
        className={`grid grid-cols-${
          layout === "tablet" ? 2 : 3
        } gap-y-3 gap-x-3`}
        key={`slide-${idx}`}
      >
        {slide}
      </SwiperSlide>
    ));
  };

  return (
    <div className="overflow-hidden">
      {courses?.courses.length != 0 && (
        <Section
          size="2xl"
          padding="sm"
          className={`relative z-10 ${memoTenantClassnames}`}
        >
          <div className="flex justify-center text-center mb-12">
            <div className="relative w-full sm:w-4/5 h-12 lg:h-24 flex justify-center text-center">
              <Image
                layout="fill"
                objectFit="cover"
                src="/images/landing/brush-green.png"
                alt=""
                className=""
              />
              <p className="font-black text-xs md:text-lg lg:text-3xl xl:text-4xl text-center text-white z-20 absolute px-3 mx-auto left-0 right-0 top-2 md:top-3 xl:top-6 mt-2 sm:mt-0">
                Course Highlights - Inspiring Action, Igniting Learning
              </p>
            </div>
          </div>
          {renderCourseSwiper()}
        </Section>
      )}
      <Section size="2xl" padding="sm" className="relative z-30 ">
        {categories?.categories.length != 0 && (
          <div className="space-y-7">
            <p className="text-white text-center text-4xl font-bold">
              Explore all our courses now
            </p>
            <div
              className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-none lg:grid-flow-col gap-y-10 gap-x-8`}
            >
              {categories?.categories?.map((item, index: number) => {
                if (
                  memoTenantCourseCategories.includes("ALL") ||
                  memoTenantCourseCategories.includes(capitalize(item.name))
                ) {
                  return (
                    <div className="text-center" key={item.id}>
                      <div
                        key={index}
                        className="relative text-center mx-auto space-y-5 w-32 h-32 lg:w-28 lg:h-28 xl:w-32 xl:h-32"
                      >
                        <Link href={`/courses?category=${item.name}`}>
                          <Image
                            layout="fill"
                            objectFit="contain"
                            src={
                              memoTenantCourseCategoriesReplacments?.[
                                capitalize(item.name)
                              ].img ??
                              item.activeImgUrl ??
                              "/images/landing/category_english.png"
                            }
                            alt=""
                            className="flex justify-center text-center mx-aut hover:scale-105 focus:scale-100 transition duration-200 ease-in-out disabled:cursor-not-allowed font-medium focus:outline-none cursor-pointer"
                          />
                        </Link>
                      </div>
                      <p className="text-white font-bold text-lg">
                        {memoTenantCourseCategoriesReplacments?.[
                          capitalize(item.name)
                        ].name ?? item.name}
                      </p>
                    </div>
                  );
                }
                return null;
              })}
            </div>
            <Link href="/courses" passHref>
              <button className="bg-[#FFAB00] shadow-[#FFAB00] shadow-[0_0px_16px_3px_rgba(100,67,0,0.3)] cursor-pointer px-3 py-1 rounded-full flex flex-row items-center justify-center mx-auto space-x-2 w-44 hover:scale-105 focus:scale-100 transition duration-200 ease-in-out disabled:cursor-not-allowed font-medium focus:outline-none">
                <p className="uppercase text-white">View All</p>
                <BsFillPlayCircleFill size={20} className="text-white" />
              </button>
            </Link>
          </div>
        )}

        {bottomSectionRemove ? null : (
          <>
            <div>
              <div className="lg:flex justify-center text-center mt-12">
                <div className="relative flex text-center lg:w-full xl:w-10/12 h-20 sm:h-12 lg:h-32">
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src="/images/landing/brush-pink-2.png"
                    alt=""
                    className=" "
                  />
                  <p className="font-bold text-md md:text-lg lg:text-4xl text-center text-white z-20 absolute mx-auto left-0 right-0 top-2 md:top-3 xl:top-5 mt-2 sm:mt-0 lg:mt-1 w-10/12">
                    Give your kid a headstart in the classroom powered by STEAM
                  </p>
                </div>
              </div>
              <p className="text-center text-sm md:text-md lg:text-2xl mb-10 mx-0 lg:mx-20 font-bold text-white">
                {`${memoTenant} is much more than just fun and games. Our STEAM
            after-school learning courses are aligned with international
            curricula to help kids reinforce what they're learning in the
            classroom. Students can also work ahead to develop their passion and
            interests. All our STEAM online supplementary courses are created
            and accredited by IB-certified teachers.`}
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-6 gap-y-10 gap-x-6">
                <div className="relative  bg-white px-8 py-6 rounded-lg h-72 shadow-lg w-full h-9/10">
                  <Image
                    layout="fill"
                    objectFit="contain"
                    src="/images/landing/steam/stem.jpg"
                    alt=""
                    className="py-2 px-4"
                  />
                </div>
                <div className="bg-white px-8 py-6 rounded-lg h-72 shadow-lg ">
                  <div className="relative w-full h-1/3">
                    <Image
                      layout="fill"
                      objectFit="contain"
                      src="/images/landing/steam/cambridge.png"
                      alt=""
                      className=""
                    />
                  </div>
                  <div className="h-1/2 border-b-[#4D4D4D] border-2 border-x-0 border-t-0 text-center">
                    <p className="text-[#4D4D4D] font-bold">
                      Cambridge Assessment English UK
                    </p>
                  </div>
                  <p className="text-xs text-[#4D4D4D] mt-3 text-center ">
                    CEFR Level A1 - C2
                  </p>
                </div>
                <div className="bg-white px-8 py-6 rounded-lg h-72 shadow-lg">
                  <div className="relative w-full h-1/3">
                    <Image
                      layout="fill"
                      objectFit="contain"
                      src="/images/landing/steam/hsk.jpeg"
                      alt=""
                      className="w-full h-1/3 object-contain"
                    />
                  </div>
                  <div className="h-1/2 border-b-[#4D4D4D] border-2 border-x-0 border-t-0 text-center">
                    <p className="text-[#4D4D4D] font-bold">HSK (China)</p>
                  </div>
                  <p className="text-xs text-[#4D4D4D] mt-3 text-center">
                    Level 1 - Level 5
                  </p>
                </div>
                <div className="bg-white px-8 py-6 rounded-lg h-72 shadow-lg">
                  <div className="relative w-full h-1/3">
                    <Image
                      layout="fill"
                      objectFit="contain"
                      src="/images/landing/steam/stanford.png"
                      alt=""
                      className="w-full h-1/3 object-contain"
                    />
                  </div>
                  <div className="h-1/2 border-b-[#4D4D4D] border-2 border-x-0 border-t-0 text-center">
                    <p className="text-[#4D4D4D] font-bold">
                      Stanford Design School (US)
                    </p>
                  </div>
                  <p className="text-xs text-[#4D4D4D] mt-3 text-center">
                    Kindergarten - Grade 5
                  </p>
                </div>
                <div className="bg-white px-8 py-6 rounded-lg h-72 shadow-lg">
                  <div className="relative w-full h-1/3">
                    <Image
                      layout="fill"
                      objectFit="contain"
                      src="/images/landing/steam/ncas.png"
                      alt=""
                      className="w-full h-1/3 object-contain"
                    />
                  </div>
                  <div className="h-1/2 border-b-[#4D4D4D] border-2 border-x-0 border-t-0 text-center">
                    <p className="text-[#4D4D4D] font-bold">
                      National Core Arts Standards (US)
                    </p>
                  </div>
                  <p className="text-xs text-[#4D4D4D] mt-3 text-center">
                    Kindergarten - Grade 5
                  </p>
                </div>
                <div className="bg-white px-8 py-6 rounded-lg h-72 shadow-lg">
                  <div className="relative w-full h-1/3">
                    <Image
                      layout="fill"
                      objectFit="contain"
                      src="/images/landing/steam/next-generation-science-standards.png"
                      alt=""
                      className="w-full h-1/3 object-contain"
                    />
                  </div>
                  <div className="h-1/2 border-b-[#4D4D4D] border-2 border-x-0 border-t-0 text-center">
                    <p className="text-[#4D4D4D] font-bold">NGSS (US)</p>
                  </div>
                  <p className="text-xs text-[#4D4D4D] mt-3 text-center">
                    Kindergarten - Grade 5
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-44 mb-32">
              <div className="flex text-center justify-center ">
                <div className="relative text-center w-full md:w-8/12 lg:w-7/12 h-24 sm:h-14">
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src="/images/landing/brush-green-2.png"
                    alt=""
                    className="absolute mx-auto text-center left-0 right-0 "
                  />
                  <p className="font-bold text-3xl xl:text-4xl 2xl:text-5xl text-center text-white z-20 absolute mx-auto left-0 right-0 top-3 md:top-3 xl:top-1 2xl:top-0 mt-1.5 sm:mt-0 xl:mt-1.5">
                    Loved By Parents and Teachers
                  </p>
                </div>
              </div>
              <div className="flex w-10/12 justify-center my-10 items-center mt-24 space-y-10 m-auto">
                <Swiper
                  pagination={pagination}
                  modules={[Pagination]}
                  spaceBetween={30}
                  slidesPerView={3}
                  loop
                  className="lg:-mx-60 lg:overflow-hidden hidden lg:block"
                >
                  <SwiperSlide>
                    {({ isNext }): React.ReactElement => (
                      <div
                        className={`rounded-lg ${
                          isNext ? "mt-10 pb-20" : "mt-20"
                        } bg-white shadow-lg text-center px-10 py-10 space-y-10 flex-1 w-full`}
                      >
                        <div
                          className={`${
                            isNext ? "w-28 h-28" : "w-24 h-24"
                          } rounded-full mx-auto -mt-20 overflow-hidden object-cover relative display-block`}
                        >
                          <Image
                            layout="fill"
                            objectFit="cover"
                            alt=""
                            src="/images/landing/testimony/vivian.webp"
                            // className={`${
                            //   isNext ? "w-28 h-28" : "w-24 h-24"
                            // } rounded-full mx-auto -mt-20 overflow-hidden object-cover`}
                          />
                        </div>
                        <p
                          className={
                            isNext
                              ? "font-bold text-rose-500"
                              : "font-bold text-pink-300"
                          }
                        >
                          Vivian (Mom), Hong Kong
                        </p>
                        <p
                          className={
                            isNext ? "text-black" : "text-gray-400 text-sm"
                          }
                        >
                          {`My daughter, Viola loved the STEM course offered by${" "}
                      ${memoTenant}. The courses were taught in forms of videos
                      and games with content tailor-made for kids. She showed
                      great initiative to complete the tasks! I was worried
                      Viola wouldn't understand some difficult phrases in
                      English, but the teachers explained it perfectly and gave
                      proper guidance.`}
                          <span className="italic font-bold">
                            {" "}
                            Now, thanks to {memoTenant}, Viola is not afraid to
                            speak English anymore!
                          </span>
                        </p>
                      </div>
                    )}
                  </SwiperSlide>
                  <SwiperSlide>
                    {({ isNext }): React.ReactElement => (
                      <div
                        className={`relative ${
                          isNext ? "mt-10 pb-20" : "mt-20"
                        } rounded-lg bg-white shadow-lg text-center px-10 py-10 space-y-10 mb-10 flex-1 w-full`}
                      >
                        <div
                          className={`${
                            isNext ? "w-28 h-28" : "w-24 h-24"
                          } rounded-full mx-auto -mt-20 overflow-hidden object-cover relative display-block`}
                        >
                          <Image
                            layout="fill"
                            objectFit="cover"
                            alt=""
                            src="/images/landing/testimony/zara.webp"
                            // className={`${
                            //   isNext ? "w-24 h-24 lg:w-28 lg:h-28" : "w-24 h-24"
                            // } rounded-full mx-auto -mt-20 overflow-hidden object-cover`}
                          />
                        </div>
                        <p
                          className={
                            isNext
                              ? "font-bold text-rose-500"
                              : "font-bold text-pink-300"
                          }
                        >
                          Zara Jane (Mom), Malaysia
                        </p>
                        <p
                          className={
                            isNext ? "text-black" : "text-gray-400 text-sm"
                          }
                        >
                          <span className="italic font-bold">
                            {
                              '"It\'s amazing, interesting, one more time! Again!"'
                            }
                          </span>{" "}
                          These are the words I heard from my 5 years old son
                          after doing the courses on reading and emotions. I see
                          his vocabulary widen extensively and his interest for
                          learning quadrupled through {memoTenant}, in just a
                          week. Perfect experience in online learning.{" "}
                          <span className="italic font-bold">
                            {
                              "Finally an engaging and interactive platform that increases a child's love for learning!"
                            }
                          </span>
                        </p>
                      </div>
                    )}
                  </SwiperSlide>
                  <SwiperSlide>
                    {({ isNext }): React.ReactElement => (
                      <div
                        className={`rounded-lg ${
                          isNext ? "mt-10 pb-20" : "mt-20"
                        } bg-white shadow-lg text-center px-10 py-10 space-y-10 flex-1 w-full`}
                      >
                        <div
                          className={`${
                            isNext ? "w-28 h-28" : "w-24 h-24"
                          } rounded-full mx-auto -mt-20 overflow-hidden object-cover relative display-block`}
                        >
                          <Image
                            layout="fill"
                            objectFit="cover"
                            alt=""
                            src="/images/landing/testimony/hilda.webp"
                            // className={`${
                            //   isNext ? "w-28 h-28" : "w-24 h-24"
                            // } rounded-full mx-auto -mt-20 overflow-hidden object-cover`}
                          />
                        </div>
                        <p
                          className={
                            isNext
                              ? "font-bold text-rose-500"
                              : "font-bold text-pink-300"
                          }
                        >
                          Hilda (Mom), Hong Kong
                        </p>
                        <p
                          className={
                            isNext ? "text-black" : "text-gray-400 text-sm"
                          }
                        >
                          I always believed that learning for kids can happen
                          anywhere and {memoTenant}{" "}
                          <span className="font-bold italic">
                            is definitely a place for where the magic of
                            learning happens.
                          </span>{" "}
                          {`Chloe has really been enjoying her time as a Novalier and
                      she especially loves ${memoTenant}'s cute characters that
                      make her learning journey particularly fun. The`}
                          <span className="font-bold italic">
                            course content and games are appropriate, fun and
                            engaging.
                          </span>{" "}
                          Chloe especially loved the yoga safari series and the
                          nova crafteria series, both of which she found super
                          fun and inspirational. Thank you, {memoTenant}!
                        </p>
                      </div>
                    )}
                  </SwiperSlide>
                </Swiper>
                <Swiper
                  pagination={pagination}
                  modules={[Pagination]}
                  spaceBetween={30}
                  slidesPerView={1}
                  loop
                  className=" overflow-hidden w-full lg:hidden"
                >
                  <SwiperSlide className="flex text-center">
                    {({ isActive }): React.ReactElement => (
                      <div
                        className={`rounded-lg ${
                          isActive ? "mt-10 pb-20" : "mt-20"
                        } bg-white shadow-lg text-center px-10 py-10 space-y-10 flex-1 w-full`}
                      >
                        <div
                          className={`${
                            isActive ? "w-24 h-24 lg:w-28 lg:h-28" : "w-24 h-24"
                          } rounded-full mx-auto -mt-20 object-cover relative`}
                        >
                          <Image
                            layout="fill"
                            objectFit="cover"
                            alt=""
                            src="/images/landing/testimony/vivian.webp"
                            className="rounded-full"
                            // className={`${
                            //   isActive ? "w-24 h-24 lg:w-28 lg:h-28" : "w-24 h-24"
                            // } rounded-full mx-auto -mt-20 object-cover`}
                          />
                        </div>
                        <p
                          className={
                            isActive
                              ? "font-bold text-rose-500"
                              : "font-bold text-pink-300"
                          }
                        >
                          Vivian (Mom), Hong Kong
                        </p>
                        <p
                          className={
                            isActive ? "text-black" : "text-gray-400 text-sm"
                          }
                        >
                          {`My daughter, Viola loved the STEM course offered by${" "}
                      ${memoTenant}. The courses were taught in forms of videos
                      and games with content tailor-made for kids. She showed
                      great initiative to complete the tasks! I was worried
                      Viola wouldn't understand some difficult phrases in
                      English, but the teachers explained it perfectly and gave
                      proper guidance.`}
                          <span className="italic font-bold">
                            {" "}
                            Now, thanks to {memoTenant}, Viola is not afraid to
                            speak English anymore!
                          </span>
                        </p>
                      </div>
                    )}
                  </SwiperSlide>
                  <SwiperSlide className="flex text-center">
                    {({ isActive }): React.ReactElement => (
                      <div
                        className={`relative ${
                          isActive ? "mt-10 pb-20" : "mt-20"
                        } rounded-lg bg-white shadow-lg text-center px-10 py-10 space-y-10 mb-10 flex-1 w-full`}
                      >
                        <div
                          className={`${
                            isActive ? "w-24 h-24 lg:w-28 lg:h-28" : "w-24 h-24"
                          } rounded-full mx-auto -mt-20 object-cover relative`}
                        >
                          <Image
                            layout="fill"
                            objectFit="cover"
                            alt=""
                            src="/images/landing/testimony/zara.webp"
                            className="rounded-full"
                            // className={`${
                            //   isActive ? "w-24 h-24 lg:w-28 lg:h-28" : "w-24 h-24"
                            // } rounded-full mx-auto -mt-20 object-cover`}
                          />
                        </div>
                        <p
                          className={
                            isActive
                              ? "font-bold text-rose-500"
                              : "font-bold text-pink-300"
                          }
                        >
                          Zara Jane (Mom), Malaysia
                        </p>
                        <p
                          className={
                            isActive ? "text-black" : "text-gray-400 text-sm"
                          }
                        >
                          <span className="italic font-bold">
                            {
                              '"It\'s amazing, interesting, one more time! Again!"'
                            }
                          </span>{" "}
                          These are the words I heard from my 5 years old son
                          after doing the courses on reading and emotions. I see
                          his vocabulary widen extensively and his interest for
                          learning quadrupled through {memoTenant}, in just a
                          week. Perfect experience in online learning.{" "}
                          <span className="italic font-bold">
                            {
                              "Finally an engaging and interactive platform that increases a child's love for learning!"
                            }
                          </span>
                        </p>
                      </div>
                    )}
                  </SwiperSlide>
                  <SwiperSlide className="flex text-center">
                    {({ isActive }): React.ReactElement => (
                      <div
                        className={`rounded-lg ${
                          isActive ? "mt-10 pb-20" : "mt-20"
                        } bg-white shadow-lg text-center px-10 py-10 space-y-10 flex-1 w-full`}
                      >
                        <div
                          className={`${
                            isActive ? "w-24 h-24 lg:w-28 lg:h-28" : "w-24 h-24"
                          } rounded-full mx-auto -mt-20 object-cover relative`}
                        >
                          <Image
                            layout="fill"
                            objectFit="cover"
                            alt=""
                            src="/images/landing/testimony/hilda.webp"
                            className="rounded-full"
                            // className={`${
                            //   isActive ? "w-24 h-24 lg:w-28 lg:h-28" : "w-24 h-24"
                            // } rounded-full mx-auto -mt-20 object-cover`}
                          />
                        </div>
                        <p
                          className={
                            isActive
                              ? "font-bold text-rose-500"
                              : "font-bold text-pink-300"
                          }
                        >
                          Hilda (Mom), Hong Kong
                        </p>
                        <p
                          className={
                            isActive ? "text-black" : "text-gray-400 text-sm"
                          }
                        >
                          I always believed that learning for kids can happen
                          anywhere and {memoTenant}{" "}
                          <span className="font-bold italic">
                            is definitely a place for where the magic of
                            learning happens.
                          </span>{" "}
                          {`Chloe has really been enjoying her time as a Novalier and
                      she especially loves ${memoTenant}'s cute characters that
                      make her learning journey particularly fun. The`}
                          <span className="font-bold italic">
                            course content and games are appropriate, fun and
                            engaging.
                          </span>{" "}
                          Chloe especially loved the yoga safari series and the
                          nova crafteria series, both of which she found super
                          fun and inspirational. Thank you, {memoTenant}!
                        </p>
                      </div>
                    )}
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </>
        )}
      </Section>
    </div>
  );
};
