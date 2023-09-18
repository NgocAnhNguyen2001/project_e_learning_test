import * as React from "react";
import { SVGProps } from "react";

const CollapseIcon = (props: SVGProps<SVGSVGElement>): React.ReactElement => (
  <svg
    width={48}
    height={48}
    fill="current"
    stroke="current"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M45 22.5h-3v-12H19.5v-3H42a3.003 3.003 0 0 1 3 3v12Z"
      fill="current"
    />
    <path
      d="M37.5 30h-3V18H12v-3h22.5a3.003 3.003 0 0 1 3 3v12Z"
      fill="current"
    />
    <path
      d="M27 40.5H6a3.003 3.003 0 0 1-3-3v-12a3.003 3.003 0 0 1 3-3h21a3.003 3.003 0 0 1 3 3v12a3.003 3.003 0 0 1-3 3Zm-21-15v12h21.002L27 25.5H6Z"
      fill="current"
    />
  </svg>
);

export default CollapseIcon;
