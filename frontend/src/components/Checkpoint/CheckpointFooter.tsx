import clsx from "clsx";
import * as React from "react";

import { Button } from "../Elements";

type CheckpointFooterProps = {
  onSecondary?: any;
  onPrimary?: any;
  secondaryText?: string;
  primaryText: string;
  padding?: keyof typeof paddings;
  buttons?: any;
  buttonAttr?: any;
};

const paddings = {
  none: "",
  xs: "px-4 lg:px-36 py-6",
  sm: "px-4 lg:py-8 px-40",
  md: "px-4 lg:py-10 px-44",
};

export const CheckpointFooter = ({
  // onSecondary,
  onPrimary,
  secondaryText,
  primaryText,
  padding = "md",
  buttons,
  buttonAttr,
}: CheckpointFooterProps): React.ReactElement => {
  return (
    <footer
      className={clsx(
        "fixed bottom-0 left-0 right-0 w-screen border-t-2 border-t-gray-300 flex flex-row bg-none bg-dark-overlay bg-opacity-80",
        secondaryText ? "justify-between" : "justify-end",
        paddings[padding],
      )}
    >
      {secondaryText ? (
        <div></div>
      ) : // <Button variant="secondary" className="hidden" onClick={onSecondary}>
      //   {secondaryText}
      // </Button>
      null}
      {buttons}
      <Button variant="green" type="submit" onClick={onPrimary} {...buttonAttr}>
        {primaryText}
      </Button>
    </footer>
  );
};
