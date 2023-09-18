import React from "react";
import {
  Control,
  FieldValues,
  UseFormHandleSubmit,
  UseFormSetValue,
} from "react-hook-form";

import { ToggleField } from "@/components/Form/ToggleField";

import SettingsForm from "../SettingsForm";

interface IProp {
  errors: {
    [x: string]: any;
  };
  control: Control<FieldValues, object>;
  setValue: UseFormSetValue<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
}

const NotificationSettings = ({
  errors,
  control,
  setValue,
  handleSubmit,
}: IProp): React.ReactElement => {
  const userSubmit = async (data: any): Promise<void> => {
    try {
      console.log(data, errors);
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <SettingsForm submitCallback={handleSubmit(userSubmit)}>
      <div className="flex flex-row justify-between w-full col-span-2">
        <label htmlFor="notifications" className="">
          Email Notifications
        </label>
        <ToggleField
          control={control}
          setValue={setValue}
          label="notifications"
          fieldName="notifications"
          description="Notifications"
          defaultValue={false}
        />
      </div>
      <div className="flex flex-row justify-between w-full col-span-2">
        <label htmlFor="newsletter" className="">
          Subscribe to Newsletter
        </label>
        <ToggleField
          control={control}
          setValue={setValue}
          label="newsletter"
          fieldName="newsletter"
          description="Newsletter"
          defaultValue={false}
        />
      </div>
    </SettingsForm>
  );
};

export default NotificationSettings;
