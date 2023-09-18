import { useRouter } from "next/router";
import React from "react";

import { Button } from "@/components/Elements";
import { useStore } from "utils/hooks/zustand";
// import { useUpdateUserOnboardedMutation } from "schema/generated/graphql";


interface IProp {
  children: any;
  submitCallback: any;
}

const SettingsForm = ({
  children,
  submitCallback,
}: IProp): React.ReactElement => {
  const router = useRouter();
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  // const user = useStore((state) => state.user);
  // const setUser = useStore((state) => state.setMe);
  // const setOnboarding = useStore((state) => state.setOnboarding);
  // const setOnboardStep = useStore((state) => state.setOnboardStep);
  // const [updateUserOnboarded] = useUpdateUserOnboardedMutation();

  const signout = (): void => {
    logout();
    router.push("/");
  };

  // const restartTutorial = async (): Promise<void> => {
  //   setUser({ ...user, onboarded: false });
  //   setOnboardStep(0);
  //   setOnboarding(true);
  //   try {
  //     await updateUserOnboarded({
  //       variables: {
  //         data: {
  //           onboarded: {
  //             set: false,
  //           },
  //         },
  //       },
  //     }).then(()=>{
  //       router.push("/adult/home");
  //     })
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <form className="self-center w-full mt-12 lg:col-span-3 justify-self-start lg:mt-8">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex items-center">
          <img src="/images/dashboard/settings.png" alt="" className="w-10 mr-2"/>
          <p className="text-2xl font-bold lg:text-4xl">Account Settings</p>
        </div>
        <Button
          type="submit"
          variant="brand1"
          className="w-max h-14 whitespace-nowrap"
          size="sm"
          onClick={submitCallback}
        >
          Save Changes
        </Button>
      </div>
      <div className="mt-2">
        {children}
        <div className="flex justify-between">
          {user?.role == "STUDENT" ? (
            <Button
              variant="danger"
              size="xs"
              className="w-40 font-semibold uppercase"
              onClick={signout}
            >
              Logout
            </Button>
          ) : (
            <button
              className="font-semibold text-red-600 uppercase"
              onClick={signout}
            >
              Logout
            </button>
          )}
          {/* <button
            type="button"
            className="uppercase font-semibold text-[#00C7B1] tour_17"
            onClick={restartTutorial}
          >
            Restart Tutorial
          </button> */}
        </div>
      </div>
    </form>
  );
};

export default SettingsForm;
