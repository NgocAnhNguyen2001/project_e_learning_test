import {
  Container,
  Stack,
  Text,
} from "@chakra-ui/react";
import * as React from "react";

import { Logo } from "@/components/General/Logo";

export const Footer = (): React.ReactElement => (
  <Container as="footer" role="contentinfo" py={{ base: "12", md: "16" }} marginTop="auto">
    <Stack spacing={{ base: "4", md: "5" }}>
      <Stack justify="space-between" direction="row" align="center">
        <Logo />
        {/* <ButtonGroup variant="ghost">
          <IconButton
            as="a"
            href="#"
            aria-label="LinkedIn"
            icon={<FaLinkedin fontSize="1.25rem" />}
          />
          <IconButton
            as="a"
            href="#"
            aria-label="GitHub"
            icon={<FaGithub fontSize="1.25rem" />}
          />
          <IconButton
            as="a"
            href="#"
            aria-label="Twitter"
            icon={<FaTwitter fontSize="1.25rem" />}
          />
        </ButtonGroup> */}
      </Stack>
      <Text fontSize="sm" color="subtle">
        { `© ${new Date().getFullYear()} NovaLearn` }
      </Text>
    </Stack>
  </Container>
);
