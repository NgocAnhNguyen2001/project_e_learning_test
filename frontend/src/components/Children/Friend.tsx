import Link from "next/link";
import * as React from "react";

interface IFriendProps {
  friend: any;
  className: string;
}

export const Friend = ({
  friend,
  className,
}: IFriendProps): React.ReactElement => {
  return (
    <Link passHref href={`/student/profile/${friend.id}`}>
      <div className={`flex flex-row items-center cursor-pointer ${className}`}>
        <div className="flex items-center justify-center w-1/6 mr-4 overflow-hidden border-2 border-gray-300 rounded-full aspect-square">
          <img
            src={
              friend.avatarImage
                ? friend.avatarImage.url
                : "/images/common/default.png"
            }
            alt="avatar"
            className="bg-white"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <h1 className="text-sm font-extrabold lg:text-base">
            {friend.user.firstName}
          </h1>
          {/* <div className="flex flex-row items-center pb-3">
            <img
              src="/images/profile/pirate-club.svg"
              alt=""
              className="mr-3"
            />
            <p className="text-sm opacity-80 lg:text-base">Pirate Club</p>
          </div> */}
        </div>
      </div>
    </Link>
  );
};

export default Friend;
