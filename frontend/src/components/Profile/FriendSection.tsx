import React from "react";
import Link from "next/link";
import Image from "next/image";
import { HiChevronLeft } from "react-icons/hi";
import { Student } from "schema/generated/graphql";

type Props = {
  friends: Student[];
  setDisplayTab: (value: "MAIN" | "FRIENDS" | "JOURNAL" | "COURSES") => void;
};

export const FriendSection: React.FC<Props> = (props) => {
  const { friends, setDisplayTab } = props;
  return (
    <div className="w-full rounded-md h-min-content">
      <div className="text-white flex flex-row justify-between py-6">
        <div onClick={(): void => setDisplayTab("MAIN")}>
          <button className="flex flex-row items-center justify-center font-sans text-sm font-extrabold uppercase text-white lg:text-base">
            <HiChevronLeft size={24} className="mr-0 md:mr-2" color="white" />
            <span>MY FRIENDS</span>
          </button>
        </div>
      </div>
      <div className="p-8 grid grid-cols-2 lg:grid-cols-3 gap-y-8 bg-[#2D0745]/70 w-full rounded-md overflow-scroll scrollbar-thin scrollbar-thumb-transparent scrollbar-thumb-rounded-md hover:scrollbar-thumb-slate-400 -scroll-m-6 h-96 sm:h-[30rem] h-min-content">
        {friends.map((friend) => (
          <div className="text-white" key={friend.id}>
            <Link href={`/student/profile/${friend.id}`}>
              <div className="cursor-pointer flex flex-col items-center justify-center">
                <div className="relative w-24 h-24 rounded-full bg-gray-400/30">
                  <Image
                    src={
                      friend.avatarImage?.url ?? "/images/common/default.png"
                    }
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    className=""
                  />
                </div>
                <p className="font-extrabold inline-block w-full text-center break-words">
                  {friend.user.firstName} {friend.user.lastName}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
