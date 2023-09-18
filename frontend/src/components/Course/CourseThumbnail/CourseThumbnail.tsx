import React from "react";

interface ThumbnailProps {
  preview?: string;
}

const CourseThumbnail = ({
  preview = "/images/placehold.png",
}: ThumbnailProps): React.ReactElement => {
  return (
    <img
      src={preview}
      alt=""
      className="object-contain w-full max-w-sm mr-0 bg-gray-800 aspect-video lg:mr-6 rounded-xl"
    />
  );
};

export default CourseThumbnail;
