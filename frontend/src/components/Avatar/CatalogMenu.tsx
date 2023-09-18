import React from "react";

import {
  AvatarAssetCatelog,
  HairColourAvatarAsset,
  SkinColourAvatarAsset,
} from "schema/generated/graphql";

import { CatalogItem } from "./CatalogItem";

type Catalog = CatalogAsset[];
type CatalogAsset =
  | AvatarAssetCatelog
  | HairColourAvatarAsset
  | SkinColourAvatarAsset;

export interface CatalogMenuProps {
  category: string;
  subcategory: string;
  assetsHandler: (
    category: string,
    subcategory: string,
    asset: CatalogAsset,
  ) => void;
  catalog: Catalog | undefined | null;
}

export const CatalogMenu = ({
  category,
  subcategory,
  assetsHandler,
  catalog,
}: CatalogMenuProps): React.ReactElement => {
  return (
    <>
      {(catalog as Catalog)?.map((asset: any) => (
        <CatalogItem
          key={asset.label}
          category={category}
          subcategory={subcategory}
          asset={asset}
          catalogOnClick={assetsHandler}
        />
      ))}
    </>
  );
};
