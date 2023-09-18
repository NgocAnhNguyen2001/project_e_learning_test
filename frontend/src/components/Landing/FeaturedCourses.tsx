// import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

import { CourseCardProps } from "../Course/CourseCard";
import Section from "../Elements/Section";

interface IFeaturedCourses {
  courses: any;
  hostname: string | undefined;
}

export const FeaturedCourses = ({
  courses,
  hostname,
}: IFeaturedCourses): React.ReactElement => {
  const router = useRouter();
  return (
    <div className="relative bg-left-bottom bg-no-repeat bg-landing-mid">
      {/* <div className="absolute top-0 left-0 z-0 w-full h-full">
        <Image
          src="/images/landing/bg-mid.svg"
          alt=""
          layout="fill"
          objectFit="contain"
        />
      </div> */}
      <Section size="2xl" padding="sm" className="relative z-10 space-y-12">
        <p className="text-xl font-bold text-center text-white md:text-3xl">
          Explore Our Courses
        </p>
        <div className="grid grid-cols-1 gap-8 lg:gap-12 md:grid-cols-2 lg:grid-cols-3">
          {courses &&
            courses.length > 0 &&
            courses.map((course: any, index: number) => {
              if (index < 6) {
                return (
                  <div
                    onClick={(): any => {
                      router.push(`/courses/${course.id}`);
                    }}
                    key={course.id}
                    role="none"
                  >
                    <CourseCardProps
                      hostname={hostname}
                      name={course.title}
                      difficulty={course.level}
                      category={course.category}
                      thumbnail={course.thumbnail?.url}
                      duration={course.duration}
                      teacher={course.teacher}
                      className="cursor-pointer"
                    />
                  </div>
                );
              }
            })}
        </div>
      </Section>
    </div>
  );
};
