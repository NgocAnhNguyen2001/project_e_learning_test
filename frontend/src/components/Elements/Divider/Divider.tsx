import * as React from "react";

interface IDividerProps {
  className?: string;
}

export const Divider = ({
  className,
}: IDividerProps): React.ReactElement => {
  return (
    <div className={`w-full border-b-2 border-b-gray-300 border-opacity-40 ${className}`} />
  );
};

export default Divider;
