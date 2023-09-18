import {
  Select,
} from '@chakra-ui/react'
import * as React from 'react'

type ElementProps = {
  inputProps?: any,
  readonly?: boolean,
  children?: React.ReactElement[],
};

export const SelectInput = (props: ElementProps): React.ReactElement => {
  const {
    inputProps,
    readonly,
    children,
  } = props;
  return (
    <Select
      {...{
        borderColor: readonly && 'transparent',
        iconColor: readonly && 'transparent',
        pointerEvents: readonly && 'none',
      }}
      {...inputProps}
    >
      {children}
    </Select>
  );
}
