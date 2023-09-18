import React from "react";
import { HiFlag } from "react-icons/hi";

interface IProps {
  type: "success" | "error";
}

export const ReportButton = ({ type }: IProps): React.ReactElement => {
  return (
    <button className="flex flex-row items-center mr-6 font-sans">
      <HiFlag
        color={type === "success" ? "58A700" : "EA2B2B"}
        opacity={0.7}
        className="w-6 h-6 mr-2"
      />
      <p
        className={`hidden md:block uppercase font-bold text-md opacity-70 ${
          type === "success" ? "text-success-text" : "text-error-text"
        }`}
      >
        Report
      </p>
    </button>
  );
};
