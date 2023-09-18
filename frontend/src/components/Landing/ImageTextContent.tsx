import React from "react";

interface ImageTextContentProps {
  children?: any;
  title?: string;
  imgUrl?: string;
  className?: string;
}

export const ImageTextContent = ({
  children,
  title,
  imgUrl,
  className,
}: ImageTextContentProps): React.ReactElement => {
  return (
    <div className={className}>
      <div className="container px-6 pt-24 mx-auto space-y-12 lg:px-8 lg:pt-32">
        <p className="text-xl font-bold text-center text-white md:text-3xl">
          {title}
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <div>{imgUrl && <img src={imgUrl} alt="" />}</div>
          <div className="space-y-6 text-white">{children}</div>
        </div>
      </div>
    </div>
  );
};
