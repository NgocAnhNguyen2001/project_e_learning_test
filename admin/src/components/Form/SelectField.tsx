import clsx from "clsx";
import * as React from "react";
import {
  Control,
  Controller,
  FieldValues,
  UseFormSetValue,
} from "react-hook-form";
import Select from "react-select";

import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";

type Option = {
  label: React.ReactNode;
  value: string | number | string[];
};

type SelectFieldProps = FieldWrapperPassThroughProps & {
  options: Option[];
  errors: {
    [x: string]: any;
  };
  className?: string;
  placeholder?: string;
  control: Control<FieldValues, object>;
  setValue: UseFormSetValue<FieldValues>;
  fieldName: string;
  defaultValue: any;
  isSearchable?: boolean;
  disabled?: boolean;
};

export const SelectField = (props: SelectFieldProps): React.ReactElement => {
  const {
    label,
    options,
    errors,
    control,
    setValue,
    placeholder,
    fieldName,
    defaultValue,
    className,
    isSearchable = false,
    disabled = false,
  } = props;

  return (
    <FieldWrapper label={label} error={errors[fieldName]}>
      <Controller
        control={control}
        name={fieldName}
        defaultValue={defaultValue}
        render={({ field }): React.ReactElement => {
          return (
            <Select
              value={options.find((option) => option.value === field.value)}
              onChange={(option): void => {
                if (option) {
                  setValue(fieldName, String(option.value));
                  field.onChange(option.value);
                }
              }}
              onBlur={field.onBlur}
              options={options}
              isSearchable={isSearchable}
              className={clsx("react-select-container text-black", className)}
              classNamePrefix="react-select"
              placeholder={placeholder}
              instanceId={fieldName}
              isDisabled={disabled}
            />
          );
        }}
      />
    </FieldWrapper>
  );
};
