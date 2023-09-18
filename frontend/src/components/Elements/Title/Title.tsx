import clsx from "clsx";
import * as React from "react";

const variants = {
  strike: "flex items-center justify-between w-full",
  normal: "",
};

const sizes = {
  xs: "py-0 px-0",
  sm: "py-2 px-4",
  md: "py-4 px-12 lg:text-lg",
  lg: "py-3 px-8 lg:text-xl",
};

const colors = {
  white: "text-white",
  black: "",
};

type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined };

export type TitleProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  color?: keyof typeof colors;
  isLoading?: boolean;
} & IconProps;

export const Title = React.forwardRef<HTMLButtonElement, TitleProps>(
  ({ className = "", variant = "normal", color = "white", ...props }) => {
    return (
      <div className={clsx(variants[variant])}>
        <div
          className={`${
            variant == "normal" && "hidden"
          } flex h-px mr-6 border-b-2 grow border-b-gray-300 border-opacity-40`}
        />
        <p
          className={clsx(
            "font-header tracking-header text-xl font-bold lg:text-2xl",
            colors[color],
            className,
          )}
        >
          {props.children}
        </p>
        <div
          className={`${
            variant == "normal" && "hidden"
          } h-px ml-6 border-b-2 grow border-b-gray-300 border-opacity-40`}
        />
      </div>
    );
  },
);

Title.displayName = "Title";
