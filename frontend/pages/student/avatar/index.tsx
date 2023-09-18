import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import Joyride, { Step, CallBackProps, STATUS } from "react-joyride";
import { toast } from "react-toastify";

import { AvatarContainer } from "@/components/Avatar";
import { Feedback } from "@/components/Feedback";
import { AppLayout } from "@/components/Layout";
import { PillTooltip, Tooltip } from "@/components/Onboard";
import { useUpdateAvatarImage } from "@/hooks/useUpdateAvatarImage";
import { extractHostname, getTenant, Props } from "@/utils/tenant";
import {
  useSaveAvatarMutation,
  useUploadAvatarMutation,
  useGenerateAvatarQuery,
  useGetAvatarQuery,
  ItemCatalogType,
  AvatarAssetCategory,
  AvatarAssetCatelogType,
  AvatarAssetCatelog,
  HairColourAvatarAsset,
  SkinColourAvatarAsset,
  SkinAvatarAsset,
  useAllCatalogOptionsQuery,
} from "schema/generated/graphql";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";
import { useStore } from "utils/hooks/zustand";

export const getServerSideProps = extractHostname;

type Catalog =
  | AvatarAssetCatelog[]
  | HairColourAvatarAsset[]
  | SkinColourAvatarAsset[]
  | undefined
  | null;

interface Header {
  label: string;
  value: string;
  category: ItemCatalogType;
}

