import clsx from "clsx";
import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";

type CheckboxFieldProps = FieldWrapperPassThroughProps & {
  className?: string;
  registration?: Partial<UseFormRegisterReturn>;
  error?: FieldError;
  onChange?: any;
  value?: boolean;
  id?: string | number;
};

export const CheckboxField = (
  props: CheckboxFieldProps,
): React.ReactElement => {
  const { label, className, registration, error, onChange, id, value } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <input
        type="checkbox"
        onChange={(event): void => onChange(id, event.target.checked)}
        className={clsx(
          "text-green-500 h-11 w-11 border-gray-200 rounded-lg border-2  ring-transparent",
          className,
        )}
        checked={value}
        {...registration}
      />
    </FieldWrapper>
  );
};
