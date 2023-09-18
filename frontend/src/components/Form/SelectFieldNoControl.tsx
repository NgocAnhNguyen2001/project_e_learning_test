import clsx from "clsx";
import * as React from "react";
import { Control, FieldValues } from "react-hook-form";
import Select from "react-select";

import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";

type Option = {
  label: React.ReactNode;
  value: string | number | string[] | any;
};

type SelectFieldNoControlProps = FieldWrapperPassThroughProps & {
  options: Option[];
  errors?: {
    [x: string]: any;
  };
  className?: string;
  placeholder?: string;
  control?: Control<FieldValues, object>;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  fieldName?: string;
  defaultValue: any;
  isSearchable?: boolean;
  disabled?: boolean;
};

export const SelectFieldNoControl = (
  props: SelectFieldNoControlProps,
): React.ReactElement => {
  const {
    label,
    options,
    errors,
    setValue,
    placeholder,
    fieldName,
    defaultValue,
    className,
    isSearchable = false,
    disabled = false,
  } = props;

  return (
    <FieldWrapper
      label={label}
      error={errors && fieldName && errors[fieldName]}
    >
      <Select
        // value={}
        onChange={(option): void => {
          if (option) {
            setValue(option.value);
            // field.onChange(option.value);
          }
        }}
        defaultValue={defaultValue}
        // onBlur={field.onBlur}
        options={options}
        isSearchable={isSearchable}
        className={clsx("react-select-container text-black", className)}
        classNamePrefix="react-select"
        placeholder={placeholder}
        instanceId={fieldName}
        isDisabled={disabled}
      />
    </FieldWrapper>
  );
};
