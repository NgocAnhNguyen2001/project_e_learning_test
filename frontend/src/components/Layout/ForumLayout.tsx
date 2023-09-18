import autoAnimate from "@formkit/auto-animate";
import { useRouter } from "next/router";
import React from "react";
import { BsCaretLeftFill } from "react-icons/bs";

import { useCategoriesQuery } from "schema/generated/graphql";

import Section from "../Elements/Section";

import { AppLayout } from "./AppLayout";

export const ForumLayout = ({
  selectedCategory,
  setSelectedCategory,
  children,
}: {
  selectedCategory: any;
  setSelectedCategory: (value: any) => void;
  children: React.ReactChild;
}): React.ReactElement => {
  const router = useRouter();

  const categoryRef = React.useRef(null);

  const { data: categoriesData } = useCategoriesQuery({
    onCompleted: (data) => {
      const active = data.categories.filter(
        (category) => category.name == router.query?.category,
      );
      if (router.query.category == "popular")
        setSelectedCategory?.({ label: "Popular Topics" });
      else if (router.query.category == "your") {
        setSelectedCategory?.({ label: "Your Topics" });
      } else if (router.query.category == "replies")
        setSelectedCategory?.({ label: "Replies received" });
      else if (router.query.category == "bookmarks")
        setSelectedCategory?.({ label: "Bookmarks" });
      else
        setSelectedCategory?.(
          active?.[0]?.name
            ? { ...active?.[0], label: active?.[0]?.name }
            : {
                ...data.categories[0],
                label: data.categories[0].name,
              },
        );
    },
  });

  React.useEffect(() => {
    categoryRef.current && autoAnimate(categoryRef.current);
  }, [categoryRef]);

  return (
    <AppLayout darkLayout>
      <div className="z-10 flex min-h-screen">
        <Section size="2xl">
          <div className="w-full bg-gray-400/20 h-[80vh] rounded-3xl px-2 md:px-4 lg:px-12 pt-8">
            <div className="grid grid-cols-6 h-[74vh]">
              <div className="col-span-1 md:col-span-2 max-h-full overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-transparent scrollbar-thumb-rounded-md hover:scrollbar-thumb-slate-400">
                {/* <div
                  className="space-y-4 h-[60vh] overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-transparent scrollbar-thumb-rounded-md hover:scrollbar-thumb-slate-400"
                  ref={categoryRef}
                > */}
                {[
                  {
                    name: "Popular Topics",
                    categoryLink: "popular",
                    img: "/images/clubs/popular-topic.png",
                  },
                  {
                    name: "Your Topics",
                    categoryLink: "your",
                    img: "/images/clubs/your-topics.png",
                  },
                  {
                    name: "Replies received",
                    categoryLink: "replies",
                    img: "/images/clubs/replies.png",
                  },
                  {
                    name: "Bookmarks",
                    categoryLink: "bookmarks",
                    img: "/images/clubs/bookmark-active.png",
                  },
                ].map((category) => (
                  <button
                    key={category.categoryLink}
                    className={`flex justify-between items-center pr-4 w-full p-2 rounded hover:bg-neutral-300 hover:bg-opacity-20 my-3 ${
                      selectedCategory.label === category.name &&
                      "bg-neutral-400 bg-opacity-40"
                    }`}
                    onClick={(): void => {
                      setSelectedCategory({
                        label: category.name,
                        id: "",
                      });
                      if (router.pathname != "/student/clubs")
                        router.push(
                          `/student/clubs?category=${category.categoryLink}`,
                          undefined,
                          {
                            shallow: true,
                          },
                        );
                    }}
                  >
                    <div className="flex flex-col md:flex-row items-center">
                      <img
                        src={category.img}
                        alt={category.name}
                        className={`w-10`}
                      />
                      <p
                        className={`text-[0.5rem] md:text-sm font-medium md:font-bold pl-0 md:pl-4 text-center md:text-start ${
                          selectedCategory.label === category.name
                            ? "text-white"
                            : "text-white/60"
                        } `}
                      >
                        {category.name.toUpperCase()}
                      </p>
                    </div>
                    {selectedCategory.label === category.name && (
                      <BsCaretLeftFill color="white" />
                    )}
                  </button>
                ))}
                <p className="text-xs sm:text-sm md:text-base font-extrabold text-white py-4">
                  SPACES
                </p>
                <div className="space-y-4 overflow-hidden" ref={categoryRef}>
                  {categoriesData &&
                    categoriesData.categories.map((category) => {
                      return (
                        <button
                          key={category.id}
                          className={`flex justify-between items-center pr-4 w-full p-2 rounded hover:bg-neutral-300 hover:bg-opacity-20 ${
                            selectedCategory.label === category.name &&
                            "bg-neutral-400 bg-opacity-40"
                          }`}
                          onClick={(): void => {
                            setSelectedCategory({
                              label: category.name,
                              id: category.id,
                            });
                            if (router.route != "/student/clubs")
                              router.push(
                                `/student/clubs?category=${category.name}`,
                              );
                          }}
                        >
                          <div className="flex flex-col md:flex-row items-center">
                            {category.activeImgUrl && (
                              <img
                                src={category.activeImgUrl}
                                alt={category.name}
                                className={`w-12 ${
                                  selectedCategory.label === category.name
                                    ? ""
                                    : "hidden"
                                }`}
                              />
                            )}
                            {category?.inactiveImgUrl && (
                              <img
                                src={category?.inactiveImgUrl}
                                alt={category.name}
                                className={`w-12 ${
                                  selectedCategory.label !== category.name
                                    ? ""
                                    : "hidden"
                                }`}
                              />
                            )}
                            <p
                              className={`text-[0.7rem] md:text-sm font-medium md:font-bold pl-0 md:pl-4 text-center md:text-start ${
                                selectedCategory.label === category.name
                                  ? "text-white"
                                  : "text-white/60"
                              } `}
                            >
                              {category.name}
                            </p>
                          </div>
                          {selectedCategory.label === category.name && (
                            <BsCaretLeftFill color="white" />
                          )}
                        </button>
                      );
                    })}
                </div>
              </div>
              <div className="col-span-5 md:col-span-4 px-2 space-y-4 h-[70vh] overflow-scroll scrollbar-thin scrollbar-thumb-transparent scrollbar-thumb-rounded-md hover:scrollbar-thumb-slate-400">
                {children}
              </div>
            </div>
          </div>
        </Section>
      </div>
    </AppLayout>
  );
};
