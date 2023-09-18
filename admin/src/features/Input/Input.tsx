import {
  Input as InputChakra,
} from '@chakra-ui/react'
import * as React from 'react'

type ElementProps = {
  inputProps?: any,
  readonly?: boolean,
};

export const Input = (props: ElementProps): React.ReactElement => {
  const {
    inputProps,
    readonly,
  } = props;
  return (
    <InputChakra
      {...{
        borderColor: readonly && 'transparent',
        readOnly: readonly,
      }}
      {...inputProps}
    />
  )
}
