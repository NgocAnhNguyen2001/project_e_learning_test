import {
  Textarea,
} from '@chakra-ui/react'
import * as React from 'react'

type ElementProps = {
  inputProps?: any,
  readonly?: boolean,
};

export const TextAreaInput = (props: ElementProps): React.ReactElement => {
  const {
    inputProps,
    readonly,
  } = props;
  return (
    <Textarea
      {...{
        borderColor: readonly && 'transparent',
        readOnly: readonly,
      }}
      {...inputProps}
    />
  )
}
