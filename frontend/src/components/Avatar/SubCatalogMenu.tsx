import React from "react";

import {
  AvatarAssetCatelog,
  HairColourAvatarAsset,
  SkinColourAvatarAsset,
} from "schema/generated/graphql";

import { AvatarTypeSelectField } from "../Form/AvatarTypeSelectField";

import { CatalogItem } from "./CatalogItem";

type Catalog = CatalogAsset[];
type CatalogAsset =
  | AvatarAssetCatelog
  | HairColourAvatarAsset
  | SkinColourAvatarAsset;

interface Header {
  label: string;
  value: string;
}

export interface SubCatalogMenuProps {
  category: string;
  subcategory: string;
  subcategoryOnChange: (subcategory: string) => void;
  assetsHandler: (
    category: string,
    subcategory: string,
    asset: CatalogAsset,
  ) => void;
  catalog: Catalog | undefined | null;
  subcategoriesList: Header[] | undefined;
}

export const SubCatalogMenu = ({
  category,
  subcategory,
  subcategoryOnChange,
  assetsHandler,
  catalog,
  subcategoriesList,
}: SubCatalogMenuProps): React.ReactElement => {
  let subCategories = subcategoriesList;

  if (category === "hair" || category === "skin") {
    subCategories = [
      ...(subCategories as Header[]),
      { value: "colour", label: "colour" },
    ];
  }

  return (
    <>
      <div className="col-span-2 md:col-span-4">
        <AvatarTypeSelectField
          onChange={subcategoryOnChange}
          options={subCategories as Header[]}
          defaultValue={null}
          fieldName="type"
          value={subcategory || ""}
        />
      </div>
      {/* Can be avatar asset[], skin colour asset[], hair colour asset[] */}
      {(catalog as Catalog).map((asset: any) => (
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
