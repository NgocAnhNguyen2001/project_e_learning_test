import {
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import * as React from 'react'

import { FieldWrapper } from '@/components/Form/FieldWrapper';
import { Input } from '@/features/Input/Input';

type ElementProps = {
  fieldWrapperProps?: any,
  inputProps?: any,
  readonly?: boolean,
};

export const Email = (props: ElementProps): React.ReactElement => {
  const {
    fieldWrapperProps,
    inputProps,
    readonly,
  } = props;
  return (
    <FormControl id="email">
      <FormLabel>Email</FormLabel>
      <FieldWrapper {...fieldWrapperProps}>
        <Input {...{
          inputProps,
          readonly,
        }}/>
      </FieldWrapper>
    </FormControl>
  )
}
