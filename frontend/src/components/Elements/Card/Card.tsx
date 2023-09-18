import clsx from "clsx";
import * as React from "react";

const borders = {
  gray: "border-gray-300 border-opacity-60 bg-transparent border-2",
  custom: "",
};

const roundedness = {
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
};

interface ICardProps {
  children?: any;
  className?: string;
  border?: keyof typeof borders;
  rounded?: keyof typeof roundedness;
}

export const Card = ({
  children,
  className,
  border = "gray",
  rounded = "3xl",
}: ICardProps): React.ReactElement => {
  return (
    <div className={clsx(borders[border], roundedness[rounded], className)}>
      {children}
    </div>
  );
};

export default Card;
