import * as React from "react";
import {
  Control,
  Controller,
  FieldValues,
  UseFormSetValue,
} from "react-hook-form";
import PhoneInput from "react-phone-number-input";

type PhoneFieldProps = {
  className?: string;
  control: Control<FieldValues, object>;
  setValue?: UseFormSetValue<FieldValues>;
};

export type PhoneFieldPassThroughProps = Omit<
  PhoneFieldProps,
  "className" | "children"
>;

export const PhoneField = (props: PhoneFieldProps): React.ReactElement => {
  return (
    <Controller
      name="phoneNumber"
      control={props.control}
      render={({ field }): any => (
        <PhoneInput {...field} smartCaret={false} className="text-black" />
      )}
    />
  );
};
