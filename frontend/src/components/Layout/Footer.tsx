import clsx from "clsx";
import Link from "next/link";
import React from "react";

import { Divider } from "../Elements/Divider";
import Section from "../Elements/Section";

const menuItems = [
  {
    title: "Course Catalog",
    url: "/courses",
  },
  {
    title: "Guidelines",
    url: "/community-guidelines",
  },
  {
    title: "Terms",
    url: "/terms",
  },
  {
    title: "Privacy",
    url: "/privacy",
  },
  {
    title: "News",
    url: "https://medium.com/@novalearnorg",
    external: true,
  },
  {
    title: "Facebook",
    url: "https://www.facebook.com/novalearnorg/",
    external: true,
  },
  {
    title: "Instagram",
    url: "https://www.instagram.com/novalearnorg/?hl=en",
    external: true,
  },
  {
    title: "LinkedIn",
    url: "https://www.linkedin.com/company/novalearnorg/?originalSubdomain=hk",
    external: true,
  },
];

interface IFooter {
  darkLayout?: boolean;
}

const Footer = ({ darkLayout }: IFooter): React.ReactElement => {
  return (
    <div className="w-full px-6 pt-32 pb-12 lg:pt-48 lg:px-0">
      <Section size="2xl" padding="none">
        <Divider />
        <div className="grid grid-cols-3 gap-4 pt-12 mx-auto lg:flex lg:justify-between lg:w-10/12">
          {menuItems.map((item, index) => {
            if (item.external) {
              return (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p
                    className={clsx(
                      "uppercase cursor-pointer front-bold opacity-60 hover:opacity-100 transition duration-150 ease-in-out",
                      darkLayout ? "text-white" : "text-gray-400",
                    )}
                  >
                    {item.title}
                  </p>
                </a>
              );
            } else {
              return (
                <Link key={index} href={item.url} passHref>
                  <p
                    className={clsx(
                      "uppercase cursor-pointer front-bold opacity-60 hover:opacity-100 transition duration-150 ease-in-out",
                      darkLayout ? "text-white" : "text-gray-400",
                    )}
                  >
                    {item.title}
                  </p>
                </Link>
              );
            }
          })}
        </div>
      </Section>
    </div>
  );
};

export default Footer;
