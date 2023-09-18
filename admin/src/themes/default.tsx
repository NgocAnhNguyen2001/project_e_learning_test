import {
  theme as proTheme
} from "@chakra-ui/pro-theme";
import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: { ...proTheme.colors, brand: proTheme.colors.blue },
  // components: {
  //   Button: {
  //     variants: {
  //       primary: {
  //         color: proTheme.colors.black,
  //         background: proTheme.colors.blue,
  //       },
  //     },
  //   },
  // },
}, proTheme);
