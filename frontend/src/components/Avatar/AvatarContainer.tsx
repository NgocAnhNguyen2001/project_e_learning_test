import React from "react";

import Section from "../Elements/Section";
import { Title } from "../Elements/Title";

import { Avatar, AvatarProps } from "./Avatar";
import { CatalogContainer, CatalogContainerProps } from "./CatalogContainer";
import { CategoryMenu, CategoryMenuProps } from "./CategoryMenu";

interface AvatarContainerProps
  extends CategoryMenuProps,
    AvatarProps,
    CatalogContainerProps {}

export const AvatarContainer = ({
  isLoading,
  isSubcategory,
  typeOnChange,
  categoryOnChange,
  subcategoryOnChange,
  typeList,
  categoryList,
  subcategoriesList,
  currentAvatar,
  category,
  subcategory,
  saveAvatarHandler,
  randomizeHandler,
  assetsHandler,
  catalog,
}: AvatarContainerProps): React.ReactElement => {
  return (
    <>
      <div className={"pt-20 relative flex"}>
        <img
          src="/images/avatar-customization/banner.svg"
          alt=""
          className="w-full"
        />
      </div>
      <div className="relative z-10 flex min-h-screen">
        <Section size="2xl" padding="none">
          <div className="text-center text-white">
            <Title>Avatar Customization</Title>
            <p className="pt-6">Time to pick your outfit of the day!</p>
          </div>
          <div>
            <div className="mt-8">
              <CategoryMenu
                isLoading={isLoading}
                typeOnChange={typeOnChange}
                categoryOnChange={categoryOnChange}
                categoryList={categoryList}
                typeList={typeList}
              />
              <div className="mt-6 lg:mt-12">
                <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-4">
                  {/* Container for both avatar and assets */}
                  <Avatar
                    isLoading={isLoading}
                    currentAvatar={currentAvatar}
                    saveAvatarHandler={saveAvatarHandler}
                    randomizeHandler={randomizeHandler}
                  />
                  <CatalogContainer
                    isSubcategory={isSubcategory}
                    category={category}
                    subcategory={subcategory}
                    assetsHandler={assetsHandler}
                    catalog={catalog}
                    subcategoriesList={subcategoriesList}
                    subcategoryOnChange={subcategoryOnChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
};
