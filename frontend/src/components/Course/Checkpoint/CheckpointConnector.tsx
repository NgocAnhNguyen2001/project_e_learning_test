import clsx from "clsx";
import React from "react";

interface CheckpointProps {
  direction: "vertical" | "horizontal";
  className?: string;
  connected?: boolean;
}

const CheckpointConnector = ({
  direction,
  className,
  connected = true,
}: CheckpointProps): React.ReactElement => {
  return (
    <>
      {direction === "vertical" ? (
        <div
          className={clsx(
            "w-2 h-16 lg:h-28 rounded-full self-center justify-self-center",
            className,
            connected ? "bg-brand1-500" : "bg-gray-300",
          )}
        />
      ) : (
        <div
          className={clsx(
            "w-16 lg:w-28 h-2 rounded-full self-center justify-self-center",
            className,
            connected ? "bg-brand1-500" : "bg-gray-300",
          )}
        />
      )}
    </>
  );
};

export default CheckpointConnector;
