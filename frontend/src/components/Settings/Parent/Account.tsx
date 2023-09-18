import { Transition, Menu } from "@headlessui/react";
import { useRouter } from "next/router";
import React, { Fragment }  from "react";
import {
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { toast } from "react-toastify";


import { Button } from "@/components/Elements";
import { Feedback } from "@/components/Feedback";
import { InputField } from "@/components/Form";
import { useUpdateUserOnboardedMutation , useUpdateUserMutation } from "schema/generated/graphql";
import { useStore } from "utils/hooks/zustand";

import SettingsForm from "../SettingsForm";


interface IProp {
  errors: {
    [x: string]: any;
  };
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
}

const AccountSettings = ({
  errors,
  register,
  handleSubmit,
}: IProp): React.ReactElement => {
  const router = useRouter();
  const [updateUser] = useUpdateUserMutation();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setMe);
  const setOnboarding = useStore((state) => state.setOnboarding);
  const setOnboardStep = useStore((state) => state.setOnboardStep);
  const [updateUserOnboarded] = useUpdateUserOnboardedMutation();

  const userSubmit = async (data: any): Promise<void> => {
    try {
      await updateUser({
        variables: {
          data: {
            firstName: {
              set: data.firstName,
            },
            lastName: {
              set: data.lastName,
            },
            parent: {
              update: {
                email: {
                  set: data.email,
                },
              },
            },
          },
        },
      });

      setUser({ ...user, firstName: data.firstName, lastName: data.lastName, parent: {email: data.email}})
      toast(
        <Feedback
          title="Profile updated successfully!"
          type="success"
          disableFeedback={true}
        />,
        {
          progress: undefined,
          toastId: 1,
          autoClose: 3000,
        },
      );
    } catch (e: any) {
      console.log(e);
    }
  };

  const restartTutorial = async (): Promise<void> => {
    setUser({ ...user, onboarded: false });
    setOnboardStep(0);
    setOnboarding(true);
    try {
      await updateUserOnboarded({
        variables: {
          data: {
            onboarded: {
              set: false,
            },
          },
        },
      }).then(() => {
        router.push("/adult/home");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SettingsForm submitCallback={handleSubmit(userSubmit)}>
      <div className="col-span-2 lg:col-span-1">
        <label htmlFor="firstName" className="">
          First Name
        </label>
        <InputField
          required
          type="text"
          registration={{ ...register("firstName") }}
          className="font-bold"
          error={errors.firstName}
        />
      </div>
      <div className="col-span-2 lg:col-span-1">
        <label htmlFor="lastName" className="">
          Last Name
        </label>
        <InputField
          required
          type="text"
          registration={{ ...register("lastName") }}
          className="font-bold"
          error={errors.lastName}
        />
      </div>
      <div className="col-span-2">
        <label htmlFor="email" className="">
          Email
        </label>
        <InputField
          required
          type="text"
          registration={{ ...register("email") }}
          className="font-bold"
          error={errors.email}
        />
      </div>
      <Menu as="div" className="relative z-20">
        {({ open }): React.ReactElement => (
          <>
            <Menu.Button>
              <button
                type="button"
                className="uppercase font-semibold mt-1 text-[#00C7B1] tour_17 absolute right-0"
              >
                Restart Tutorial
              </button>
            </Menu.Button>
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="z-20 absolute top-0 right-0 mt-16 bg-white rounded-xl p-4 text-center border w-60">
                <p className="text-gray-700 font-extrabold ">Are you sure?</p>
                <div className="flex gap-x-3 mt-4 justify-center text-center">
                  <Menu.Item>
                    {(): React.ReactElement => (
                      <Button size="xs" className="text-xs" variant="gray">
                        Cancel
                      </Button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {(): React.ReactElement => (
                      <Button
                        size="xs"
                        className="text-xs"
                        variant="brand1"
                        onClick={restartTutorial}
                      >
                        Confirm
                      </Button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </SettingsForm>
  );
};

export default AccountSettings;
