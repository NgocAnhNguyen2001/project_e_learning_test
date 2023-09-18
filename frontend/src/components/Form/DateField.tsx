import * as React from "react";
import DatePicker from "react-datepicker";
import {
  Control,
  Controller,
  FieldValues,
  UseFormSetValue,
} from "react-hook-form";

type DateFieldProps = {
  label?: string;
  className?: string;
  control: Control<FieldValues, object>;
  setValue: UseFormSetValue<FieldValues>;
  fieldName: string;
};

export type DateFieldPassThroughProps = Omit<
  DateFieldProps,
  "className" | "children"
>;

export const DateField = (props: DateFieldProps): React.ReactElement => {
  return (
    <Controller
      control={props.control}
      name={props.label || "birthDate"}
      defaultValue={new Date()}
      render={({ field }): React.ReactElement => (
        <DatePicker
          selected={field.value}
          onChange={(date): void => {
            props.setValue(props.fieldName, date);
            field.onChange(date);
          }}
          maxDate={new Date()}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          className={`mb-6 ${props.className}`}
        />
      )}
    />
  );
};
