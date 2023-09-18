import React from "react";

interface IAppLayout {
  children?: React.ReactChild | React.ReactChild[];
}

export const DarkBackground = ({
  children,
}: IAppLayout): React.ReactElement => {
  return (
    <div className="relative min-h-screen bg-bottom bg-fixed bg-no-repeat bg-cover bg-auth-dark">
      <div className="absolute top-0 left-0 z-0 w-full h-full bg-dark-overlay bg-opacity-80" />
      {children}
    </div>
  );
};
