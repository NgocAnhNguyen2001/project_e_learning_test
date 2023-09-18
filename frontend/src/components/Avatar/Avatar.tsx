import React from "react";
import HashLoader from "react-spinners/HashLoader";

import { NewUserAvatarDto } from "schema/generated/graphql";

import { Button } from "../Elements";
export interface AvatarProps {
  isLoading: boolean;
  currentAvatar: NewUserAvatarDto;
  randomizeHandler: () => void;
  saveAvatarHandler: () => void;
}

export const Avatar = ({
  isLoading,
  currentAvatar,
  randomizeHandler,
  saveAvatarHandler,
}: AvatarProps): React.ReactElement => {
  // render Current avatar
  return (
    <div className="w-full lg:aspect-[3/4] col-span-1 lg:col-span-2 flex flex-col items-center">
      {/* Container for avatar */}
      {isLoading && (
        <div className="w-[15rem] aspect-[3/4] w-max-[15rem] flex items-center justify-center">
          <HashLoader size={80} color="#3e94ff" />
        </div>
      )}
      <div
        className={`${
          isLoading ? "hidden" : ""
        } w-[15rem] aspect-[3/4] w-max-[15rem] relative`}
      >
        <div className="z-[1] absolute top-0 left-0" id="shadow">
          <img
            id="shadow-img"
            // shadow from public assets
            src={currentAvatar?.shadow?.imgUrl}
            alt=""
            onError={({ currentTarget }): void => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/images/empty.png";
            }}
          />
        </div>
        <div className="z-[1] absolute top-0 left-0" id="hair">
          <img
            id="hairColor-img"
            src={currentAvatar.hairBack?.imgUrl || "/images/empty.png"}
            alt=""
            onError={({ currentTarget }): void => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/images/empty.png";
            }}
          />
        </div>
        <div className="z-[2] absolute top-0 left-0" id="body">
          <img
            id="body-img"
            // should be body, asset wrong
            src={currentAvatar.body?.imgUrl || "/images/empty.png"}
            alt=""
            onError={({ currentTarget }): void => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/images/empty.png";
            }}
          />
        </div>
        <div className="z-[5] absolute top-0 left-0" id="head">
          <img
            id="head-img"
            src={currentAvatar.head?.imgUrl || "/images/empty.png"}
            alt=""
            onError={({ currentTarget }): void => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/images/empty.png";
            }}
          />
        </div>
        <div className="z-[9] absolute top-0 left-0" id="bangs">
          <img
            id="bangs-img"
            src={currentAvatar.hairBangs?.imgUrl || "/images/empty.png"}
            alt=""
            onError={({ currentTarget }): void => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/images/empty.png";
            }}
          />
        </div>
        <div className="z-[8] absolute top-0 left-0" id="eyes">
          <img
            id="eyes-img"
            src={currentAvatar.eyes?.imgUrl || "/images/empty.png"}
            alt=""
            onError={({ currentTarget }): void => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/images/empty.png";
            }}
          />
        </div>
        <div className="z-[8] absolute top-0 left-0" id="ears">
          <img
            id="ears-img"
            src={currentAvatar.ears?.imgUrl || "/images/empty.png"}
            alt=""
            onError={({ currentTarget }): void => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/images/empty.png";
            }}
          />
        </div>
        <div className="z-[8] absolute top-0 left-0 opacity-25" id="nose">
          <img
            id="nose-img"
            src={currentAvatar.nose?.imgUrl || "/images/empty.png"}
            alt=""
            onError={({ currentTarget }): void => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/images/empty.png";
            }}
          />
        </div>
        <div className="z-[8] absolute top-0 left-0" id="mouth">
          <img
            id="mouth-img"
            src={currentAvatar.mouth?.imgUrl || "/images/empty.png"}
            alt=""
            onError={({ currentTarget }): void => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/images/empty.png";
            }}
          />
        </div>
        <div className="z-[8] absolute top-0 left-0" id="blushes">
          <img
            id="blushes-img"
            src={currentAvatar.cheeks?.imgUrl || "/images/empty.png"}
            alt=""
            onError={({ currentTarget }): void => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/images/empty.png";
            }}
          />
        </div>
        <div className="z-[3] absolute top-0 left-0" id="horn">
          <img
            id="horn-img"
            src={currentAvatar.horns?.imgUrl || "/images/empty.png"}
            alt=""
            onError={({ currentTarget }): void => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/images/empty.png";
            }}
          />
        </div>
        <div
          className={`${
            currentAvatar.bottom?.isOuterMost ? "z-[5]" : "z-[4]"
          } absolute top-0 left-0`}
          id="bottom"
        >
          <img
            id="bottom-img"
            src={currentAvatar.bottom?.imgUrl || "/images/empty.png"}
            alt=""
            onError={({ currentTarget }): void => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/images/empty.png";
            }}
          />
        </div>
        <div className="z-[3] absolute top-0 left-0" id="shoes">
          <img
            id="shoes-img"
            src={currentAvatar.shoes?.imgUrl || "/images/empty.png"}
            alt=""
            onError={({ currentTarget }): void => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/images/empty.png";
            }}
          />
        </div>
        <div
          className={`${
            currentAvatar.bottom?.isOuterMost ? "z-[4]" : "z-[5]"
          } absolute top-0 left-0" id="shirt_main`}
        >
          <img
            id="shirtMain-img"
            src={currentAvatar.shirt?.imgUrl || "/images/empty.png"}
            alt=""
            onError={({ currentTarget }): void => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/images/empty.png";
            }}
          />
        </div>
        <div className="z-[6] absolute top-0 left-0" id="jacket_main">
          <img
            id="jacketMain-img"
            src={currentAvatar.jacket?.imgUrl || "/images/empty.png"}
            alt=""
            onError={({ currentTarget }): void => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/images/empty.png";
            }}
          />
        </div>
        <div className="z-[7] absolute top-0 left-0" id="accessory_top">
          <img
            id="accessoryTop-img"
            src={currentAvatar.topAccessory?.imgUrl || "/images/empty.png"}
            alt=""
            onError={({ currentTarget }): void => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/images/empty.png";
            }}
          />
        </div>
        <div className="z-[10] absolute top-0 left-0" id="accessory_head">
          <img
            id="accessoryHead-img"
            src={currentAvatar.headAccessory?.imgUrl || "/images/empty.png"}
            alt=""
            onError={({ currentTarget }): void => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/images/empty.png";
            }}
          />
        </div>
        <div className="z-[12] absolute top-0 left-0" id="accessory_items">
          <img
            id="accessoryItems-img"
            src={currentAvatar.itemAccessory?.imgUrl || "/images/empty.png"}
            alt=""
            onError={({ currentTarget }): void => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/images/empty.png";
            }}
          />
        </div>
        <div className="z-[11] absolute top-0 left-0" id="accessory_eyes">
          <img
            id="accessoryEyes-img"
            src={currentAvatar.eyesAccessory?.imgUrl || "/images/empty.png"}
            alt=""
            onError={({ currentTarget }): void => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/images/empty.png";
            }}
          />
        </div>
        <div className="z-[10] absolute top-0 left-0" id="accessory_face">
          <img
            id="accessoryFace-img"
            src={currentAvatar.faceAccessory?.imgUrl || "/images/empty.png"}
            alt=""
            onError={({ currentTarget }): void => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/images/empty.png";
            }}
          />
        </div>
        <div className="z-[13] absolute top-0 left-0" id="pet">
          <img
            id="pet-img"
            src={currentAvatar.pet?.imgUrl || "/images/empty.png"}
            alt=""
            onError={({ currentTarget }): void => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/images/empty.png";
            }}
          />
        </div>
      </div>
      <div className="flex w-full justify-evenly">
        {isLoading ? (
          <Button
            disabled
            variant="gray"
            className="mb-6 student_tour_14"
            data-tut="reactour__14"
          >
            Randomize
          </Button>
        ) : (
          <Button
            variant="brand1"
            onClick={randomizeHandler} //Randomize function
            className="mb-6 student_tour_14"
            data-tut="reactour__14"
          >
            Randomize
          </Button>
        )}

        <Button
          variant="brand1"
          onClick={saveAvatarHandler} // save avatar
          className="mb-6 student_tour_15"
          data-tut="reactour__15"
        >
          Save Avatar
        </Button>
      </div>
    </div>
  );
};
