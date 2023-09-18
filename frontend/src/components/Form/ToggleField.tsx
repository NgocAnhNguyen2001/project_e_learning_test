import { Switch } from "@headlessui/react";
import * as React from "react";
import {
  Control,
  Controller,
  FieldValues,
  UseFormSetValue,
} from "react-hook-form";

import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";

type ToggleFieldProps = FieldWrapperPassThroughProps & {
  label: string;
  control: Control<FieldValues, object>;
  setValue: UseFormSetValue<FieldValues>;
  setStatus?: any;
  description: string;
  fieldName: string;
  defaultValue?: boolean;
};

export const ToggleField = (props: ToggleFieldProps): React.ReactElement => {
  const {
    label,
    error,
    control,
    setValue,
    setStatus,
    fieldName,
    description,
    defaultValue,
  } = props;

  return (
    <FieldWrapper label={label} error={error}>
      <Controller
        control={control}
        name={label}
        defaultValue={defaultValue}
        render={({ field }): React.ReactElement => {
          return (
            <Switch
              checked={field.value}
              onChange={(value): void => {
                setStatus(value);
                setValue(fieldName, value);
                field.onChange(value);
              }}
              className={`${
                field.value ? "bg-sky-500" : "bg-gray-200"
              } relative inline-flex items-center h-9 w-20 rounded-full`}
            >
              <span className="sr-only">{description}</span>
              <span
                className={`${
                  field.value
                    ? "translate-x-9 border-sky-500"
                    : "translate-x-0 border-gray-200"
                } inline-block w-12 h-12 transform bg-white rounded-2xl transition-transform duration-300 border-2`}
              />
            </Switch>
          );
        }}
      />
    </FieldWrapper>
  );
};
