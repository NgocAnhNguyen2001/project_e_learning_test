import React from "react";

import {
  AvatarAssetCatelog,
  HairColourAvatarAsset,
  SkinColourAvatarAsset,
} from "schema/generated/graphql";

interface CatalogItemProps {
  category: string;
  subcategory: string;
  asset: AvatarAssetCatelog | HairColourAvatarAsset | SkinColourAvatarAsset;
  catalogOnClick: (
    category: string,
    subcategory: string,
    asset: AvatarAssetCatelog | HairColourAvatarAsset | SkinColourAvatarAsset,
  ) => void;
}

export const CatalogItem = ({
  category,
  subcategory,
  asset,
  catalogOnClick,
}: CatalogItemProps): React.ReactElement => {
  return (
    <div
      role="none"
      className={`col-span-1 rounded-2xl cursor-pointer overflow-hidden bg-[#eff2f7] w-32 h-32 xl:w-44 xl:h-44 flex items-center justify-center ${
        subcategory === "colour" || category == "skin" &&
        (asset as HairColourAvatarAsset).colour !== undefined
          ? "self-center justify-self-center"
          : ""
      }`}
      key={
        subcategory === "colour" &&
        (asset as HairColourAvatarAsset).colour !== undefined
          ? `${category}-${(asset as HairColourAvatarAsset).colour.label}`
          : (asset as AvatarAssetCatelog).label
      }
      onClick={(): void => {
        catalogOnClick(category, subcategory, asset);
      }}
    >
      <img
        src={
          subcategory === "colour" || category === "skin" &&
          (asset as HairColourAvatarAsset).colour !== undefined
            ? (asset as HairColourAvatarAsset).colour.colourImgUrl
            : (asset as AvatarAssetCatelog).imgUrl
        }
        alt=""
        className="w-4/5"
      />
    </div>
  );
};
