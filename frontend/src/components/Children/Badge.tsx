import * as React from "react";

interface IBadgeProps {
  title: string;
  description: string;
}

export const Badge = (props: IBadgeProps): React.ReactElement => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src="/images/profile/badge.png" alt="badge" className="mb-4" />
      <h1 className="font-bold opacity-80 mb-2 text-sm lg:text-base">
        {props.title}
      </h1>
      <h2 className="font-bold opacity-60 text-sm lg:text-base">
        {props.description}
      </h2>
    </div>
  );
};

export default Badge;
