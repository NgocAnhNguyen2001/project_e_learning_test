import { Transition, Menu } from "@headlessui/react";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import {
  Control,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { toast } from "react-toastify";



import { Button } from "@/components/Elements";

// import { usePopper } from "react-popper";
import { Feedback } from "@/components/Feedback";
import { InputField } from "@/components/Form";
import { DateField } from "@/components/Form/DateField";
import {
  useMeLazyQuery,
  useUpdateChildMutation,
  useUpdateUserOnboardedMutation,
} from "schema/generated/graphql";
import { useStore } from "utils/hooks/zustand";

import SettingsForm from "../SettingsForm";

interface IProp {
  errors: {
    [x: string]: any;
  };
  control: Control<FieldValues, object>;
  setValue: UseFormSetValue<FieldValues>;
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  userId: string;
}

const AccountSettings = ({
  errors,
  register,
  control,
  setValue,
  handleSubmit,
  userId,
}: IProp): React.ReactElement => {
  const [updateChild] = useUpdateChildMutation();
  // const [referenceElement, setReferenceElement] = React.useState<any>();
  // const [popperElement, setPopperElement] = React.useState<any>();
  const setOnboaring = useStore((state) => state.setOnboarding);
  const setUser = useStore((state) => state.setMe);
  const setOnboardStep = useStore((state) => state.setOnboardStep);
  const me = useStore((state) => state.user);
  const [getMe] = useMeLazyQuery();
  const [updateUserOnboarded] = useUpdateUserOnboardedMutation();
  const router = useRouter();

  const restartOnboard = async (): Promise<void> => {
    setUser({ ...me, onboarded: false });
    setOnboardStep(0);
    try {
      await updateUserOnboarded({
        variables: {
          data: {
            onboarded: {
              set: false,
            },
          },
        },
      });
      setOnboaring(true);
      router.push("/student/home");
    } catch (error) {
      console.log(error);
    }
  };

  // const { styles, attributes } = usePopper(referenceElement, popperElement, {
  //   placement: "right",
  //   modifiers: [
  //     {
  //       name: "offset",
  //       options: {
  //         offset: [0, 8],
  //       },
  //     },
  //   ],
  // });

  const userSubmit = async (data: any): Promise<void> => {
    try {
      await updateChild({
        variables: {
          data: {
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName,
            birthDate: data.birthDate,
            bio: data.bio,
            email: data.email,
          },
          id: userId,
        },
      });
      getMe().then((res) => {
        if (res.data) setUser(res.data?.me);
      });
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
        <label htmlFor="username" className="">
          Username
        </label>
        <InputField
          required
          type="text"
          registration={{ ...register("username") }}
          className="font-bold"
          error={errors.username}
        />
      </div>
      <div className="col-span-2">
        <label htmlFor="bio" className="">
          Bio
        </label>
        <InputField
          required
          type="text"
          registration={{ ...register("bio") }}
          className="font-bold"
          error={errors.bio}
        />
      </div>
      <div className="col-span-2">
        <label htmlFor="birthDate" className="">
          Birthdate
        </label>
        <DateField
          control={control}
          label="birthDate"
          fieldName="birthDate"
          setValue={setValue}
          className="font-bold text-black"
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
      <div className="flex justify-end h-0 col-span-2">
        {/* <Popover>
          <Popover.Button className="outline-none" ref={setReferenceElement}>
            <Button variant="answer" size="xs" className="mt-4 w-60">
              Restart Tutorial
            </Button>
          </Popover.Button>
          <Popover.Panel
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            <div className="p-4 text-center bg-white rounded-xl">
              <p className="font-extrabold text-gray-700 ">Are you sure?</p>

              <div className="flex mx-auto mt-4 gap-x-3">
          <Button size="xs" className="text-xs" variant="gray">
          Cancel
        </Button>
                
                <Button size="xs" className="text-xs" variant="brand1">
                  Confirm
                </Button>
              </div>
            </div>
            
            
          </Popover.Panel>
        </Popover> */}
        <Menu as="div" className="relative right-0 z-20">
          {({ open }): React.ReactElement => (
            <>
              <Menu.Button>
                <Button
                  variant="answer"
                  size="xs"
                  className="w-52 sm:w-60 tour_20"
                  data-tut="reactour__20"
                >
                  Restart Tutorial
                </Button>
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
                <Menu.Items className="z-20 p-4 mt-3 text-center bg-white rounded-xl">
                  <p className="font-extrabold text-gray-700 ">Are you sure?</p>
                  <div className="flex mt-4 gap-x-3">
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
                          onClick={restartOnboard}
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
      </div>
    </SettingsForm>
  );
};

export default AccountSettings;
