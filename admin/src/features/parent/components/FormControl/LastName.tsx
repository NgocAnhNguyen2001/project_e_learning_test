import {
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import * as React from 'react'

import { Input } from '../../../Input/Input';

import { FieldWrapper } from '@/components/Form/FieldWrapper';

type ElementProps = {
  fieldWrapperProps?: any,
  inputProps?: any,
  readonly?: boolean,
};

export const LastName = (props: ElementProps): React.ReactElement => {
  const {
    fieldWrapperProps,
    inputProps,
    readonly,
  } = props;
  return (
    <FormControl id="lastName">
      <FormLabel>Last Name</FormLabel>
      <FieldWrapper {...fieldWrapperProps}>
        <Input {...{
          inputProps,
          readonly,
        }}/>
      </FieldWrapper>
    </FormControl>
  )
}
