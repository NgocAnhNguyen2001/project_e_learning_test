import React from "react";

import { Button } from "../Elements";

interface IStoreCardProps {
  item: any;
  key?: number;
}

const StoreCard = ({ item, key }: IStoreCardProps): React.ReactElement => {
  return (
    <div
      // style={{
      //   backgroundImage:
      //     "radial-gradient(101.71% 101.71% at 50% -1.71%, #A62DFF 5.11%, rgba(166, 45, 255, 0) 100%)",
      // }}
      key={key}
      className={`border-4 border-gray-300 border-opacity-40 bg-top rounded-3xl px-4 pb-4 pt-12`}
    >
      <div className="flex justify-center h-[72px] lg:h-[144px]">
        <img
          src="/images/dashboard/gear.png"
          alt=""
          className="aspect-square"
        />
      </div>
      <div className="flex flex-col items-center text-center text-white">
        {/* <div className="px-8 py-4 mt-6 border-2 border-white rounded-full">
          <p className="font-bold uppercase">Chinese new year</p>
        </div> */}
        <div className="flex items-center mt-6 space-x-2">
          <img src="/images/dashboard/gear.png" className="w-8" alt="" />
          <p className="text-xl">{item.name}</p>
        </div>
        <p className="pt-6 opacity-80">
          {
            "Lion dance mimic a lion's movements in a lion costume to bring good luck and fortune."
          }
        </p>
      </div>
      <div className="flex flex-col">
        <Button className="mt-6">{item.hardPrice}</Button>
        <Button className="mt-2">{item.softPrice}</Button>
      </div>
    </div>
  );
};

export default StoreCard;
