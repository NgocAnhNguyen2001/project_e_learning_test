import clsx from "clsx";
import * as React from "react";
import Select from "react-select";

import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";

type Option = {
  label: React.ReactNode;
  value: string | number | string[];
};

type AvatarTypeSelectFieldProps = FieldWrapperPassThroughProps & {
  options: Option[];
  className?: string;
  placeholder?: string;
  onChange: any;
  fieldName: string;
  defaultValue: any;
  isSearchable?: boolean;
  disabled?: boolean;
  value: string;
};

export const AvatarTypeSelectField = (
  props: AvatarTypeSelectFieldProps,
): React.ReactElement => {
  const {
    label,
    options,
    placeholder,
    fieldName,
    defaultValue,
    onChange,
    className,
    isSearchable = false,
    disabled = false,
    value,
  } = props;

  return (
    <FieldWrapper label={label}>
      <Select
        defaultValue={defaultValue}
        value={options.find((option) => option.value === value)}
        onChange={(option): void => {
          if (option) {
            onChange(option.value);
          }
        }}
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
