import * as React from "react";
import {
  Control,
  Controller,
  FieldValues,
  UseFormSetValue,
} from "react-hook-form";
import PatternLock from "react-pattern-lock";

type PatternFieldProps = {
  label?: string;
  className?: string;
  control: Control<FieldValues, object>;
  setValue?: UseFormSetValue<FieldValues>;
  fieldName?: string;
  disabled?: boolean;
};

export type PatternFieldPassThroughProps = Omit<
  PatternFieldProps,
  "className" | "children"
>;

export const PatternField = (props: PatternFieldProps): React.ReactElement => {
  // const [debounced, setDebounced] = React.useState(true);
  // const [timeoutFunc, setTimeoutFunc] = React.useState<any>(null);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    setReady(true);
  }, []);

  return (
    <Controller
      control={props.control}
      name={props.label || "patternLock"}
      defaultValue={[]}
      render={({ field }): React.ReactElement => {
        return typeof window !== "undefined" && ready ? (
          <PatternLock
            width={300}
            pointSize={15}
            pointActiveSize={60}
            connectorThickness={10}
            size={3}
            path={field.value}
            className={props.className}
            disabled={props.disabled || false}
            onChange={(pattern): void => {
              // If they click again while the timeout debounce is set, we remove it
              // if (timeoutFunc) {
              //   clearTimeout(timeoutFunc);
              //   setTimeoutFunc(null);
              // }

              /**
                  * We basically reset the pattern lock if they click again after 1 second
                    This removes the need for a reset button & improves UX
                    as the current component will keep continuing 🙅‍♂️
                 */
              // if (debounced) {
              //   field.onChange([]);
              //   field.value = [];
              //   if (props.setValue) {
              //     props.setValue(props.fieldName || "loginPattern", "");
              //   }
              //   setDebounced(false);
              // } else {
              //   if (props.setValue) {
              //     props.setValue(
              //       props.fieldName || "loginPattern",
              //       pattern.join(""),
              //     );
              //   }
              //   field.onChange(pattern);
              // }
              if (props.setValue) {
                props.setValue(
                  props.fieldName || "loginPattern",
                  pattern.join(""),
                );
              }
              field.onChange(pattern);
            }}
            onFinish={(): void => {
              /**
               * After they finish, we debounce for 1 seconds before resetting the debounced state
               */
              // setTimeoutFunc(
              //   setTimeout(() => {
              //     setDebounced(true);
              //   }, 1000),
              // );
            }}
          />
        ) : (
          <></>
        );
      }}
    />
  );
};
