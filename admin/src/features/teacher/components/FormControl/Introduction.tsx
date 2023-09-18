import {
  Box,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import * as React from 'react'

import { TextAreaInput } from '../../../Input/TextAreaInput';

import { FieldWrapper } from '@/components/Form/FieldWrapper';

type ElementProps = {
  fieldWrapperProps?: any,
  inputProps?: any,
  readonly?: boolean,
};

export const Introduction = (props: ElementProps): React.ReactElement => {
  const {
    fieldWrapperProps,
    inputProps,
    readonly,
  } = props;
  return (
    <FormControl id="introduction">
      <Box>
        <FormLabel variant="inline">Introduction</FormLabel>
        {/* {!readonly
          && <FormHelperText mt="0" color="muted">
            Write a short introduction about you
          </FormHelperText>
        } */}
      </Box>
      <FieldWrapper {...fieldWrapperProps}>
        <TextAreaInput {...{
          inputProps: {
            maxW: { md: '3xl' },
            rows: 5,
            resize: "none",
            ...inputProps,
          },
          readonly,
        }}/>
      </FieldWrapper>
    </FormControl>
  )
}
