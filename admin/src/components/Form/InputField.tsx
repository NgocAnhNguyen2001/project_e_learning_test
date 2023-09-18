import clsx from "clsx";
import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: "text" | "email" | "password" | "range";
  className?: string;
  placeholder?: string;
  registration?: Partial<UseFormRegisterReturn>;
  required?: boolean;
  error?: FieldError;
  value?: string;
  name?: string;
  step?: number;
  min?: number;
  max?: number;
  defaultValue?: string;
  onChange?: (e: any) => void;
};

export const InputField = (props: InputFieldProps): React.ReactElement => {
  const {
    type = "text",
    label,
    placeholder,
    className,
    registration,
    error,
    required,
    value,
    name,
    step,
    min,
    max,
    defaultValue,
    onChange,
  } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <input
        onChange={onChange}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        required={required}
        step={step}
        min={min}
        max={max}
        defaultValue={defaultValue}
        className={clsx(
          "block w-full placeholder-gray-400 placeholder-opacity-50 bg-gray-50 border-gray-200 rounded-xl border-2 focus:ring-0 focus:border-black text-black",
          className,
        )}
        {...registration}
      />
    </FieldWrapper>
  );
};