const AvatarCustomization = ({ hostname }: Props): React.ReactElement => {
  const router = useRouter();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setMe);
  // const catalog: AllCatalogOptionsQuery = useStore((state) => state.catalog);
  // const setCatalog = useStore((state) => state.setCatalog);
  const [catalog, setCatalog] = React.useState<any>();

  const [currentAvatar, setCurrentAvatar] = React.useState<any>({});
  // type: all, character, accessories
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentType, setCurrentType] = React.useState<string>("all");
  const [currentCategory, setCurrentCategory] = React.useState<string>("hair");
  const [currentSubcategory, setCurrentSubcategory] =
    React.useState<string>("hair");
  // categories header: change by type
  const [categoriesHeader, setCategoriesHeader] = React.useState<
    Header[] | undefined
  >([]);
  // subcategories header: change by category
  const [subCategoriesHeader, setSubCategoriesHeader] = React.useState<
    Header[] | undefined
  >([]);

  const [currentCategoryCatalog, setCurrentCategoryCatalog] =
    React.useState<Catalog>([]);

  const [saveAvatar] = useSaveAvatarMutation();
  const [uploadAvatar, avatarResponse] = useUploadAvatarMutation();

  useGetAvatarQuery({
    onCompleted: (queriedData) => setCurrentAvatar(queriedData.getUserAvatar),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: catalogOptions, loading: catalogLoading } =
    useAllCatalogOptionsQuery({
      onCompleted: (options) => {
        setCatalog(options);
      },
    });

  const { data: generatedData, refetch: randomizerFetch } =
    useGenerateAvatarQuery();

  // const [getCatalog, { data: catalogOptions, loading: catalogLoading }] =
  //   useAllCatalogOptionsLazyQuery({});

  const categories = ["all", "character", "accessories"];

  const categoriesAssetType = [
    ItemCatalogType.Character,
    ItemCatalogType.Character,
    ItemCatalogType.Accessory,
  ];

  const tourOpen = useStore((state) => state.onboarding);
  const setTourOpen = useStore((state) => state.setOnboarding);

  const [tourStep, setTourStep] = React.useState(0);
  const [steps, setSteps] = React.useState<Step[]>([]);
  const audio: HTMLAudioElement[] = !tourOpen
    ? []
    : [
        new Audio("/audio/onboarding/student/14.mp3"),
        new Audio("/audio/onboarding/student/15.mp3"),
        new Audio("/audio/onboarding/student/16.mp3"),
        new Audio("/audio/onboarding/student/17.mp3"),
        new Audio("/audio/onboarding/student/18.mp3"),
      ];

  const [audioState, setAudioState] = React.useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

  const stepsArr: Step[] = [
    {
      content: (
        <div>
          <img
            className="absolute z-20 hidden -mt-44 -ml-60 sm:block"
            src="/images/onboarding/helios.png"
            alt=""
          />
          <div className="sm:ml-[46px] w-64 sm:w-96 sm:pl-4 ">
            <div className="space-y-4 font-semibold">
              <p>
                You can check your personal avatar, customise it and change your
                appearance!
              </p>
              <button
                id="volume"
                className="w-6 h-6 text-gray-500 cursor-pointer"
                onClick={(): void => {
                  toggleVolume(0);
                }}
              >
                <img src="/images/onboarding/volume-on.svg" alt="" />
              </button>
            </div>
            <div className="flex items-center justify-between mt-10 gap-x-3">
              <button
                onClick={(): any => {
                  audio[0].pause();
                  router.push("/student/courses");
                }}
                className="flex items-center font-bold focus:outline-none text-[#6B7280]"
              >
                <HiChevronLeft size={16} />
                <p>Back</p>
              </button>
              <button
                onClick={(): void => {
                  audio[0].pause();
                  setTourStep(1);
                }}
                className="flex items-center font-bold text-[#9B26B6]"
              >
                <p>Continue</p>
                <HiChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      ),
      placement: "center",
      target: "body",
      hideFooter: true,
      disableCloseOnEsc: true,
      disableOverlayClose: true,
      spotlightClicks: false,
    },
    {
      content: (
        <div>
          <img
            className="absolute z-20 hidden -mt-52 -ml-60 lg:block"
            src="/images/onboarding/helios.png"
            alt=""
          />
          <div className="lg:ml-[46px] lg:pl-4">
            <div className="space-y-4 font-semibold">
              <p>
                Scroll left and right to change your outfit and design your
                Avatar.
              </p>
              <button
                id="volume"
                className="w-6 h-6 text-gray-500 cursor-pointer"
                onClick={(): void => {
                  toggleVolume(1);
                }}
              >
                <img src="/images/onboarding/volume-on.svg" alt="" />
              </button>
            </div>
            <div className="flex items-center justify-between mt-10">
              <button
                onClick={(): any => {
                  audio[1].pause();
                  setTourStep(0);
                }}
                className="flex items-center font-bold text-[#6B7280] focus:outline-none"
              >
                <HiChevronLeft size={16} />
                <p>Back</p>
              </button>
              <button
                onClick={(): void => {
                  audio[1].pause();
                  setTourStep(2);
                }}
                className="flex items-center font-bold text-[#9B26B6]"
              >
                <p>Next</p>
                <HiChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      ),
      placement: "bottom",
      target: ".tour_13",
      hideFooter: true,
      disableCloseOnEsc: true,
      disableOverlayClose: true,
      spotlightClicks: false,
    },
    {
      content: (
        <div>
          <img
            className="absolute right-0 z-20 hidden -mt-40 -mr-52 sm:block"
            src="/images/onboarding/helios.png"
            alt=""
          />
          <div className="w-72 sm:w-full">
            <div className="space-y-4 font-semibold">
              <p>Or, click Randomize for a surprise Avatar!</p>
              <p>Remember to hit Save Avatar once you are done.</p>
              <button
                id="volume"
                className="w-6 h-6 text-gray-500 cursor-pointer"
                onClick={(): void => {
                  toggleVolume(2);
                }}
              >
                <img src="/images/onboarding/volume-on.svg" alt="" />
              </button>
            </div>
            <div className="flex items-center justify-between mt-10">
              <button
                onClick={(): void => {
                  audio[2].pause();
                  setTourStep(1);
                }}
                className="flex items-center font-bold text-[#6B7280] active:none"
              >
                <HiChevronLeft size={16} />
                <p>Back</p>
              </button>
              <button
                onClick={(): void => {
                  audio[2].pause();
                  setTourStep(3);
                }}
                className="flex items-center font-bold text-[#9B26B6]"
              >
                <p>Next</p>
                <HiChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      ),
      placement: "bottom",
      target: ".student_tour_14",
      hideFooter: true,
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      content: (
        <div className="space-y-4 font-semibold">
          <p>Click Save Avatar once your Avatar is ready.</p>
          <button
            id="volume"
            className="w-6 h-6 text-gray-500 cursor-pointer"
            onClick={(): void => {
              toggleVolume(3);
            }}
          >
            <img src="/images/onboarding/volume-on.svg" alt="" />
          </button>
        </div>
      ),
      placement: "bottom",
      target: ".student_tour_15",
      hideFooter: true,
      disableBeacon: true,
      spotlightClicks: true,
      tooltipComponent: PillTooltip,
      styles: {
        options: {
          arrowColor: "transparent",
        },
      },
    },
    {
      content: (
        <div>
          <div className="space-y-4 font-semibold">
            <p>Click on the menu icon</p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={(): void => {
                audio[2].play();
                setTourStep(3);
              }}
              className="flex items-center font-bold text-[#6B7280] active:none"
            >
              <HiChevronLeft size={16} />
              <p>Back</p>
            </button>
            <button
              onClick={(): void => {
                if (
                  document.querySelector(".mobile-menu")?.ariaExpanded ===
                  "true"
                ) {
                  audio[3].play();
                  setTourStep(5);
                }
              }}
              className="flex items-center font-bold text-[#9B26B6]"
            >
              <p>Next</p>
              <HiChevronRight size={16} />
            </button>
          </div>
        </div>
      ),
      styles: {
        options: {
          arrowColor: "transparent",
        },
      },
      placement: "bottom",
      target: ".mobile-menu",
      spotlightClicks: true,
    },
    {
      content: (
        <div>
          <div className="space-y-4 font-semibold">
            <p>
              Here is your Profile to share about yourself in the Nova-verse!
            </p>
            <button
              id="volume"
              className="w-6 h-6 text-gray-500 cursor-pointer"
              onClick={(): void => {
                toggleVolume(4);
              }}
            >
              <img src="/images/onboarding/volume-on.svg" alt="" />
            </button>
          </div>
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={(): void => {
                audio[4].pause();
                setTourStep(4);
              }}
              className="flex items-center font-bold text-[#6B7280] focus:outline-none"
            >
              <HiChevronLeft size={16} />
              <p>Back</p>
            </button>
          </div>
        </div>
      ),
      placement: "bottom",
      target: "#Profile",
      spotlightClicks: true,
    },
    {
      content: (
        <div>
          <img
            className="absolute z-20 -mt-40 -ml-60"
            src="/images/onboarding/helios.png"
            alt=""
          />
          <div className="ml-[46px] pl-4">
            <div className="flex justify-between space-x-6 font-semibold">
              <p>
                Here is your Profile to share about yourself in the Nova-verse!
              </p>
              <img src="/images/onboarding/profile.png" alt="" />
            </div>
            <button
              id="volume"
              className="w-6 h-6 text-gray-500 cursor-pointer"
              onClick={(): void => {
                toggleVolume(4);
              }}
            >
              <img src="/images/onboarding/volume-on.svg" alt="" />
            </button>
            <div className="flex items-center mt-10">
              <button
                onClick={(): void => {
                  audio[4].pause();
                  setTourStep(3);
                }}
                className="flex items-center font-bold text-[#6B7280] focus:outline-none"
              >
                <HiChevronLeft size={16} />
                <p>Back</p>
              </button>
            </div>
          </div>
        </div>
      ),
      placement: "bottom",
      target: ".tour_16",
      hideFooter: true,
      disableBeacon: true,
      spotlightClicks: true,
    },
  ];

  React.useEffect(() => {
    setSteps(stepsArr);
  }, []);

  const memoTenant = React.useMemo(() => {
    return getTenant(hostname).name;
  }, [hostname]);

  const toggleVolume = (index: number): void => {
    let src = "";
    if (audioState[index]) {
      audio[index].pause();
      src = "/images/onboarding/volume-on.svg";
    } else {
      audio[index].play();
      src = "/images/onboarding/volume-off.svg";
    }
    const tempAudioState = audioState;
    tempAudioState[index] = !tempAudioState[index];
    setAudioState(tempAudioState);

    //toggle volume icon in button
    const elem = document.getElementById("volume");
    let child = elem?.lastElementChild;
    while (child) {
      elem?.removeChild(child);
      child = elem?.lastElementChild;
    }

    const volumeIcon = document.createElement("img");
    volumeIcon.setAttribute("src", src);
    volumeIcon.setAttribute("alt", "");
    elem?.appendChild(volumeIcon);
  };

  const handleJoyrideCallback = (data: CallBackProps): void => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      setTourOpen(false);
    }
  };

  const getCatalogByCategory = (
    category: string,
    isSubcategory = false,
    assetType: ItemCatalogType,
  ): Catalog => {
    if (category === "colour") {
      return getColourCatalog(currentCategory);
    } else if (category === "skin") {
      return getColourCatalog(category);
    }

    const catalogObject = catalog?.getCatalog.categoryCatelog.filter(
      (object: any) =>
        isSubcategory
          ? object.label.toLowerCase() === category &&
            object.parentCategory !== null &&
            object.type === assetType
          : object.label.toLowerCase() === category &&
            object.type === assetType,
    )[0];

    let assetsCatalog = catalogObject?.avatarAssetCatelog;

    const noneAsset = (assetsCatalog as AvatarAssetCatelog[])?.find(
      (asset) => asset.label.toLowerCase() === "none",
    );

    const otherAsset = (assetsCatalog as AvatarAssetCatelog[])?.filter(
      (asset) => asset.label.toLowerCase() !== "none",
    );

    if (noneAsset !== undefined) {
      assetsCatalog = [noneAsset, ...otherAsset];
    }

    return assetsCatalog?.filter(
      (assetCatalog: any) => assetCatalog.isActive === true,
    ) as AvatarAssetCatelog[];
  };

  const getColourCatalog = (
    category: string,
  ): HairColourAvatarAsset[] | SkinColourAvatarAsset[] | null | undefined => {
    const colourCatalogObject = catalog?.getCatalog.colourCatelog;
    switch (category) {
      case "hair":
        return colourCatalogObject?.hair as HairColourAvatarAsset[];
      case "skin":
        return colourCatalogObject?.skin as SkinColourAvatarAsset[];
    }
    return null;
  };

  const getCategoriesHeader = (type: string): Header[] | undefined => {
    const characterList = catalog?.getCatalog.categoryCatelog
      .filter(
        (object: any) =>
          object.type === ItemCatalogType.Character &&
          object.parentCategory === null,
      )
      .map((categoryObject: any) => ({
        label: categoryObject.label,
        value: categoryObject.label.toLowerCase(),
        category: ItemCatalogType.Character,
      }));

    const accessoriesList = catalog?.getCatalog.categoryCatelog
      .filter(
        (object: any) =>
          object.type === ItemCatalogType.Accessory &&
          object.parentCategory === null,
      )
      .map((categoryObject: any) => {
        return {
          label: categoryObject.label,
          value: categoryObject.label.toLowerCase(),
          category: ItemCatalogType.Accessory,
        };
      });

    switch (type) {
      case "character":
        return characterList;
      case "accessories":
        return accessoriesList;
      case "all":
        return [...(characterList ?? []), ...(accessoriesList ?? [])];
    }
  };

  const getSubCategoriesHeader = (category: string): Header[] | undefined => {
    if (category === "hair") {
      return [
        {
          value: "hair",
          label: "Hair",
          category: ItemCatalogType.Character,
        },
      ];
    }

    const catalogObject = catalog?.getCatalog.categoryCatelog.filter(
      (object: any) => object.label.toLowerCase() === category,
    )[0];

    const subCategoriesList = catalogObject?.subCategories?.map(
      (subCategory: any) => {
        return {
          value: subCategory.label.toLowerCase(),
          label: subCategory.label,
          category: ItemCatalogType.Character,
        };
      },
    );

    return subCategoriesList;
  };

  const hasSubcategory = (
    category: string,
    assetType: ItemCatalogType,
  ): boolean => {
    if (category === "hair") {
      return true;
    }

    const targetCategory = catalog?.getCatalog.categoryCatelog.filter(
      (categoryObject: any) => {
        return (
          categoryObject.label.toLowerCase() === category &&
          categoryObject.type === assetType
        );
      },
    );

    return !!(targetCategory as AvatarAssetCategory[])?.[0]?.subCategories
      ?.length;
  };

  const assetsOnChange = (
    category: string,
    subcategory: string,
    asset: AvatarAssetCatelog | HairColourAvatarAsset | SkinColourAvatarAsset,
  ): void => {
    if (asset === undefined || asset === null) {
      return;
    }
    if (
      asset.__typename === "HairColourAvatarAsset" ||
      asset.__typename === "SkinColourAvatarAsset"
    ) {
      // colour settings change
      if (category === "skin") {
        // currently only full body
        const bodyAsset = (
          (asset as SkinColourAvatarAsset).fullBody as SkinAvatarAsset[]
        )[0];

        const headAsset = (asset as SkinColourAvatarAsset).withCatelog?.find(
          (asset) =>
            asset.avatarAssetCatelogId ===
            currentAvatar.head?.avatarAssetCatelogId,
        );
        const hornsAsset = (asset as SkinColourAvatarAsset).withCatelog?.find(
          (asset) =>
            asset.avatarAssetCatelogId ===
            currentAvatar.horns?.avatarAssetCatelogId,
        );
        const earsAsset = (asset as SkinColourAvatarAsset).withCatelog?.find(
          (asset) =>
            asset.avatarAssetCatelogId ===
            currentAvatar.ears?.avatarAssetCatelogId,
        );
        const skinColour = (asset as SkinColourAvatarAsset).colour;

        setCurrentAvatar((prevState: any) => ({
          ...prevState,
          body: bodyAsset,
          head: headAsset,
          horns: hornsAsset,
          ears: earsAsset,
          skinColour: skinColour,
        }));
      } else if (category === "hair" && subcategory === "colour") {
        const bangsAsset = (asset as HairColourAvatarAsset).bangs?.find(
          (hairAsset) =>
            hairAsset.avatarAssetCatelogId ===
            currentAvatar.hairBangs?.avatarAssetCatelogId,
        );
        const backAsset = (asset as HairColourAvatarAsset).back?.find(
          (hairAsset) =>
            hairAsset.avatarAssetCatelogId ===
            currentAvatar.hairBack?.avatarAssetCatelogId,
        );
        const hairColour = (asset as HairColourAvatarAsset).colour;
        setCurrentAvatar((prevState: any) => ({
          ...prevState,
          hairBack: backAsset,
          hairBangs: bangsAsset,
          hairColour: hairColour,
        }));
      }
    }
    switch ((asset as AvatarAssetCatelog).type) {
      // @ts-expect-error Fallthrough Switch
      case AvatarAssetCatelogType.Normal:
        // replace in Avatar
        switch (category) {
          case "head":
            setCurrentAvatar((prevState: any) => ({
              ...prevState,
              headAccessory: (asset as any)?.normalAvatarAsset[0],
            }));
            break;
          case "eyes":
            setCurrentAvatar((prevState: any) => ({
              ...prevState,
              eyesAccessory: (asset as any)?.normalAvatarAsset[0],
            }));
            break;
          case "pets":
            setCurrentAvatar((prevState: any) => ({
              ...prevState,
              pet: (asset as any)?.normalAvatarAsset[0],
            }));
            break;
          case "bottom":
            setCurrentAvatar((prevState: any) => ({
              ...prevState,
              bottom: (asset as any)?.normalAvatarAsset[0],
            }));
            break;
          case "shoes":
            setCurrentAvatar((prevState: any) => ({
              ...prevState,
              shoes: (asset as any)?.normalAvatarAsset[0],
            }));
            break;
          case "items":
            setCurrentAvatar((prevState: any) => ({
              ...prevState,
              itemAccessory: (asset as any)?.normalAvatarAsset[0],
            }));
            break;
          case "tops":
            switch (subcategory) {
              case "shirt":
                setCurrentAvatar((prevState: any) => ({
                  ...prevState,
                  shirt: (asset as any)?.normalAvatarAsset[0],
                }));
                break;
              case "jacket":
                setCurrentAvatar((prevState: any) => ({
                  ...prevState,
                  jacket: (asset as any)?.normalAvatarAsset[0],
                }));
                break;
              default:
                setCurrentAvatar((prevState: any) => ({
                  ...prevState,
                  topAccessory: (asset as any)?.normalAvatarAsset[0],
                }));
            }
            break;
          case "face":
            switch (subcategory) {
              case "eyes":
                setCurrentAvatar((prevState: any) => ({
                  ...prevState,
                  eyes: (asset as any)?.normalAvatarAsset[0],
                }));
                break;
              case "mouth":
                setCurrentAvatar((prevState: any) => ({
                  ...prevState,
                  mouth: (asset as any)?.normalAvatarAsset[0],
                }));
                break;
              case "cheeks":
                setCurrentAvatar((prevState: any) => ({
                  ...prevState,
                  cheeks: (asset as any)?.normalAvatarAsset[0],
                }));
                break;
              default:
                setCurrentAvatar((prevState: any) => ({
                  ...prevState,
                  faceAccessory: (asset as any)?.normalAvatarAsset[0],
                }));
            }
        }

      // eslint-disable-next-line no-fallthrough
      case AvatarAssetCatelogType.Skin: {
        const skinAsset = (asset as AvatarAssetCatelog).skinAvatarAsset?.find(
          (asset) => asset.skinColourId === currentAvatar.skinColour?.id,
        );
        switch (subcategory) {
          case "ears":
            setCurrentAvatar((prevState: any) => ({
              ...prevState,
              ears: skinAsset,
            }));
            break;
          case "head":
            setCurrentAvatar((prevState: any) => ({
              ...prevState,
              head: skinAsset,
            }));
            break;
          case "horns / antenna":
            setCurrentAvatar((prevState: any) => ({
              ...prevState,
              horns: skinAsset,
            }));
            break;
        }
        break;
      }
      case AvatarAssetCatelogType.Hair:
        {
          const hairAsset = (
            asset as AvatarAssetCatelog
          ).hairAvatarAsset?.filter(
            (asset) => asset.hairColourId === currentAvatar.hairColour?.id,
          );

          const hairBangsAsset = hairAsset?.find(
            (asset) => asset.hairType === "BANGS",
          );
          const hairBackAsset = hairAsset?.find(
            (asset) => asset.hairType === "BACK",
          );

          setCurrentAvatar((prevState: any) => ({
            ...prevState,
            hairBack: hairBackAsset,
            hairBangs: hairBangsAsset,
          }));
        }
        break;
    }
  };

  const typeOnChange = (index = 0): void => {
    setCurrentType(() => {
      const newTypeState = categories[index];

      const assetType = categoriesAssetType[index];

      setCategoriesHeader(() => {
        const newCategoryHeaderState = getCategoriesHeader(
          newTypeState,
        ) as Header[];

        setCurrentCategory(() => {
          const newCategoryState = (newCategoryHeaderState as Header[])[0]
            ? (newCategoryHeaderState as Header[])[0].value
            : "";
          if (hasSubcategory(newCategoryState, assetType)) {
            setSubCategoriesHeader(() => {
              const newSubCategoryHeaderState =
                getSubCategoriesHeader(newCategoryState);

              setCurrentSubcategory(
                (newSubCategoryHeaderState as any)[0]?.value,
              );

              if (newCategoryState === "hair") {
                setCurrentCategoryCatalog(
                  getCatalogByCategory(
                    (newSubCategoryHeaderState as any)[0]?.value,
                    false,
                    assetType,
                  ),
                );
              } else {
                setCurrentCategoryCatalog(
                  getCatalogByCategory(
                    (newSubCategoryHeaderState as any)[0]?.value,
                    true,
                    assetType,
                  ),
                );
              }

              return newSubCategoryHeaderState;
            });
          } else {
            setCurrentSubcategory("");
            setSubCategoriesHeader([]);
            setCurrentCategoryCatalog(
              getCatalogByCategory(newCategoryState, false, assetType),
            );
          }

          return newCategoryState;
        });

        return newCategoryHeaderState;
      });

      return newTypeState;
    });
  };

  React.useMemo(() => {
    if (catalog) {
      typeOnChange(categories.indexOf(currentType));
    }
  }, catalog);

  const categoryOnChange = (index: number): void => {
    setCurrentCategory(() => {
      const newCategoryState = (categoriesHeader as Header[])[index]?.value;
      const assetType = (categoriesHeader as Header[])[index]?.category;

      if (hasSubcategory(newCategoryState, assetType)) {
        setSubCategoriesHeader(() => {
          if (newCategoryState === "hair") {
            setCurrentSubcategory("hair");

            setCurrentCategoryCatalog(
              getCatalogByCategory("hair", false, ItemCatalogType.Character),
            );

            return [
              {
                value: "hair",
                label: "Hair",
                category: ItemCatalogType.Character,
              },
            ];
          }

          const newSubCategoryHeaderState =
            getSubCategoriesHeader(newCategoryState);

          setCurrentSubcategory((newSubCategoryHeaderState as any)[0]?.value);

          setCurrentCategoryCatalog(
            getCatalogByCategory(
              (newSubCategoryHeaderState as any)[0]?.value,
              true,
              assetType,
            ),
          );

          return newSubCategoryHeaderState;
        });
      } else {
        setCurrentSubcategory("");
        setSubCategoriesHeader([]);
        setCurrentCategoryCatalog(
          getCatalogByCategory(newCategoryState, false, assetType),
        );
      }

      return newCategoryState;
    });
  };

  const subCategoryOnChange = (subcategory: string): void => {
    if (subcategory === "hair") {
      setCurrentSubcategory(() => {
        setCurrentCategoryCatalog(
          getCatalogByCategory(subcategory, false, ItemCatalogType.Character),
        );
        return subcategory;
      });
    } else {
      setCurrentSubcategory(() => {
        setCurrentCategoryCatalog(
          getCatalogByCategory(subcategory, true, ItemCatalogType.Character),
        );
        return subcategory;
      });
    }
  };

  const saveAvatarHandler = async (): Promise<void> => {
    if (tourOpen) {
      const mediaQuery = window.matchMedia("(min-width: 1024px)");

      const mobileMenuTourHandler = (e: any): void => {
        if (e.matches) {
          setTourStep(6);
        } else {
          setTourStep(4);
        }
      };

      mediaQuery.addEventListener("change", mobileMenuTourHandler);

      mobileMenuTourHandler(mediaQuery);
    }

    try {
      await saveAvatar({
        variables: { avatar: JSON.stringify(currentAvatar) },
      }).catch(() => {
        toast(
          <Feedback
            title="There's an error!"
            subtitle="Unable to save avatar"
            type="error"
            disableFeedback={true}
          />,
          {
            progress: undefined,
            toastId: 1,
            autoClose: 3000,
          },
        );
      });
    } catch (err) {
      toast(
        <Feedback
          title="There's an error!"
          subtitle="Unable to save avatar"
          type="error"
          disableFeedback={true}
        />,
        {
          progress: undefined,
          toastId: 1,
          autoClose: 3000,
        },
      );
    }

    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      await useUpdateAvatarImage(currentAvatar, uploadAvatar).then(() => {
        toast(
          <Feedback
            title="Success!"
            subtitle="Avatar saved successfully"
            type="success"
            disableFeedback={true}
            continueButton={false}
          />,
          {
            progress: undefined,
            toastId: 1,
            autoClose: 3000,
          },
        );
      });
    } catch (err) {
      toast(
        <Feedback
          title="There's an error!"
          subtitle="Unable to save avatar"
          type="error"
          disableFeedback={true}
        />,
        {
          progress: undefined,
          toastId: 1,
          autoClose: 3000,
        },
      );
    }
  };

  const generateAvatarHandler = (): void => {
    randomizerFetch();
    setCurrentAvatar(generatedData?.generateRandomAvatar);
  };

  React.useMemo(() => {
    if (avatarResponse.data) {
      setUser({
        ...user,
        student: {
          avatarImage: avatarResponse.data.uploadStudentAvatarImage.avatarImage,
        },
      });
    }
  }, [avatarResponse.data]);

  return (
    <AppLayout hostname={hostname} darkLayout>
      <Head>
        <title>{memoTenant}</title>
      </Head>
      <AvatarContainer
        isLoading={catalogLoading}
        isSubcategory={!!currentSubcategory}
        typeOnChange={typeOnChange}
        categoryOnChange={categoryOnChange}
        subcategoryOnChange={subCategoryOnChange}
        typeList={categories}
        categoryList={categoriesHeader}
        subcategoriesList={subCategoriesHeader}
        currentAvatar={currentAvatar}
        category={currentCategory}
        subcategory={currentSubcategory}
        saveAvatarHandler={saveAvatarHandler}
        randomizeHandler={generateAvatarHandler}
        assetsHandler={assetsOnChange}
        catalog={currentCategoryCatalog}
      />
      <Joyride
        callback={handleJoyrideCallback}
        continuous
        hideBackButton
        hideCloseButton
        run={tourOpen}
        scrollToFirstStep
        showProgress
        showSkipButton
        disableCloseOnEsc
        disableOverlayClose
        disableOverlay={false}
        steps={steps}
        stepIndex={tourStep}
        styles={{
          options: {
            width: "auto",
            zIndex: 10000,
          },
        }}
        tooltipComponent={Tooltip}
      />
    </AppLayout>
  );
};

export default withAuthenticated(withApollo(AvatarCustomization));
