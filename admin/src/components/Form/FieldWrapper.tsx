import * as React from "react";
import { FieldError } from "react-hook-form";

type FieldWrapperProps = {
  label?: string;
  className?: string;
  children: React.ReactNode;
  error?: FieldError | undefined;
  description?: string;
  parentProps?: any;
};

export type FieldWrapperPassThroughProps = Omit<
  FieldWrapperProps,
  "className" | "children"
>;

export const FieldWrapper = (props: FieldWrapperProps): React.ReactElement => {
  const {
    error,
    children,
    parentProps,
  } = props;
  return (
    <div
      className="relative pb-4 transition duration-300 ease-in-out"
      {...parentProps}
    >
      <div className="mt-1">{children}</div>
      <div className="h-1 mt-1">
        {error?.message && (
          <div
            role="alert"
            aria-label={error.message}
            className="text-sm font-semibold text-red-500"
          >
            {error.message}
          </div>
        )}
      </div>
    </div>
  );
};
