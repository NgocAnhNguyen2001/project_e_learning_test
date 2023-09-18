/* eslint-disable @next/next/no-html-link-for-pages */
import { Disclosure, Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { FaUserGraduate, FaUserTie } from "react-icons/fa";
import { HiMenuAlt1, HiX } from "react-icons/hi";
// import PacmanLoader from "react-spinners/PacmanLoader";

import { Props, getTenant } from "@/utils/tenant";
import {
  useNotificationListAllUnreadLazyQuery,
  useNotificationListAllLazyQuery,
  useNotificationMarkAllAsReadMutation,
  Role,
} from "schema/generated/graphql";
import { useResultCallback } from "utils/hooks/useResultCallback";
import { useStore } from "utils/hooks/zustand";

import Footer from "./Footer";

interface IAppLayout {
  children?: React.ReactChild | React.ReactChild[];
  relative?: boolean;
  darkLayout?: boolean;
  noLayout?: boolean;
  noFooter?: boolean;
}

interface UserNavigation {
  name: string;
  href: string;
}

const formatProfile = (user: any): React.ReactElement => {
  switch (user.role) {
    default:
      return (
        <img
          className="object-cover w-16 h-16 mt-2"
          src="/images/avatar-placeholder.png"
          alt=""
        />
      );
    case Role.Teacher:
      {
        if (!user?.teacher?.photo?.url) return <FaUserGraduate size={16} />;
        return (
          <img
            className="object-cover w-16 h-16 mt-2"
            src={user?.teacher?.photo?.url}
            alt=""
          />
        );
      }
      break;
    case Role.Student:
      return (
        <img
          className="object-cover w-16 h-16 mt-2"
          src={user?.student?.avatarImage?.url || "/images/common/default.png"}
          alt=""
          // data-tut="reactour__12"
        />
      );
    case Role.Parent:
      return (
        <div className="">
          <FaUserTie size={16} />
        </div>
      );
  }
};

const checkPathSimilar = (a: string, b: string): boolean => {
  const names = a.split("/");
  const targetPath = b.split("/");
  for (const index in targetPath) {
    const current = names[index];
    const targetName = targetPath[index];
    if (/^\[.+\]$/.test(current)) continue;
    if (current !== targetName) return false;
  }
  return true;
};

export const LandingAppLayout = ({
  children,
  relative,
  darkLayout,
  noFooter,
  hostname,
}: IAppLayout & Props): React.ReactElement => {
  const router = useRouter();
  const logout = useStore((state) => state.logout);
  // const loading = useStore((state) => state.loading);
  const authUser = useStore((state) => state.user);
  const setScrollRef = useStore((state) => state.setScrollRef);
  const memoTenant = React.useMemo(() => getTenant(hostname), [hostname]);

  const [user, setUser] = React.useState<any>(null);
  const [userNavigation, setUserNavigation] = React.useState<UserNavigation[]>(
    [],
  );
  const [notificationList, setNotificationList] = React.useState<any>([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [getNotificationResponse, notificationResponse] =
    useNotificationListAllLazyQuery();
  const [getUnreadNotification, unreadNotification] =
    useNotificationListAllUnreadLazyQuery();
  const [notificationMarkAllAsRead] = useNotificationMarkAllAsReadMutation();

  const buttonVariants = {
    plusClosed: { rotate: "0deg" },
    plusOpen: { rotate: "90deg" },
  };

  const signout = (): void => {
    logout();
    router.push("/");
  };

  React.useEffect(() => {
    if (authUser) {
      setUser(authUser);
    }
  }, [authUser]);

  const noAuthNav = [
    // {
    //   name: "Schools or Teachers",
    //   href: "#",
    // },
    // {
    //   name: "f.a.q.",
    //   href: "#",
    // },
    // {
    //   name: "Blog",
    //   href: "#",
    // },
    {
      name: "About",
      // icon: <HiBadgeCheck size="32" />,
      href: "/about",
    },
    {
      name: "Adult Login",
      href: "/auth/login?type=adult",
    },
    {
      name: "Student Login",
      // icon: <HiBadgeCheck size="32" />,
      href: "/auth/login?type=student",
    },
    {
      name: "Navigator Login",
      // icon: <HiBadgeCheck size="32" />,
      href: "/navigator/auth/login",
    },
  ];

  const noAuthNavMobile = [
    {
      name: "Home",
      // icon: <HiBadgeCheck size="32" />,
      href: "/",
    },
    // {
    //     name: "Categories",
    //     // icon: <HiBadgeCheck size="32" />,
    //     href: "/",
    // },
    // {
    //     name: "Projects and Challenges",
    //     // icon: <HiBadgeCheck size="32" />,
    //     href: "/",
    // },
    // {
    //     name: "FAQ",
    //     // icon: <HiBadgeCheck size="32" />,
    //     href: "/",
    // },
    {
      name: "About",
      // icon: <HiBadgeCheck size="32" />,
      href: "/about",
    },
    {
      name: "Adult Login",
      // icon: <HiBadgeCheck size="32" />,
      href: "/auth/login?type=adult",
    },
    {
      name: "Student Login",
      // icon: <HiBadgeCheck size="32" />,
      href: "/auth/login?type=student",
    },
    {
      name: "Navigator Login",
      // icon: <HiBadgeCheck size="32" />,
      href: "/navigator/auth/login",
    },
  ];

  const [navigation, setNavigation] = React.useState<any[]>(noAuthNav);

  const adultNavigation = [
    {
      name: "Home",
      href: "/adult/home",
      dataTut: "parent_tour_2",
      icon: (
        <div>
          <img
            src="/images/navbar/home.svg"
            alt=""
            className="w-10 transition duration-300 ease-in-out group-hover:hidden"
          />
          <img
            src="/images/navbar/home-active.svg"
            alt=""
            className="hidden w-10 transition duration-300 ease-in-out group-hover:block"
          />
        </div>
      ),
      current: true,
    },
    // {
    //   name: "Activity",
    //   href: "#",
    //   icon: <ActivityIcon size="32" />,
    //   current: false,
    // },
    {
      name: "Reports",
      dataTut: "tour_9",
      href: "/adult/reports",
      icon: (
        <div>
          <img
            src="/images/navbar/report.svg"
            alt=""
            className="w-10 transition duration-300 ease-in-out group-hover:hidden"
          />
          <img
            src="/images/navbar/report-active.svg"
            alt=""
            className="hidden w-10 transition duration-300 ease-in-out group-hover:block"
          />
        </div>
      ),
      current: false,
    },
    {
      name: "Children",
      href: `/adult/profile/${user?.id}/children`,
      dataTut: "tour_10",
      icon: (
        <div>
          <img
            src="/images/navbar/child.svg"
            alt=""
            className="w-10 transition duration-300 ease-in-out group-hover:hidden"
          />
          <img
            src="/images/navbar/child-active.svg"
            alt=""
            className="hidden w-10 transition duration-300 ease-in-out group-hover:block"
          />
        </div>
      ),
      current: false,
    },
    {
      name: "Courses",
      href: "/adult/courses",
      dataTut: "tour_12",
      icon: (
        <div>
          <img
            src="/images/navbar/courses.svg"
            alt=""
            className="w-10 transition duration-300 ease-in-out group-hover:hidden"
          />
          <img
            src="/images/navbar/courses-active.svg"
            alt=""
            className="hidden w-10 transition duration-300 ease-in-out group-hover:block"
          />
        </div>
      ),
      current: false,
    },
    // {
    //   name: "Shop",
    //   href: "/avatar-store",
    //   icon: <ShopIcon size="32" />,
    //   current: false,
    // },
    // {
    //   name: "Billing",
    //   href: "/adult/billing",
    //   dataTut: "tour_13",
    //   icon: (
    //     <div>
    //       <img
    //         src="/images/navbar/billing.svg"
    //         alt=""
    //         className="w-10 transition duration-300 ease-in-out group-hover:hidden"
    //       />
    //       <img
    //         src="/images/navbar/billing-active.svg"
    //         alt=""
    //         className="hidden w-10 transition duration-300 ease-in-out group-hover:block"
    //       />
    //     </div>
    //   ),
    //   current: false,
    // },
  ];

  const navigatorNavigation = [
    {
      name: "Home",
      href: "/navigator/home",
      dataTut: "navigator_tour_2",
      icon: (
        <div>
          <img
            src="/images/navbar/home.svg"
            alt=""
            className="w-10 transition duration-300 ease-in-out group-hover:hidden"
          />
          <img
            src="/images/navbar/home-active.svg"
            alt=""
            className="hidden w-10 transition duration-300 ease-in-out group-hover:block"
          />
        </div>
      ),
      current: true,
    },
    {
      name: "Courses",
      href: "/navigator/my-courses",
      dataTut: "navigator_tour_4",
      icon: (
        <div>
          <img
            src="/images/navbar/my-courses.svg"
            alt=""
            className="w-10 transition duration-300 ease-in-out group-hover:hidden"
          />
          <img
            src="/images/navbar/my-courses-active.svg"
            alt=""
            className="hidden w-10 transition duration-300 ease-in-out group-hover:block"
          />
        </div>
      ),
      current: false,
    },
    {
      name: "Reports",
      href: `/navigator/reports`,
      dataTut: "navigator_tour_80",
      icon: (
        <div>
          <img
            src="/images/navbar/report.svg"
            alt=""
            className="w-10 transition duration-300 ease-in-out group-hover:hidden"
          />
          <img
            src="/images/navbar/report-active.svg"
            alt=""
            className="hidden w-10 transition duration-300 ease-in-out group-hover:block"
          />
        </div>
      ),
      current: false,
    },
    {
      name: "Profile",
      href: `/navigator/profile/${user?.id}`,
      dataTut: "navigator_tour_81",
      icon: (
        <div>
          <img
            src="/images/navbar/profile.svg"
            alt=""
            className="w-10 transition duration-300 ease-in-out group-hover:hidden"
          />
          <img
            src="/images/navbar/profile-active.svg"
            alt=""
            className="hidden w-10 transition duration-300 ease-in-out group-hover:block"
          />
        </div>
      ),
      current: false,
    },
    {
      name: "All Courses",
      href: "/navigator/courses",
      dataTut: "navigator_tour_83",
      icon: (
        <div>
          <img
            src="/images/navbar/courses.svg"
            alt=""
            className="w-10 transition duration-300 ease-in-out group-hover:hidden"
          />
          <img
            src="/images/navbar/courses-active.svg"
            alt=""
            className="hidden w-10 transition duration-300 ease-in-out group-hover:block"
          />
        </div>
      ),
      current: false,
    },
    {
      name: "Inbox",
      href: "/navigator/chat",
      icon: (
        <div>
          <img
            src="/images/navbar/chat.svg"
            alt=""
            className="w-12 transition duration-300 ease-in-out group-hover:hidden p-1"
          />
          <img
            src="/images/navbar/chat-active.svg"
            alt=""
            className="hidden w-12 transition duration-300 ease-in-out group-hover:block p-1"
          />
        </div>
      ),
      current: false,
    },
  ];

  const studentNavigation = [
    {
      name: "Home",
      href: "/student/home",
      // dataTut: "tour_2",
      icon: (
        <div className="flex">
          <img
            src="/images/navbar/home.svg"
            alt=""
            className="w-10 transition duration-300 ease-in-out group-hover:hidden"
          />
          <img
            src="/images/navbar/home-active.svg"
            alt=""
            className="hidden w-10 transition duration-300 ease-in-out group-hover:block"
          />
        </div>
      ),
      current: true,
    },
    {
      name: "Courses",
      href: "/student/courses",
      // dataTut: "reactour__2",
      icon: (
        <div>
          <img
            src="/images/navbar/courses.svg"
            alt=""
            className="w-10 transition duration-300 ease-in-out group-hover:hidden"
          />
          <img
            src="/images/navbar/courses-active.svg"
            alt=""
            className="hidden w-10 transition duration-300 ease-in-out group-hover:block"
          />
        </div>
      ),
      current: false,
    },
    {
      name: "Avatar",
      href: `/student/avatar`,
      dataTut: "tour_12",
      icon: (
        <div>
          <img
            src="/images/navbar/avatar.svg"
            alt=""
            className="w-10 transition duration-300 ease-in-out group-hover:hidden"
          />
          <img
            src="/images/navbar/avatar-active.svg"
            alt=""
            className="hidden w-10 transition duration-300 ease-in-out group-hover:block"
          />
        </div>
      ),
      current: false,
    },
    {
      name: "Profile",
      href: `/student/profile/${user?.id}`,
      dataTut: "tour_16",
      icon: (
        <div>
          <img
            src="/images/navbar/profile.svg"
            alt=""
            className="w-10 transition duration-300 ease-in-out group-hover:hidden"
          />
          <img
            src="/images/navbar/profile-active.svg"
            alt=""
            className="hidden w-10 transition duration-300 ease-in-out group-hover:block"
          />
        </div>
      ),
      current: false,
    },
    {
      name: "Inbox",
      href: "/student/chat",
      icon: (
        <div>
          <img
            src="/images/navbar/chat.svg"
            alt=""
            className="w-12 transition duration-300 ease-in-out group-hover:hidden p-1"
          />
          <img
            src="/images/navbar/chat-active.svg"
            alt=""
            className="hidden w-12 transition duration-300 ease-in-out group-hover:block p-1"
          />
        </div>
      ),
      current: false,
    },

    // {
    //   name: "Shop",
    //   href: "/avatar-store",
    //   icon: <ShopIcon size="32" />,
    //   current: false,
    // },
    // {
    //   name: "More",
    //   href: "#",
    //   icon: <MoreIcon size="32" />,
    //   current: false,
    // },
  ];

  React.useEffect(() => {
    if (user) {
      if (user?.role === "STUDENT") {
        setNavigation(studentNavigation);
        setIsLoggedIn(true);
      } else if (user?.role === "TEACHER") {
        setNavigation(navigatorNavigation);
        setIsLoggedIn(true);
      } else if (user?.role === "PARENT") {
        setNavigation(adultNavigation);
        setIsLoggedIn(true);
      } else {
        setNavigation(noAuthNavMobile);
        setIsLoggedIn(false);
      }

      if (user?.role === "PARENT") {
        setUserNavigation([{ name: "Settings", href: `/adult/settings` }]);
      } else {
        const tempUserProfile =
          user?.role === "STUDENT" ? "student" : "navigator";
        setUserNavigation([
          {
            name: "Your Profile",
            href: `/${tempUserProfile}/profile/${user?.id}`,
          },
          { name: "Settings", href: `/${tempUserProfile}/settings` },
        ]);
      }
    } else {
      setIsLoggedIn(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useResultCallback(
    notificationResponse,
    (notificationList) => {
      const tempNotificationList = notificationList.filter((notification) => {
        const currDate = new Date();
        const createDate = new Date(notification.createdAt);
        return Math.abs(currDate.valueOf() - createDate.valueOf()) / 36e5 < 24;
      });
      setNotificationList(tempNotificationList);
    },
    (err) => {
      console.log(err);
    },
  );

  React.useEffect(() => {
    const getNotification = async (): Promise<void> => {
      await getNotificationResponse();
      await getUnreadNotification();
    };
    if (authUser) getNotification();
  }, []);

  const markNotification = async (open: boolean): Promise<void> => {
    if (open) {
      if (
        notificationResponse.data?.notificationListAll &&
        notificationResponse.data?.notificationListAll.length
      ) {
        await notificationMarkAllAsRead().catch((err) => err);
        await getUnreadNotification();
        await getNotificationResponse();
      }
    }
  };

  return (
    <>
      <div
        className="relative min-h-screen font-raleway"
        data-tut="reactour__5"
      >
        {/* Loading state which only activates if you update the Zustand store */}
        {/* {loading ? (
          <div
            className={`absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-60 z-30`}
          >
            <div className="z-30 flex items-center justify-center w-screen h-screen">
              <PacmanLoader color={"#1CB0F6"} loading={loading} />
            </div>
          </div>
        ) : null} */}

        {/* Background color split screen for large screens */}
        {/* <div
        className="fixed top-0 left-0 w-1/2 h-full bg-white"
        aria-hidden="true"
      />
      <div
        className="fixed top-0 right-0 w-1/2 h-full bg-gray-50"
        aria-hidden="true"
      /> */}
        <div className="relative flex flex-col min-h-screen">
          {/* Navbar */}
          <Disclosure
            as="nav"
            className={`${
              relative ? "" : "absolute"
            } top-0 left-0 z-20 flex-shrink-0 w-full pt-2 bg-transparent ${
              isLoggedIn && "border-b-2 border-b-gray-300"
            } border-opacity-40`}
          >
            {({ open }): React.ReactElement => (
              <>
                <div className="container px-2 mx-auto sm:px-4 lg:px-8">
                  <div
                    className={`${
                      isLoggedIn ? "" : "pt-10"
                    } relative flex items-center justify-between h-16`}
                  >
                    {/* Logo section */}
                    {!isLoggedIn && (
                      <Link passHref href="/">
                        <div className="flex items-center px-2 lg:px-0 xl:pr-8 z-30">
                          <div
                            className={`relative w-40 h-16 flex-shrink-0 z-30`}
                          >
                            <Image
                              layout="fill"
                              objectFit="contain"
                              src={memoTenant.logo["white"]}
                              className="cursor-pointer z-10"
                              alt=""
                            />
                          </div>
                        </div>
                      </Link>
                    )}

                    {/* Links section */}
                    <div className="hidden lg:block w-10/12 space-x-10">
                      <div
                        className={`flex justify-between space-x-10 items-center w-full flex-row ml-3 text-white ${memoTenant.backgroundClasses.navbar}`}
                      >
                        {!isLoggedIn ? (
                          <>
                            <div className="flex space-x-7 flex-row justify-between w-full">
                              <Link href="/">
                                <div className="transition duration-200 ease-in-out  hover:scale-110 hover:text-orange-300 cursor-pointer p-2 sm:p-3 xl:p-8">
                                  <a className="uppercase  text-md font-bold">
                                    Home
                                  </a>
                                </div>
                              </Link>
                              <div
                                className="transition duration-200 ease-in-out  hover:scale-110 hover:text-orange-300 cursor-pointer p-2 sm:p-3 xl:p-8"
                                onClick={(): void => {
                                  setScrollRef("category");
                                  router.push("/");
                                }}
                                role="navigation"
                              >
                                <a className="cursor-pointer uppercase  text-md font-bold">
                                  Categories
                                </a>
                              </div>
                              {/* <a href="/" className="uppercase  text-md  font-bold transition duration-200 ease-in-out">
                                                                    Projects and Challenges
                                                                </a> */}
                              <div
                                className="transition duration-200 ease-in-out  hover:scale-110 hover:text-orange-300 cursor-pointer p-2 sm:p-3 xl:p-8"
                                onClick={(): void => {
                                  setScrollRef("faq");
                                  router.push("/");
                                }}
                                role="navigation"
                              >
                                <a className="cursor-pointer uppercase  text-md font-bold">
                                  Faq
                                </a>
                              </div>
                              <Link href="/about">
                                <div className="transition duration-200 ease-in-out  hover:scale-110 hover:text-orange-300 cursor-pointer p-2 sm:p-3 xl:p-8">
                                  <a className="uppercase  text-md font-bold">
                                    About
                                  </a>
                                </div>
                              </Link>
                            </div>
                            <div className="flex space-x-3">
                              <Link href="/adult/auth/signup" passHref>
                                <button className="bg-[#02A9E2] shadow-lg cursor-pointer rounded-full flex flex-row items-center justify-center mx-auto space-x-2 w-44 py-2 hover:scale-105 focus:scale-100 transition duration-200 ease-in-out disabled:cursor-not-allowed font-medium focus:outline-none">
                                  <p className="uppercase font-bold text-white">
                                    Join for free
                                  </p>
                                  <BsFillPlayCircleFill
                                    size={20}
                                    className="text-white"
                                  />
                                </button>
                              </Link>
                              <Disclosure>
                                {({ open }): React.ReactElement => (
                                  <div className="relative z-20 flex-shrink-0 ml-auto tour_15">
                                    <Disclosure.Button className="">
                                      <span className="sr-only">
                                        Open user menu
                                      </span>
                                      <button className="bg-[#C0238F] shadow-lg cursor-pointer  rounded-full flex flex-row items-center justify-center mx-auto space-x-2 w-40 py-2 hover:scale-105 focus:scale-100 transition duration-200 ease-in-out disabled:cursor-not-allowed font-medium focus:outline-none">
                                        <p className="uppercase font-bold text-white">
                                          Login
                                        </p>
                                        <motion.div
                                          className="text-white"
                                          animate={
                                            open ? "plusOpen" : "plusClosed"
                                          }
                                          variants={buttonVariants}
                                        >
                                          <BsFillPlayCircleFill
                                            size={20}
                                            className="text-white"
                                          />
                                        </motion.div>
                                      </button>
                                    </Disclosure.Button>
                                    <Transition
                                      show={open}
                                      as={Fragment}
                                      enter="transition ease-out duration-100"
                                      enterFrom="transform opacity-0 scale-95"
                                      enterTo="transform opacity-100 scale-100"
                                      leave="transition ease-in duration-75"
                                      leaveFrom="transform opacity-100 scale-100"
                                      leaveTo="transform opacity-0 scale-95"
                                    >
                                      <Disclosure.Panel className="z-40 absolute lg:right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <>
                                          {noAuthNav.map((item) => (
                                            /* eslint-disable */
                                            <a
                                              key={item.name}
                                              href={item.href}
                                              className={clsx(
                                                "tour_16 text-center font-semibold uppercase hover:bg-[#8C2B5B] hover:text-white block px-4 py-2 text-sm text-black z-40",
                                                user?.role === "TEACHER" &&
                                                  item.name == "Settings" &&
                                                  "navigator_settings",
                                                item.name == "About" &&
                                                  "lg:hidden",
                                              )}
                                            >
                                              {item.name}
                                            </a>
                                          ))}
                                        </>
                                      </Disclosure.Panel>
                                    </Transition>
                                  </div>
                                )}
                              </Disclosure>
                            </div>
                          </>
                        ) : (
                          navigation.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              data-tut={item?.dataTut ?? ""}
                              className={`${item?.dataTut ?? ""} ${
                                item.name == "about" && "lg:hidden"
                              } flex group flex-row items-center px-3 text-sm font-bold font-sans ${
                                router.pathname.includes(item.href)
                                  ? "text-brand1 fill-brand1"
                                  : darkLayout
                                  ? "text-white fill-white"
                                  : "text-gray-400 fill-gray-400"
                              } rounded-md opacity-80 hover:text-brand1 hover:fill-brand1 hover:opacity-100 transition duration-200 ease-in-out`}
                              aria-current={item.current ? "page" : undefined}
                            >
                              <span className="pr-2">{item.icon}</span>
                              <p className="uppercase">{item.name}</p>
                            </a>
                          ))
                        )}

                        {/* More Button */}
                        {/* <Me`nu as="div" className="relative flex-shrink-0">
                          {({ open }): React.ReactElement => (
                            <>
                              <div>
                                <Menu.Button className="flex flex-row items-center px-3 text-sm font-medium text-gray-400 rounded-md font-header hover:text-brand-300">
                                  <span className="pr-2">
                                    <HiMenuAlt2 size="32" />
                                  </span>
                                  <p className="">More</p>
                                </Menu.Button>
                              </div>
                              <Transition
                                show={open}
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items
                                  static
                                  className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-brand-500 ring-opacity-5 focus:outline-none"
                                >
                                  {userNavigation.map((item) => (
                                    <Menu.Item key={item.name}>
                                      {({ active }): React.ReactElement => (
                                        <a
                                          href={item.href}
                                          className={classNames(
                                            active ? "bg-gray-100" : "",
                                            "block px-4 py-2 text-sm text-gray-700",
                                          )}
                                        >
                                          {item.name}
                                        </a>
                                      )}
                                    </Menu.Item>
                                  ))}
                                  <Menu.Item key="Sign Out">
                                    {({ active }): React.ReactElement => (
                                      <a
                                        onClick={signout}
                                        className={classNames(
                                          active ? "bg-gray-100" : "",
                                          "block px-4 py-2 text-sm text-gray-700",
                                        )}
                                      >
                                        Sign Out
                                      </a>
                                    )}
                                  </Menu.Item>
                                </Menu.Items>
                              </Transition>
                            </>
                          )}
                        </Me`nu> */}
                      </div>
                    </div>

                    {/* Search section */}
                    {/* <div className="flex justify-center ml-auto">
                    <div className="w-full px-2 lg:px-6">
                      <label htmlFor="search" className="sr-only">
                        Search anything...
                      </label>
                      <div className="relative text-brand-200 focus-within:text-gray-400">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <HiSearch className="w-5 h-5" aria-hidden="true" />
                        </div>
                        <input
                          id="search"
                          name="search"
                          className="block w-full py-2 pl-10 pr-3 leading-5 bg-opacity-25 border border-transparent rounded-md text-brand-100 placeholder-brand-200 bg-brand-400 focus:outline-none focus:bg-white focus:ring-0 focus:placeholder-gray-400 focus:text-gray-900 sm:text-sm"
                          placeholder="Search anything..."
                          type="search"
                        />
                      </div>
                    </div>
                  </div> */}
                    {user && (
                      // Notification dropdown
                      <div className="flex items-center">
                        <Menu
                          as="div"
                          className="relative z-20 flex-shrink-0 ml-auto"
                        >
                          {({ open }): React.ReactElement => (
                            <>
                              <div>
                                <Menu.Button>
                                  <button
                                    onClick={(): Promise<void> =>
                                      markNotification(open)
                                    }
                                    className="tour_14"
                                  >
                                    <span className="sr-only">
                                      Open notification panel
                                    </span>
                                    <span
                                      className={`${
                                        unreadNotification.data
                                          ?.notificationListAllUnread &&
                                        unreadNotification.data
                                          ?.notificationListAllUnread.length
                                          ? "bg-red-500/75 inline-flex absolute w-3 h-3 mt-2 mr-2 rounded-full top-0 right-0 text-[8px] justify-center pb-2 text-white z-20"
                                          : "hidden"
                                      }`}
                                    >
                                      {unreadNotification.data
                                        ?.notificationListAllUnread &&
                                        unreadNotification.data
                                          ?.notificationListAllUnread.length}
                                    </span>
                                    <div className="mt-2 mr-3 transition duration-200 ease-in-out group opacity-80 hover:opacity-100">
                                      <img
                                        src="/images/navbar/inbox.svg"
                                        alt=""
                                        className="w-12 transition duration-300 ease-in-out group-hover:hidden"
                                      />
                                      <img
                                        src="/images/navbar/inbox-active.svg"
                                        alt=""
                                        className="hidden w-12 transition duration-300 ease-in-out group-hover:block"
                                      />
                                    </div>
                                  </button>
                                </Menu.Button>
                              </div>
                              <Transition
                                show={open}
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items
                                  static
                                  className="absolute p-2 mt-2 space-y-3 overflow-y-auto origin-top-right bg-white divide-y rounded-md shadow-lg lg:right-0 ring-1 ring-black ring-opacity-5 focus:outline-none max-h-96 w-60 divide-solid"
                                >
                                  {notificationList?.length > 0 ? (
                                    notificationList
                                      .slice(0, 11)
                                      .map((item: any) => (
                                        <Menu.Item key={item.notificationId}>
                                          <a
                                            href={item.notification.href}
                                            className={`cursor-pointer pt-3 p-2 first:pt-2 flex items-center space-x-2 rounded-md ${
                                              item.read ? "" : "bg-purple-300"
                                            }`}
                                          >
                                            <img
                                              alt=""
                                              src={item.notification.thumbnail}
                                            />
                                            <p className="text-sm text-gray-700">
                                              {item.notification.title}
                                            </p>
                                          </a>
                                        </Menu.Item>
                                      ))
                                  ) : (
                                    <Menu.Item>
                                      <p className="mx-auto text-center py-14 px-auto">
                                        No notifications yet!
                                      </p>
                                    </Menu.Item>
                                  )}
                                </Menu.Items>
                              </Transition>
                            </>
                          )}
                        </Menu>
                        <Disclosure>
                          {({ open }): React.ReactElement => (
                            <div className="relative z-20 flex-shrink-0 ml-auto tour_15">
                              <Disclosure.Button className="tour_15 mobile-user-menu relative flex items-center justify-center w-10 h-10 overflow-hidden text-sm text-black text-white bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-300 focus:ring-white">
                                <span className="sr-only">Open user menu</span>
                                {formatProfile(user)}
                              </Disclosure.Button>
                              <Transition
                                show={open}
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Disclosure.Panel className="absolute lg:right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  <>
                                    {userNavigation.map((item) => (
                                      /* eslint-disable */
                                      <a
                                        key={item.name}
                                        href={item.href}
                                        className={clsx(
                                          "tour_16 hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700",
                                          user?.role === "TEACHER" &&
                                            item.name == "Settings" &&
                                            "navigator_settings",
                                          item.name == "About" && "lg:hidden",
                                        )}
                                      >
                                        {item.name}
                                      </a>
                                    ))}
                                    <a
                                      onClick={signout}
                                      className="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700"
                                    >
                                      Sign Out
                                    </a>
                                  </>
                                </Disclosure.Panel>
                              </Transition>
                            </div>
                          )}
                        </Disclosure>
                      </div>
                    )}
                    <div className="flex pl-4 lg:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="mobile-menu tour_2_mobile inline-flex items-center justify-center p-2 bg-white rounded-md text-brand-400 hover:text-white hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-600 focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <HiX className="block w-6 h-6" aria-hidden="true" />
                        ) : (
                          <HiMenuAlt1
                            className="block w-6 h-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="bg-white lg:hidden z-40">
                  <div className="px-2 pt-2 pb-3 space-y-1 mt-2.5">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        id={
                          item.name == "All Courses" ? "All-Courses" : item.name
                        }
                        className="px-3 py-2 rounded-md text-base font-medium flex text-brand-200 hover:text-brand-100 hover:bg-brand-600 z-40"
                        aria-current={
                          checkPathSimilar(router.pathname, item.href)
                            ? "page"
                            : undefined
                        }
                      >
                        <p className="flex items-center font-bold uppercase">
                          {item.name}
                        </p>
                      </a>
                    ))}
                  </div>
                  {isLoggedIn && (
                    <div className="pb-3 border-t border-brand-800">
                      <div className="px-2 space-y-1">
                        {userNavigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            id={item.name}
                            className="block px-3 py-2 text-base font-bold uppercase rounded-md text-brand-200 hover:text-brand-100 hover:bg-brand-600"
                          >
                            {item.name}
                          </a>
                        ))}
                        <a
                          role="none"
                          onClick={signout}
                          className="block px-3 py-2 text-base font-bold uppercase rounded-md text-brand-200 hover:text-brand-100 hover:bg-brand-600"
                        >
                          Sign Out
                        </a>
                      </div>
                    </div>
                  )}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <div className="w-full mx-auto">{children}</div>
          {noFooter ||
            (router.pathname !== "/" && <Footer darkLayout={darkLayout} />)}
        </div>
      </div>
    </>
  );
};
