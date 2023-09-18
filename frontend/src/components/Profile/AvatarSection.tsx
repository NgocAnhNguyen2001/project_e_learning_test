import React from "react";
import { Progressbar } from "../Elements/Progressbar";

type Props = {
  profileData: any;
};

export const AvatarSection: React.FC<Props> = (props) => {
  const { profileData } = props;
  return (
    <div className="w-full">
      <div className="relative flex self-center justify-center">
        <img
          src={profileData.avatarImage?.url ?? "/images/common/default.png"}
          alt=""
          className="absolute bottom-0 left-0 right-0 ml-auto mr-auto w-64 sm:w-96"
        />
        <img
          src="/images/profile/avatar-stage.svg"
          alt=""
          className="h-24 w-3/5 sm:w-4/5 mb-1 lg:mb-4"
        />
      </div>
      <div className="flex flex-row items-center w-full gap-x-2 font-extrabold text-[#4F00B1]">
        <img src="/images/dashboard/exp.png" alt="" className="w-5 mr-1" />
        Lv.{Math.floor(profileData.EXP / 1000) + 1}
        <Progressbar
          percent={(profileData.EXP % 1000) / 10}
          // percent={(profileData.EXP % 1000) / 10}
          barColorClassName="bg-gradient-to-r from-[#20B5FF] via-[#88D3F7] to-[#20B5FF]"
          customColor="#20B5FF"
          className="w-full"
        />
        <p className="text-md font-semibold opacity-80 flex text-[#9B26B6]">
          {profileData.EXP}
          <p className="text-md opacity-80 ml-1">EXP</p>
        </p>
      </div>
    </div>
  );
};
