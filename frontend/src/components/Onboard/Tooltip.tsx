import React from "react";
import { TooltipRenderProps } from "react-joyride";

export const Tooltip = ({
  step,
  tooltipProps,
}: TooltipRenderProps): React.ReactElement => (
  <div
    {...tooltipProps}
    className="bg-white rounded-[20px] sm:rounded-[40px] rounded-br-sm sm:rounded-br-md px-6 sm:px-12 py-10 border-r-[10px] border-b-[10px] border-[#00C7B1]"
  >
    {step.title && <h1>{step.title}</h1>}
    <div>{step.content}</div>
  </div>
);
