import Image from "next/image";
import React from "react";

import Section from "../Elements/Section";

const uniques: any[] = [
  {
    imgUrl: "/images/landing/diverse_education.png",
    title: "Diverse Education",
    description:
      "Every kid has unique interests, personal strengths, and goals.That is why we offer everything from language and academic courses to tech acquisition and life skills.",
  },
  {
    imgUrl: "/images/landing/professionalism.png",
    title: "Professionalism",
    description:
      "We work with International Baccalaureate certified instructors to structure our courses according to international curricula standards suitable for students ages 6 ­­­­– 12 years old.",
  },
  {
    imgUrl: "/images/landing/gamification.png",
    title: "Gamification",
    description:
      "Complete challenges, take on quizzes, design avatars and upload work. All our STEAM learning programs are infused with excitement, fun and energy to encourage students to remain engaged.",
  },
  {
    imgUrl: "/images/landing/security.png",
    title: "Security",
    description:
      "Your kid's safety is our number one priority. That's why we've taken all necessary safety precautions by protecting anonymity, creating an ad-free space, and moderations by our team.",
  },
];

interface IUniqueSection {
  memoTenant: string;
}

export const UniqueSection = ({
  memoTenant,
}: IUniqueSection): React.ReactElement => {
  return (
    <div className="relative z-10">
      <Section size="2xl" padding="sm" className="relative z-10">
        <div className="flex justify-center text-center mb-2 xl:mb-12">
          <div className="relative text-center w-full md:w-9/12 lg:w-8/12 xl:w-2/3 h-24 sm:h-16">
            <Image
              layout="fill"
              objectFit="cover"
              src="/images/landing/brush-yellow.png"
              alt=""
              className="absolute mx-auto text-center left-0 right-0 w-full md:w-9/12 lg:w-9/12"
            />
            <p className="font-black text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-center text-[#4E2880] z-20 absolute mx-auto left-0 right-0 top-5 sm:top-4 xl:top-3 mt-2 sm:mt-0">
              What makes {memoTenant.split(" ")[0]} Unique?
            </p>
          </div>
        </div>
        <p className="text-center text-lg lg:text-2xl mb-10 mx-0 lg:mx-20 font-bold">
          The various steam learning solutions available online can make it
          difficult to pick out the best option for your kids. Here are the main
          reasons parents and teachers use our STEAM online curriculum courses
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-7 gap-y-7">
          {uniques.map((unique: any, index: number) => {
            return (
              <div key={index} className="text-center mx-auto space-y-5">
                <div className="relative text-center mx-auto w-32 h-32">
                  <Image
                    layout="fill"
                    objectFit="contain"
                    src={unique.imgUrl}
                    alt=""
                    className="mx-auto w-full"
                  />
                </div>
                <p className="text-[#FF0080] font-black text-xl">
                  {unique.title.toUpperCase()}
                </p>
                <p className="font-bold">{unique.description}</p>
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
};
