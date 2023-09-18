import { motion } from "framer-motion";
import NextLink from "next/link";
import React from "react";

import { IconLogo } from "@/components/Elements/Icons";

// interface NavigationProps {
//   children?: React.ReactNode;
// }

const Logo = (): React.ReactElement => {
  return (
    <NextLink href="/">
      <a className="flex items-center">
        <div className="w-48">
          <IconLogo />
        </div>
        {/* <Image src="/images/logo.svg" width="165" height="32" /> */}
        {/* <img className="h-6 lg:h-8" src="/images/logo.svg" /> */}
      </a>
    </NextLink>
  );
};

export const Navigation = (): React.ReactElement => {
  const navigationItems = [
    { name: "About", to: "/about" },
    { name: "Services", to: "/" },
    { name: "Industries", to: "/" },
    { name: "Case Studies", to: "/case-studies" },
    { name: "Thoughts", to: "/" },
    { name: "Careers", to: "/careers" },
    { name: "Contact", to: "/contact-us" },
  ];

  return (
    <div className="w-full">
      <div className="container z-30 px-6 py-6 mx-auto lg:py-12 lg:px-8">
        <motion.div className="flex text-white">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }}>
            <Logo />
          </motion.div>
          <div className="hidden ml-auto space-x-8 lg:flex">
            {navigationItems.map((navigationItem, index) => (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1.1 }}
                className="text-xl cursor-pointer"
                key={index}
              >
                <NextLink href={navigationItem.to}>
                  {navigationItem.name}
                </NextLink>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Navigation;
