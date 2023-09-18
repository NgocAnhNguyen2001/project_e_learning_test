import { motion } from "framer-motion";
import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemState,
} from "react-accessible-accordion";
import { HiChevronUp } from "react-icons/hi";

import Section from "../Elements/Section";

interface IFAQ {
  memoTenant: string;
  tenantMail: string;
}

export const FAQ = ({ memoTenant, tenantMail }: IFAQ): React.ReactElement => {
  const contentVariants = {
    contentClosed: { height: "0px", opacity: 0 },
    contentOpen: { height: "auto" },
  };

  const buttonVariants = {
    plusClosed: { rotate: "-180deg" },
    plusOpen: { rotate: "0deg" },
  };

  // const memoTenant = React.useMemo(() => getTenant(hostname).name, [hostname]);

  return (
    <div className="relative z-10" id="faq">
      <Section size="2xl" padding="sm" className="space-y-12">
        <div className="text-center mb-16 lg:mb-32">
          <div className="relative text-center">
            <img
              src="/images/landing/brush-pink-3.png"
              alt=""
              className="absolute mx-auto text-center left-0 right-0 sm:w-1/2 h-12 sm:h-auto"
            />
            <p className="font-black text-lg md:text-xl lg:text-4xl text-center text-white z-20 absolute mx-auto left-0 right-0 top-2 md:top-3 xl:top-6 mt-1.5 sm:mt-0">
              Frequently Asked Questions
            </p>
          </div>
        </div>
        <p className="w-8/12 mx-auto text-center text-white font-bold">
          {`${memoTenant} isn't just all fun and games. We simply believe in
          celebrating the individuality of your children and then using the best
          of STEAM (Science, Technology, Engineering, the Arts and Mathematics)
          education to provide a holistic online learning base for your
          children.`}
        </p>
        <div className="flex align-center justify-center">
          <Accordion
            allowZeroExpanded
            className="border-t-2 border-[#00FFFF] w-9/12"
          >
            {[
              {
                title: `What is ${memoTenant}?`,
                content: `${memoTenant}.org is a virtual STEAM after-school learning platform for K-6 (ages 6 to 12 years old). Our aim is to empower your child to independently learn 21st-century interest-based skills through a safe, moderated online space.`,
              },
              {
                title: `How does ${memoTenant} work?`,
                content: `Children watch inspiring videos, complete quizzes, do creative hands-on challenges, and share their works with the community on ${memoTenant}. We give them excellent opportunities to teach, inspire and learn from other fellow children. Our moderators and teachers make sure ${memoTenant} remains the kindest and most encouraging online community, and they will always be available when your children have questions.`,
              },
              {
                title: `How do I learn with ${memoTenant}?`,
                content: `We currently provide courses in 8 different categories: English, Future Ready, Mandarin, Maths, Science, Technology, Art and Engineering. Students can choose the category they are interested in and enrol in a course to learn. By completing the courses, students are able to enhance their language ability, critical knowledge, and problem-solving skills.`,
              },
              {
                title: `Do I need anything special to use it?`,
                content: `Nope! ${memoTenant} courses are developed with everyday materials in mind, especially stuff commonly found around the house (and inside table drawers) like papers, pencils, glue, and  watercolour.`,
              },
              {
                title: `How much does ${memoTenant} cost?`,
                content: `In conjunction with our beta launch, ${memoTenant} is free for now!`,
              },
              {
                title: `Who are the teachers on ${memoTenant}?`,
                content: `${memoTenant} curriculum designers are IB-certified teachers with decades of experience, industry professionals, and domain experts. You can click on each teacher’s profile to find more about them!`,
              },
              {
                title: `Is your English curriculum accredited?`,
                content: `${memoTenant}’s English curriculum is systematically aligned with the international standard of the Common European Frame of Reference (CEFR). Designed for non-native students at the beginning and intermediate stages of their English learning journey. Our courses cover the CEFR A1 to CEFR B2 speaking and listening standards. Our available courses have two levels: “Beginner” which covers the CEFR A2 levels, and “Intermediate” which covers the CEFR B1 speaking and learning standards.`,
              },
              {
                title: `As a school, can I subscribe to ${memoTenant} on behalf of our students?`,
                content: `Yes, we partner with international schools, enrichment providers, and home-schoolers as a supplementary learning provider. Please email us at <a class="underline text-[#FFFF00]" href="mailto:${tenantMail}">${tenantMail}</a>  for enquiry.`,
              },
              {
                title: `Something does not work on the website, how do I report it?`,
                content: `If you find a glitch, or something went wrong, let Nadia (the green button on the bottom right corner) know, or drop us an email at <a class="underline text-[#FFFF00]" href="mailto:${tenantMail}">${tenantMail}</a>.`,
              },
              {
                title: `I have more questions. Whom should I email?`,
                content: `Drop us an email at <a class="underline text-[#FFFF00]" href="mailto:${tenantMail}">${tenantMail}</a>. We will try our best to reply to your questions within 48 hours.`,
              },
            ].map((item, index) => {
              return (
                <AccordionItem
                  className="pb-4 border-b-2 border-[#00FFFF] lg:pb-6"
                  key={index}
                >
                  <AccordionItemHeading>
                    <AccordionItemState>
                      {({ expanded }): React.ReactElement => {
                        return (
                          <AccordionItemButton className="flex items-center justify-between pt-4 text-lg font-bold text-white lg:pt-6 lg:text-xl">
                            <p className="text-[#FFFF00] text-lg font-bold">
                              {item.title}
                            </p>
                            <div className="relative flex items-center w-4 h-4 lg:w-6 lg:h-6">
                              <div className="bg-white rounded-full shadow-lg">
                                <motion.div
                                  className="text-white"
                                  animate={expanded ? "plusOpen" : "plusClosed"}
                                  variants={buttonVariants}
                                >
                                  <svg width="1em" height="1em">
                                    <linearGradient
                                      id="chevron-gradient"
                                      x1="100%"
                                      y1="100%"
                                      x2="0%"
                                      y2="0%"
                                    >
                                      <stop stopColor="#CB2880" offset="0%" />
                                      <stop stopColor="#801B7C" offset="100%" />
                                    </linearGradient>
                                    <HiChevronUp
                                      className="w-8 h-8"
                                      style={{ fill: "url(#chevron-gradient)" }}
                                    />
                                  </svg>
                                </motion.div>
                              </div>
                            </div>
                          </AccordionItemButton>
                        );
                      }}
                    </AccordionItemState>
                  </AccordionItemHeading>
                  <AccordionItemState>
                    {({ expanded }): React.ReactElement => {
                      return (
                        <motion.div
                          className="overflow-hidden text-white"
                          variants={contentVariants}
                          animate={expanded ? "contentOpen" : "contentClosed"}
                        >
                          <div
                            dangerouslySetInnerHTML={{ __html: item.content }}
                            className="pt-4 lg:pt-6 font-bold"
                          />
                        </motion.div>
                      );
                    }}
                  </AccordionItemState>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </Section>
    </div>
  );
};
