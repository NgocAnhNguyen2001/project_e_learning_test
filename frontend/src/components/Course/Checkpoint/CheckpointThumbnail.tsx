import clsx from "clsx";
import React from "react";

interface ThumbnailProps {
  preview?: string;
  className?: string;
}

const CheckpointThumbnail = ({
  preview = "/images/placehold.png",
  className,
}: ThumbnailProps): React.ReactElement => {
  return (
    <img
      src={preview}
      alt=""
      className={clsx(
        "object-contain w-full aspect-video mr-6 rounded-xl",
        className,
      )}
    />
  );
};

export default CheckpointThumbnail;
