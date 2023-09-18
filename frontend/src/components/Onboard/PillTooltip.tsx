import React from "react";
import { TooltipRenderProps } from "react-joyride";

export const PillTooltip = ({
  step,
  tooltipProps,
}: TooltipRenderProps): React.ReactElement => (
  <div
    {...tooltipProps}
    className="bg-white rounded-full px-8 py-6 shadow-[inset_0_-4px_0_0_#8500A4]"
  >
    {step.title && <h1>{step.title}</h1>}
    <div>{step.content}</div>
  </div>
);
