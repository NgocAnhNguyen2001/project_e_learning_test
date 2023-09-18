import React from "react";

const DividerWithObject: React.FC = ({ children }): React.ReactElement => {
  return (
    <div className="relative flex items-center">
      <div className="flex-grow border-t border-white"></div>
      {children}
      <div className="flex-grow border-t border-white"></div>
    </div>
  );
};

export default DividerWithObject;
