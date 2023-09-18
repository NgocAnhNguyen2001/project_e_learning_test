import { FormControl, FormLabel, Switch } from "@chakra-ui/react";
import * as React from "react";

import { FieldWrapper } from "@/components/Form/FieldWrapper";

type ElementProps = {
  fieldWrapperProps?: any;
  inputProps?: any;
  readonly?: boolean;
};

export const Verified = (props: ElementProps): React.ReactElement => {
  const { fieldWrapperProps, inputProps, readonly } = props;
  return (
    <FormControl id="verified">
      <FormLabel>Verified</FormLabel>
      <FieldWrapper {...fieldWrapperProps}>
        <Switch
          id="is_active"
          // placeholder="asset label"
          {...inputProps}
          disabled={readonly}
        />
      </FieldWrapper>
    </FormControl>
  );
};
