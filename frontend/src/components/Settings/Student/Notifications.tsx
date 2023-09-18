import { Transition, Menu } from "@headlessui/react";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import {
  Control,
  FieldValues,
  // UseFormHandleSubmit,
  UseFormSetValue,
} from "react-hook-form";
import { toast } from "react-toastify";

import { Button } from "@/components/Elements";
import { Feedback } from "@/components/Feedback";
import { ToggleField } from "@/components/Form/ToggleField";
import {
  useUpdateUserNotificationSettingMutation,
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
  // handleSubmit: UseFormHandleSubmit<FieldValues>;
  notificationSetting: any;
}

const NotificationSettings = ({
  // errors,
  control,
  setValue,
  // handleSubmit,
  notificationSetting,
}: IProp): React.ReactElement => {
  const [updateNotificationSetting] =
    useUpdateUserNotificationSettingMutation();
  const [notification, setNotification] = React.useState(
    notificationSetting[0]?.allowed || false,
  );
  // const [newsletter, setNewsletter] = React.useState(false);
  const setUser = useStore((state) => state.setMe);
  const me = useStore((state) => state.user);
  const [updateUserOnboarded] = useUpdateUserOnboardedMutation();
  const router = useRouter();

  const userSubmit = async (event: any): Promise<void> => {
    event.preventDefault();
    try {
      await updateNotificationSetting({
        variables: {
          enableNotification: control._formValues.notifications,
        },
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

  const restartOnboard = async (): Promise<void> => {
    setUser({ ...me, onboarded: false });
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
      router.push("/student/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SettingsForm submitCallback={userSubmit}>
      <div className="flex flex-row justify-between w-full col-span-2 mt-10">
        <label htmlFor="notifications" className="">
          Email Notifications
        </label>
        <ToggleField
          control={control}
          setValue={setValue}
          setStatus={setNotification}
          label="notifications"
          fieldName="notifications"
          description="Notifications"
          defaultValue={notification}
        />
      </div>
      {/* <div className="flex flex-row justify-between w-full col-span-2">
        <label htmlFor="newsletter" className="">
          Subscribe to Newsletter
        </label>
        <ToggleField
          control={control}
          setValue={setValue}
          setStatus={setNewsletter}
          label="newsletter"
          fieldName="newsletter"
          description="Newsletter"
          defaultValue={false}
        />
      </div> */}
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
                <Button variant="answer" size="xs" className="w-60">
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

export default NotificationSettings;
