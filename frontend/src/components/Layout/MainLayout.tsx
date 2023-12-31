// import { Dialog, Transition } from "@headlessui/react";
// import clsx from "clsx";
// import { default as NextLink } from "next/link";
import * as React from "react";
// import { HiOutlineFolder, HiOutlineHome, HiOutlineX } from "react-icons/hi";

import { Navigation } from ".";
// import { useAuth } from "@/lib/auth";
// import { useAuthorization, ROLES } from "@/lib/authorization";

// type SideNavigationItem = {
//   name: string;
//   to: string;
//   icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
// };

// const SideNavigation = () => {
//   // const { checkAccess } = useAuthorization();
//   const navigation = [
//     { name: "Dashboard", to: ".", icon: HiOutlineHome },
//     { name: "Discussions", to: "./discussions", icon: HiOutlineFolder },
//     // checkAccess({ allowedRoles: [ROLES.ADMIN] }) && {
//     //   name: "Users",
//     //   to: "./users",
//     //   icon: HiOutlineUsers,
//     // },
//   ].filter(Boolean) as SideNavigationItem[];

//   return (
//     <>
//       {navigation.map((item) => (
//         <NextLink
//           // TODO What is end for?
//           // end={index === 0}
//           key={item.name}
//           href={item.to}
//         >
//           <a
//             className={clsx(
//               "text-gray-300 hover:bg-gray-700 hover:text-white",
//               "group flex items-center px-2 py-2 text-base font-medium rounded-md",
//             )}
//             // TODO https://gist.github.com/remy/0dde38897d6d660f0b63867c2344fb59#gistcomment-3714984
//             // activeClassName="bg-gray-900 text-white"
//           >
//             <item.icon
//               className={clsx(
//                 "text-gray-400 group-hover:text-gray-300",
//                 "mr-4 flex-shrink-0 h-6 w-6",
//               )}
//               aria-hidden="true"
//             />
//             {item.name}
//           </a>
//         </NextLink>
//       ))}
//     </>
//   );
// };

// type UserNavigationItem = {
//   name: string;
//   to: string;
//   onClick?: () => void;
// };

// const UserNavigation = () => {
//   // const { logout } = useAuth();

//   const userNavigation = [
//     { name: "Your Profile", to: "./profile" },
//     {
//       name: "Sign out",
//       to: "",
//       // onClick: () => {
//       //   logout();
//       // },
//     },
//   ].filter(Boolean) as UserNavigationItem[];

//   return (
//     <Menu as="div" className="relative ml-3">
//       {({ open }) => (
//         <>
//           <div>
//             <Menu.Button className="flex items-center max-w-xs p-2 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//               <span className="sr-only">Open user menu</span>
//               <HiOutlineUser className="w-8 h-8 rounded-full" />
//             </Menu.Button>
//           </div>
//           <Transition
//             show={open}
//             as={React.Fragment}
//             enter="transition ease-out duration-100"
//             enterFrom="transform opacity-0 scale-95"
//             enterTo="transform opacity-100 scale-100"
//             leave="transition ease-in duration-75"
//             leaveFrom="transform opacity-100 scale-100"
//             leaveTo="transform opacity-0 scale-95"
//           >
//             <Menu.Items
//               static
//               className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
//             >
//               {userNavigation.map((item) => (
//                 <Menu.Item key={item.name}>
//                   {({ active }) => (
//                     <a
//                       onClick={item.onClick}
//                       href={item.to}
//                       className={clsx(
//                         active ? "bg-gray-100" : "",
//                         "block px-4 py-2 text-sm text-gray-700",
//                       )}
//                     >
//                       {item.name}
//                     </a>
//                   )}
//                 </Menu.Item>
//               ))}
//             </Menu.Items>
//           </Transition>
//         </>
//       )}
//     </Menu>
//   );
// };

// type MobileSidebarProps = {
//   sidebarOpen: boolean;
//   setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
// };

// const MobileSidebar = ({ sidebarOpen, setSidebarOpen }: MobileSidebarProps) => {
//   return (
//     <Transition.Root show={sidebarOpen} as={React.Fragment}>
//       <Dialog
//         as="div"
//         static
//         className="fixed inset-0 z-40 flex md:hidden"
//         open={sidebarOpen}
//         onClose={setSidebarOpen}
//       >
//         <Transition.Child
//           as={React.Fragment}
//           enter="transition-opacity ease-linear duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="transition-opacity ease-linear duration-300"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
//         </Transition.Child>
//         <Transition.Child
//           as={React.Fragment}
//           enter="transition ease-in-out duration-300 transform"
//           enterFrom="-translate-x-full"
//           enterTo="translate-x-0"
//           leave="transition ease-in-out duration-300 transform"
//           leaveFrom="translate-x-0"
//           leaveTo="-translate-x-full"
//         >
//           <div className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-gray-800">
//             <Transition.Child
//               as={React.Fragment}
//               enter="ease-in-out duration-300"
//               enterFrom="opacity-0"
//               enterTo="opacity-100"
//               leave="ease-in-out duration-300"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <div className="absolute top-0 right-0 pt-2 -mr-12">
//                 <button
//                   className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//                   onClick={() => setSidebarOpen(false)}
//                 >
//                   <span className="sr-only">Close sidebar</span>
//                   <HiOutlineX
//                     className="w-6 h-6 text-white"
//                     aria-hidden="true"
//                   />
//                 </button>
//               </div>
//             </Transition.Child>
//             <div className="flex items-center flex-shrink-0 px-4">
//               {/* <Logo /> */}
//             </div>
//             <div className="flex-1 h-0 mt-5 overflow-y-auto">
//               <nav className="px-2 space-y-1">
//                 <SideNavigation />
//               </nav>
//             </div>
//           </div>
//         </Transition.Child>
//         <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
//       </Dialog>
//     </Transition.Root>
//   );
// };

// const Sidebar = () => {
//   return (
//     <div className="hidden md:flex md:flex-shrink-0">
//       <div className="flex flex-col w-64">
//         <div className="flex flex-col flex-1 h-0">
//           <div className="flex items-center flex-shrink-0 h-16 px-4 bg-gray-900">
//             <Logo />
//           </div>
//           <div className="flex flex-col flex-1 overflow-y-auto">
//             <nav className="flex-1 px-2 py-4 space-y-1 bg-gray-800">
//               <SideNavigation />
//             </nav>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Logo = () => {
//   return (
//     <NextLink href=".">
//       <a className="flex items-center text-white">
//         {/* <img className="w-auto h-8" src={logo} alt="Workflow" /> */}
//         <span className="text-xl font-semibold text-white">
//           Mindworks Next.js
//         </span>
//       </a>
//     </NextLink>
//   );
// };

type MainLayoutProps = {
  children: React.ReactNode;
  textColor?: string;
};

export const MainLayout = ({
  children,
  textColor = "text-black",
}: MainLayoutProps): React.ReactElement => {
  // const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <main className="relative flex-1 overflow-y-auto focus:outline-none">
          <div
            className={`absolute z-30 flex flex-shrink-0 w-full ${textColor}`}
          >
            <Navigation />
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};
