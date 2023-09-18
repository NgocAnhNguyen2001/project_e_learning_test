import clsx from "clsx";
import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: "text" | "email" | "password" | "range" | "number";
  className?: string;
  wrapperClassName?: string;
  placeholder?: string;
  registration?: Partial<UseFormRegisterReturn>;
  required?: boolean;
  error?: FieldError;
  errorClassName?: string;
  value?: string;
  name?: string;
  step?: number;
  min?: number;
  max?: number;
  readOnly?: boolean;
  onChange?: (e: any) => void;
};

export const InputField = (props: InputFieldProps): React.ReactElement => {
  const {
    type = "text",
    label,
    placeholder,
    className,
    wrapperClassName,
    registration,
    error,
    errorClassName,
    required,
    value,
    name,
    step,
    min,
    max,
    readOnly = false,
    onChange,
  } = props;
  return (
    <FieldWrapper
      label={label}
      error={error}
      className={wrapperClassName}
      errorClassName={errorClassName}
    >
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
        readOnly={readOnly}
        className={clsx(
          "block w-full placeholder-gray-400 placeholder-opacity-50 bg-gray-50 border-gray-200 rounded-xl border-2 focus:ring-0 focus:border-black text-black",
          className,
        )}
        {...registration}
      />
    </FieldWrapper>
  );
};
