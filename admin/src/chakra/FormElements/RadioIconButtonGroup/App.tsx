import { Box, Container, Stack } from '@chakra-ui/react'
import * as React from 'react'
import { FiAlignCenter, FiAlignLeft, FiAlignRight } from 'react-icons/fi'

import { RadioIconButton, RadioIconButtonGroup } from './RadioIconButtonGroup'

export const App = (): React.ReactElement => (
  <Box as="section" bg="bg-surface" py={{ base: '4', md: '8' }}>
    <Container maxW="lg">
      <Stack spacing="5">
        {['md', 'lg'].map((size) => (
          <RadioIconButtonGroup key={size} defaultValue="left" size={size}>
            <RadioIconButton
              value="left"
              aria-label="Align left"
              icon={<FiAlignLeft fontSize="1.25rem" />}
            />
            <RadioIconButton
              value="center"
              aria-label="Align center"
              icon={<FiAlignCenter fontSize="1.25rem" />}
            />
            <RadioIconButton
              value="right"
              aria-label="Align right"
              icon={<FiAlignRight fontSize="1.25rem" />}
            />
          </RadioIconButtonGroup>
        ))}
      </Stack>
    </Container>
  </Box>
)
