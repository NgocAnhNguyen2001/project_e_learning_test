import {
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import * as React from 'react'

import { FieldWrapper } from '@/components/Form/FieldWrapper';
import { DataListInput } from '@/features/Input/DataListInput';

type ElementProps = {
  fieldWrapperProps?: any,
  inputProps?: any,
  readonly?: boolean,
};

export const ParentEmail = (props: ElementProps): React.ReactElement => {
  const {
    fieldWrapperProps,
    inputProps,
    readonly,
  } = props;
  return (
    <FormControl id="parentEmail">
      <FormLabel>Parent Email</FormLabel>
      <FieldWrapper {...fieldWrapperProps}>
        <DataListInput {...{
          inputProps,
          readonly,
          datalistId: 'parentEmail',
        }}/>
      </FieldWrapper>
    </FormControl>
  )
}
