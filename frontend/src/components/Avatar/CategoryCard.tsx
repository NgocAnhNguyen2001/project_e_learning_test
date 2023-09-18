import { Tab } from "@headlessui/react";
import clsx from "clsx";
import React from "react";
import {
  GiSpiderMask,
  GiRunningShoe,
  GiPlainCircle,
  GiTShirt,
  GiArmoredPants,
  GiPilgrimHat,
  GiBeastEye,
  GiThorHammer,
  GiHummingbird,
  GiWindyStripes,
  GiBowTie,
  GiRainbowStar,
} from "react-icons/gi";
import { HiCollection } from "react-icons/hi";

import { ItemCatalogType } from "schema/generated/graphql";

interface CategoryCardProps {
  value: string;
  label: string;
  category: ItemCatalogType;
}

const Icon = (category: string): JSX.Element => {
  switch (category) {
    case "face-CHARACTER":
      return <GiSpiderMask size={36} />;
    case "shoes-CHARACTER":
      return <GiRunningShoe size={36} />;
    case "skin-CHARACTER":
      return <GiPlainCircle size={36} />;
    case "tops-CHARACTER":
      return <GiTShirt size={36} />;
    case "bottom-CHARACTER":
      return <GiArmoredPants size={36} />;
    case "head-ACCESSORY":
      return <GiPilgrimHat size={36} />;
    case "eyes-ACCESSORY":
      return <GiBeastEye size={36} />;
    case "items-ACCESSORY":
      return <GiThorHammer size={36} />;
    case "pets-ACCESSORY":
      return <GiHummingbird size={36} />;
    case "hair-CHARACTER":
      return <GiWindyStripes size={36} />;
    case "tops-ACCESSORY":
      return <GiBowTie size={36} />;
    case "face-ACCESSORY":
      return <GiRainbowStar size={36} />;
    default:
      return <HiCollection size={36} />;
  }
};

export const CategoryCard = ({
  value,
  label,
  category,
}: CategoryCardProps): React.ReactElement => {
  return (
    <Tab
      key={`${value}-${category}`}
      className={({ selected }: { selected: boolean }): string =>
        clsx(
          "transition px-4 lg:px-0 duration-200 ease-in-out inline-block text-center flex-1 tracking-wide no-underline border-2 border-b-4 rounded-3xl w-24 xl:w-32",
          selected
            ? "border-brand1-500 text-brand1-500 fill-brand1-500 hover:border-brand1-400 hover:text-brand1-400 hover:fill-brand1-400"
            : "border-white text-white fill-white opacity-30 hover:opacity-60",
        )
      }
    >
      <div className="flex flex-col items-center p-4">
        {Icon(`${value}-${category}`)}
        <p className={`mt-4 capitalize`}>{label}</p>
      </div>
    </Tab>
  );
};
