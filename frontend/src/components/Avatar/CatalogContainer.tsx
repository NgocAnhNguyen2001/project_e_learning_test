import React from "react";

import { CatalogMenu, CatalogMenuProps } from "./CatalogMenu";
import { SubCatalogMenu, SubCatalogMenuProps } from "./SubCatalogMenu";

export interface CatalogContainerProps
  extends SubCatalogMenuProps,
    CatalogMenuProps {
  isSubcategory: boolean;
}

export const CatalogContainer = ({
  category,
  subcategory,
  subcategoryOnChange,
  subcategoriesList,
  assetsHandler,
  catalog,
  isSubcategory,
}: CatalogContainerProps): React.ReactElement => {
  return (
    <div className="grid w-full grid-cols-2 col-span-1 gap-4 md:col-span-3 md:grid-cols-4 h-max">
      {/* Container for assets */}
      {isSubcategory ? (
        <SubCatalogMenu
          category={category}
          subcategory={subcategory}
          subcategoryOnChange={subcategoryOnChange}
          assetsHandler={assetsHandler}
          catalog={catalog}
          subcategoriesList={subcategoriesList}
        />
      ) : (
        <CatalogMenu
          category={category}
          subcategory={subcategory}
          assetsHandler={assetsHandler}
          catalog={catalog}
        />
      )}
    </div>
  );
};
