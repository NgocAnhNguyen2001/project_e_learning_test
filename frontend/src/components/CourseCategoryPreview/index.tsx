import _ from "lodash";
import React from "react";

interface CarouselProps {
  categoryValue: any[];
  setCategory: (value: any) => void;
  categoryPreviews?: any[];
  className?: string;
  isMobile?: boolean;
  memoTenant: any;
  darkBackground: boolean;
}

export const CourseCategoryPreview = ({
  categoryValue,
  setCategory,
  categoryPreviews,
  className = "",
  isMobile = false,
  memoTenant,
  darkBackground,
}: CarouselProps): React.ReactElement => {
  const handleCategory = (category: string): void => {
    console.log(category);
    if (_.includes(categoryValue, category) && categoryValue.length === 1) {
      return;
    }
    setCategory([category]);
  };

  return (
    <div
      className={`${className} relative flex space-x-6 items-center justify-around ${
        isMobile ? "flex-col h-52" : "h-32"
      }`}
    >
      <div className={`${isMobile && "w-full"} flex flex-col space-y-2`}>
        <button
          className={`${
            categoryValue.length == categoryPreviews?.length
              ? "bg-brand text-white"
              : "bg-white text-black text-opacity-60"
          } text-center align-center cursor-pointer font-bold relative border-2 px-4 rounded-xl border-opacity-40 hover:scale-105 hover:bg-brand hover:text-white
          ${isMobile ? "w-10/12 my-2 mx-auto  bottom-2" : "py-1"}`}
          onClick={(): void => {
            categoryValue =
              categoryPreviews?.map((category) => category.value) || [];
            setCategory([...categoryValue]);
          }}
        >
          <div className="flex items-center justify-center w-full">All</div>
        </button>
        <button
          className={`bg-white text-black mx-auto text-opacity-60 text-center align-center cursor-pointer font-bold relative border-2 px-4 rounded-xl border-opacity-40 hover:scale-105 hover:bg-brand hover:text-white
          ${isMobile ? "w-10/12 my-2 mx-auto  bottom-2 mb-10" : "py-1"}`}
          onClick={(): void => {
            setCategory([]);
          }}
        >
          <div className="flex items-center justify-center w-full">Clear</div>
        </button>
      </div>

      <div
        className={`flex flex-row overflow-x-scroll scrollbar-hide gap-x-1 w-full align-middle items-center content-center ${
          isMobile && "mt-3"
        }`}
      >
        {categoryPreviews &&
          categoryPreviews.length > 0 &&
          categoryPreviews.map((item: any, index: number) => {
            if (
              memoTenant.courseCategories.includes("ALL") ||
              memoTenant.courseCategories.includes(_.toUpper(item.value))
            )
              return (
                <button
                  key={index}
                  className={`cursor-pointer flex-none inline-block w-28 rounded-xl transition duration-150 ease-in-out text-white text-center align-center self-center group`}
                  onClick={(): void => {
                    handleCategory(item.value);
                  }}
                >
                  <div className="flex flex-col items-center mx-auto transition duration-150 ease-in-out justify-center w-full">
                    <img
                      src={
                        memoTenant.courseCategoriesReplacment?.[
                          _.toUpper(item.value)
                        ].img ?? item.activeImgUrl
                      }
                      alt=""
                      className={`${
                        _.includes(categoryValue, item.value)
                          ? "group-hover:hidden"
                          : "group-hover:block hidden bg-red"
                      } w-16`}
                    />
                    <img
                      src={
                        memoTenant.courseCategoriesReplacment?.[
                          _.toUpper(item.value)
                        ].img ?? item.inactiveImgUrl
                      }
                      alt=""
                      className={`
                    opacity-50 ${
                      _.includes(categoryValue, item.value)
                        ? "group-hover:block hidden"
                        : "group-hover:hidden"
                    } w-16`}
                    />
                    <p
                      className={`
                    pt-2 font-medium
                    ${
                      _.includes(categoryValue, item.value)
                        ? darkBackground
                          ? "text-white"
                          : "text-black"
                        : "text-gray-400"
                    }`}
                    >
                      {memoTenant.courseCategoriesReplacment?.[
                        _.toUpper(item.value)
                      ].name ?? item.value}
                    </p>
                  </div>
                </button>
              );
          })}
      </div>

      <div
        className={`${
          isMobile && "w-full"
        } flex-col space-y-2 invisible lg:flex hidden`}
      >
        <button
          className={`${
            categoryValue.length == categoryPreviews?.length
              ? "bg-brand text-white"
              : "bg-white text-black text-opacity-60"
          } text-center align-center cursor-pointer font-bold relative border-2 px-4 rounded-xl border-opacity-40 hover:scale-105 hover:bg-brand hover:text-white
          ${isMobile ? "w-10/12 my-2 mx-auto  bottom-2" : "py-1"}`}
          onClick={(): void => {
            categoryValue =
              categoryPreviews?.map((category) => category.value) || [];
            setCategory([...categoryValue]);
          }}
        >
          <div className="flex items-center justify-center w-full">All</div>
        </button>
        <button
          className={`bg-white text-black mx-auto text-opacity-60 text-center align-center cursor-pointer font-bold relative border-2 px-4 rounded-xl border-opacity-40 hover:scale-105 hover:bg-brand hover:text-white
          ${isMobile ? "w-10/12 my-2 mx-auto  bottom-2 mb-10" : "py-1"}`}
          onClick={(): void => {
            setCategory([]);
          }}
        >
          <div className="flex items-center justify-center w-full">Clear</div>
        </button>
      </div>
    </div>
  );
};

export default CourseCategoryPreview;
