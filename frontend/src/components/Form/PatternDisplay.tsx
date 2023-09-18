import * as React from "react";
import PatternLock from "react-pattern-lock";

type PatternDisplayProps = {
  className?: string;
  value: number[];
};

export type PatternDisplayPassThroughProps = Omit<
  PatternDisplayProps,
  "className" | "children"
>;

export const PatternDisplay = (
  props: PatternDisplayProps,
): React.ReactElement => {
  return (
    <PatternLock
      width={120}
      pointSize={5}
      pointActiveSize={30}
      connectorThickness={4}
      size={3}
      path={props.value}
      className={props.className + " display"}
      disabled={true}
      onChange={(): void => {
        // nothing
      }}
      onFinish={(): void => {
        // nothing
      }}
    />
  );
};
