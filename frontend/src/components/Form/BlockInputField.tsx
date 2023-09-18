import clsx from "clsx";
import React from "react";
import { FieldError } from "react-hook-form";

import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";

type BlockInputFieldProps = FieldWrapperPassThroughProps & {
  type?: "text" | "email" | "password";
  className?: string;
  placeholder?: string;
  required?: boolean;
  error?: FieldError;
  onChange?: any;
  id?: string | number;
  value?: string;
};

export const BlockInputField = (
  props: BlockInputFieldProps,
): React.ReactElement => {
  const {
    type = "text",
    label,
    placeholder,
    className,
    error,
    required,
    onChange,
    id,
    value,
  } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        onChange={(event): void => onChange(id, event.target.value)}
        value={value}
        className={clsx(
          "block w-full placeholder-gray-400 placeholder-opacity-50 bg-gray-50 border-gray-200 rounded-xl border-2 focus:ring-0 focus:border-black text-black",
          className,
        )}
      />
    </FieldWrapper>
  );
};
