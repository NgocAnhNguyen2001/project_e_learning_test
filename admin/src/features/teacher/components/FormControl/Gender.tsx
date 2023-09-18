import {
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import * as React from 'react'

import { SelectInput } from '../../../Input/SelectInput';

import { FieldWrapper } from '@/components/Form/FieldWrapper';

type ElementProps = {
  fieldWrapperProps?: any,
  inputProps?: any,
  readonly?: boolean,
};

export const Gender = (props: ElementProps): React.ReactElement => {
  const {
    fieldWrapperProps,
    inputProps,
    readonly,
  } = props;
  return (
    <FormControl id="Gender">
      <FormLabel>Gender</FormLabel>
      <FieldWrapper {...fieldWrapperProps}>
        <SelectInput {...{
          inputProps,
          readonly,
          
        }}>
          <option value="F">Female</option>
          <option value="M">Male</option>
          <option value="OTHERS">Others</option>
        </SelectInput>
      </FieldWrapper>
    </FormControl>
  )
}
