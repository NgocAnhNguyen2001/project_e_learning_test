import clsx from "clsx";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";

const backgrounds = {
  transparent: "bg-transparent",
  white: "bg-white",
};

type TextAreaFieldProps = FieldWrapperPassThroughProps & {
  className?: string;
  placeholder?: string;
  registration: Partial<UseFormRegisterReturn>;
  background?: keyof typeof backgrounds;
  rows?: number;
};

export const TextAreaField = (
  props: TextAreaFieldProps,
): React.ReactElement => {
  const {
    label,
    className,
    placeholder,
    registration,
    error,
    rows,
    background = "transparent",
  } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <textarea
        className={clsx(
          "block w-full text-2xl font-semibold placeholder-gray-500 placeholder-opacity-50 appearance-none focus:outline-none",
          // 'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
          className,
          background,
        )}
        placeholder={placeholder}
        rows={rows}
        {...registration}
      />
    </FieldWrapper>
  );
};
