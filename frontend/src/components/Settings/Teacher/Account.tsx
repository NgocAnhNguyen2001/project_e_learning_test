import React from "react";
import {
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { toast } from "react-toastify";

import { Feedback } from "@/components/Feedback";
import { InputField } from "@/components/Form";
import { useUpdateTeacherMutation } from "schema/generated/graphql";

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
  const [updateTeacher] = useUpdateTeacherMutation();

  const userSubmit = async (data: any): Promise<void> => {
    try {
      await updateTeacher({
        variables: {
          data: {
            introduction: {
              set: data.introduction,
            },
            email: {
              set: data.email,
            },
          },
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

  return (
    <SettingsForm submitCallback={handleSubmit(userSubmit)}>
      <div className="col-span-2">
        <label htmlFor="introduction" className="">
          Short Intro
        </label>
        <InputField
          required
          type="text"
          registration={{ ...register("introduction") }}
          error={errors.introduction}
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
          error={errors.email}
        />
      </div>
    </SettingsForm>
  );
};

export default AccountSettings;
