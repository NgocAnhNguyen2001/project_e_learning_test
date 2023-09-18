import Image from "next/image";
import React from "react";

import Section from "../Elements/Section";

interface ITeamSection {
  memoTenant?: string;
}

export const TeamSection: React.FC<ITeamSection> = (
  props,
): React.ReactElement => {
  const { memoTenant } = props;

  return (
    <div className="relative z-10 -mt-60 pb-0 mb-12">
      <Section size="2xl" padding="sm" className="relative z-10">
        <div className="flex flex-col space-x-5 items-center">
          <div className="w-full">
            <div className="relative text-center mt-16 w-full h-20">
              <div>
                <Image
                  layout="fill"
                  objectFit="contain"
                  src="/images/landing/brush-green-3.png"
                  alt=""
                  className="absolute mx-auto text-center left-0 right-0 w-10/12 md:w-8/12 lg:w-4/12"
                />
              </div>
              <p className="font-bold text-4xl text-center text-white z-20 absolute mx-auto left-0 right-0 top-6 md:top-4">
                Meet Our Team
              </p>
            </div>
          </div>
          <div className="w-full mt-44">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
              <div className="text-center">
                <div className="bg-gradient-to-b from-[#D1BA3E] to-[#CB8332] p-2 rounded-full flex justify-center text-center aspect-square w-52 mx-auto">
                  <div className="relative rounded-full mx-auto w-full">
                    <Image
                      layout="fill"
                      objectFit="contain"
                      src="/images/landing/team/carrie.webp"
                      alt=""
                      className="rounded-full mx-auto"
                    />
                  </div>
                </div>
                <p className="uppercase text-2xl font-extrabold text-[#8000A3] mt-2">
                  Carrie Di
                </p>
                <p className="text-[#612D87] font-bold text-xl">
                  English Curriculum Designer
                </p>
                <p className="mt-2 font-bold text-xl">
                  Carrie Di brings over a decade and a half of EAL teaching
                  experience. She is focused on keeping kids engaged in the
                  curriculum to ensure long-lasting engagement.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-b from-[#C31D80] to-[#C31D80] p-2 rounded-full flex justify-center text-center aspect-square w-52 mx-auto">
                  <div className="relative rounded-full mx-auto w-full">
                    <Image
                      layout="fill"
                      objectFit="contain"
                      src="/images/landing/team/luo.webp"
                      alt=""
                      className="rounded-full mx-auto"
                    />
                  </div>
                </div>
                <p className="uppercase text-2xl font-extrabold text-[#8000A3] mt-2">
                  Luo Lynn
                </p>
                <p className="text-[#612D87] font-bold text-xl">
                  Mandarin Curriculum Designer
                </p>
                <p className="mt-2 font-bold text-xl">
                  Luo has been teaching Mandarin to non-native speakers for 15
                  years, and is experienced in creating Chinese teaching
                  courses. She is well-versed in teaching and ensures that all
                  her courses align with HSK standards.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-b from-[#95BF51] to-[#4FA382] p-2 rounded-full flex justify-center text-center aspect-square w-52 mx-auto">
                  <div className="relative rounded-full mx-auto w-full">
                    <Image
                      layout="fill"
                      objectFit="contain"
                      src="/images/landing/team/addie.webp"
                      alt=""
                      className="rounded-full mx-auto"
                    />
                  </div>
                </div>
                <p className="uppercase text-2xl font-extrabold text-[#8000A3] mt-2">
                  Addie Loy
                </p>
                <p className="text-[#612D87] font-bold text-xl">
                  Curriculum Advisor
                </p>
                <p className="mt-2 font-bold text-xl">
                  {`With over 18 years experience in international schools, Addie
                  has a comprehensive understanding of curricula around the
                  world, making her the perfect person to lead ${memoTenant}'s
                  curriculum.`}
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-b from-[#3D639A] to-[#5D37A7] p-2 rounded-full flex justify-center text-center aspect-square w-52 mx-auto">
                  <div className="relative rounded-full mx-auto w-full">
                    <Image
                      layout="fill"
                      objectFit="contain"
                      src="/images/landing/team/james.webp"
                      alt=""
                      className="rounded-full mx-auto"
                    />
                  </div>
                </div>
                <p className="uppercase text-2xl font-extrabold text-[#8000A3] mt-2">
                  James Simpson
                </p>
                <p className="text-[#612D87] font-bold text-xl">
                  Curriculum Designer
                </p>
                <p className="mt-2 font-bold text-xl">
                  James is a highly-accomplished professional in the educational
                  space. He co-founded several STEM education programmes, and
                  works to bridge the gap between digital and physical learning
                  experiences as part of the {memoTenant} team.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-b from-[#6CAE79] to-[#469C88] p-2 rounded-full flex justify-center text-center aspect-square w-52 mx-auto">
                  <div className="relative rounded-full mx-auto w-full">
                    <Image
                      layout="fill"
                      objectFit="contain"
                      src="/images/landing/team/jennifer.webp"
                      alt=""
                      className="rounded-full mx-auto"
                    />
                  </div>
                </div>
                <p className="uppercase text-2xl font-extrabold text-[#8000A3] mt-2">
                  Jennifer Nicklas
                </p>
                <p className="text-[#612D87] font-bold text-xl">
                  Arts Curriculum Designer
                </p>
                <p className="mt-2 font-bold text-xl">
                  {`Holding a master's in Art Education and a bachelor's in
                  Education, Jennifer is recognized internationally for her
                  expertise in arts education. She brings that knowledge to
                  extra-curricular learning at ${memoTenant}.`}
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-b from-[#CB8334] to-[#D4CE43] p-2 rounded-full flex justify-center text-center aspect-square w-52 mx-auto">
                  <div className="relative rounded-full mx-auto w-full">
                    <Image
                      layout="fill"
                      objectFit="contain"
                      src="/images/landing/team/diya.webp"
                      alt=""
                      className="rounded-full mx-auto"
                    />
                  </div>
                </div>
                <p className="uppercase text-2xl font-extrabold text-[#8000A3] mt-2">
                  Diya Vivek
                </p>
                <p className="text-[#612D87] font-bold text-xl">
                  Science Curriculum Designer
                </p>
                <p className="mt-2 font-bold text-xl">
                  Diya graduated with a Bachelor’s degree in Psychology and B.Ed
                  in Early Childhood Education. Her experience in teaching
                  primary years combined with her creative flair brings an edge
                  to the Science curriculum at {memoTenant}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};
