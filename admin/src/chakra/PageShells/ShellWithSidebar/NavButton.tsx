import { As, Button, ButtonProps, HStack, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import * as React from "react";

interface NavButtonProps extends ButtonProps {
  icon: As;
  label: string;
  href: string;
}

export const NavButton = (props: NavButtonProps): React.ReactElement => {
  const { icon, label, href, ...buttonProps } = props;
  return (
    <Link href={href} passHref>
      <Button variant="ghost" justifyContent="start" {...buttonProps}>
        <a>
          <HStack spacing="3">
            <Icon as={icon} boxSize="6" color="subtle" />
            <Text>{label}</Text>
          </HStack>
        </a>
      </Button>
    </Link>
  );
};
