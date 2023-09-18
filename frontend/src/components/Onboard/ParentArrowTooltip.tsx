import React from "react";
import { TooltipRenderProps } from "react-joyride";

export const ParentArrowTooltip = ({
  step,
  tooltipProps,
}: TooltipRenderProps): React.ReactElement => (
  <div
    {...tooltipProps}
    className="bg-[#00C7B1] text-white rounded-[20px] sm:rounded-[40px] px-6 sm:px-12 py-10 "
  >
    {step.title && <h1>{step.title}</h1>}
    <div>{step.content}</div>
  </div>
);
