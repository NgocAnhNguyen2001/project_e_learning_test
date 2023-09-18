import {
  Box,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import * as React from 'react'

import { FieldWrapper } from '@/components/Form/FieldWrapper';
import { TextAreaInput } from '@/features/Input/TextAreaInput';

type ElementProps = {
  fieldWrapperProps?: any,
  inputProps?: any,
  readonly?: boolean,
};

export const Bio = (props: ElementProps): React.ReactElement => {
  const {
    fieldWrapperProps,
    inputProps,
    readonly,
  } = props;
  return (
    <FormControl id="ubiosername">
      <Box>
        <FormLabel variant="inline">Bio</FormLabel>
        {/* {!readonly
          && <FormHelperText mt="0" color="muted">
            Write a bio about you
          </FormHelperText>
        } */}
      </Box>
      <FieldWrapper {...fieldWrapperProps}>
        <TextAreaInput {...{
          inputProps,
          readonly,
          maxW: { md: '3xl' },
          rows: 5,
          resize: "none",
        }}/>
      </FieldWrapper>
    </FormControl>
  )
}
