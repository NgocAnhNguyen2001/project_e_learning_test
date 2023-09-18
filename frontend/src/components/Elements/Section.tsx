import clsx from "clsx";
import React from "react";

const sizes = {
  sm: "lg:max-w-md",
  md: "lg:max-w-lg",
  lg: "lg:max-w-xl",
  xl: "lg:max-w-3xl",
  "2xl": "",
};

const paddings = {
  none: "px-6 lg:px-8",
  "2xs": "px-6 lg:px-8 py-4 lg:py-8",
  xs: "px-4 lg:px-6 py-8 lg:py-16",
  sm: "px-6 lg:px-8 py-12 lg:py-24",
  md: "px-6 lg:px-8 py-24 lg:py-32",
};

interface Props {
  children?: React.ReactNode[] | React.ReactNode;
  className?: string;
  size?: keyof typeof sizes;
  padding?: keyof typeof paddings;
}

const Section = ({
  children,
  className,
  size = "xl",
  padding = "md",
}: Props): React.ReactElement => {
  return (
    <div
      className={clsx(
        "container mx-auto",
        sizes[size],
        paddings[padding],
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Section;
