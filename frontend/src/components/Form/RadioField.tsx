import clsx from "clsx";
import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";

type RadioFieldProps = FieldWrapperPassThroughProps & {
  className?: string;
  registration?: Partial<UseFormRegisterReturn>;
  error?: FieldError;
  onChange?: any;
  value?: string;
  quizType?: string;
  id: string | number;
  groupName: string;
  isChecked: boolean;
};

export const RadioField = (props: RadioFieldProps): React.ReactElement => {
  const {
    label,
    className,
    registration,
    error,
    onChange,
    id,
    quizType,
    groupName,
    isChecked,
  } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <input
        type="radio"
        name={groupName}
        value={id}
        checked={isChecked}
        onChange={(event): void => onChange(id, event.target.checked)}
        className={clsx(
          "text-green-500 h-11 w-11 border-gray-200 rounded-lg border-2  ring-transparent",
          className, quizType=="OBJECTIVE" && "navigator_tour_60", quizType=="HEARING" && "navigator_tour_60_1"
        )}
        {...registration}
      />
    </FieldWrapper>
  );
};
