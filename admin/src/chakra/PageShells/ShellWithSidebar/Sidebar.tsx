// import { Icon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Divider,
  Flex,
  HStack,
  // Input,
  // InputGroup,
  // InputLeftElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import {
  FaBook,
  FaHome,
  FaRegSmile,
  FaUserAstronaut,
  FaUserCog,
  FaUserGraduate,
  FaUserTie,
  FaFlagCheckered,
  FaUsers,
} from "react-icons/fa";
import {
  // FiHelpCircle,
  FiLogOut,
  // FiSearch,
  // FiSettings,
  // FiTool,
  // FiUser,
} from "react-icons/fi";

// import { useDispatch } from "react-redux";
// import { setLogout } from "redux/reducers/authSlice";
import { IconContext } from "react-icons/lib";

import { useStore } from "utils/hooks/zustand";

import { NavButton } from "./NavButton";

import { Logo } from "@/chakra/PageShells/ShellWithSidebar/Logo";

interface SidebarProps {
  path?: string;
}

export const Sidebar = (props: SidebarProps): React.ReactElement => {
  const { path } = props;

  const user = useStore((state): any => state.user);
  const logout = useStore((state): any => state.logout);

  const router = useRouter();

  // const dispatch = useDispatch();
  function logoutHandler(): void {
    // dispatch(setLogout());
    logout();
    const returnUrl = (router.query.returnUrl as string) || "/";
    router.push(returnUrl);
  }

  return (
    <>
      <Flex minH="100vh">
        <Flex
          w={{ base: "full", sm: "2xs" }}
          py={{ base: "6", sm: "8" }}
          px={{ base: "4", sm: "6" }}
        ></Flex>
      </Flex>
      <Flex as="section" minH="100vh" bg="bg-canvas" pos={"fixed"}>
        <Flex
          flex="1"
          bg="bg-surface"
          overflowY="auto"
          boxShadow={useColorModeValue("sm", "sm-dark")}
          w={{ base: "full", sm: "2xs" }}
          py={{ base: "6", sm: "8" }}
          px={{ base: "4", sm: "6" }}
        >
          <Stack justify="space-between" spacing="1">
            <Stack spacing={{ base: "5", sm: "6" }} shouldWrapChildren>
              <Logo />
              {/* <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FiSearch} color="muted" boxSize="5" />
                </InputLeftElement>
                <Input placeholder="Search" />
              </InputGroup> */}
              <Stack spacing="1">
                <NavButton
                  label="Home"
                  icon={FaHome}
                  href="/"
                  aria-current={path === "/" ? "page" : "false"}
                />
                {/* <NavButton
                label="Dashboard"
                icon={FiBarChart2}
                href="/dashboard"
                aria-current={`${path === "/dashboard" ? "page" : "false"}`}
              /> */}
                <NavButton
                  label="Teachers"
                  icon={FaUserGraduate}
                  href="/teachers"
                  aria-current={path === "/teachers" ? "page" : "false"}
                />
                <NavButton
                  label="Parents"
                  icon={FaUserTie}
                  href="/parents"
                  aria-current={path === "/parents" ? "page" : "false"}
                />
                <NavButton
                  label="Students"
                  icon={FaUserAstronaut}
                  href="/students"
                  aria-current={path === "/students" ? "page" : "false"}
                />
                <NavButton
                  label="Courses"
                  icon={FaBook}
                  href="/courses"
                  aria-current={path === "/courses" ? "page" : "false"}
                />
                <NavButton
                  label="Challenges"
                  icon={FaFlagCheckered}
                  href="/challenges"
                  aria-current={path === "/challenges" ? "page" : "false"}
                />
                <NavButton
                  label="Avatars"
                  icon={FaRegSmile}
                  href="/avatars"
                  aria-current={path === "/avatars" ? "page" : "false"}
                />
                <NavButton
                  label="Forum"
                  icon={FaUsers}
                  href="/forum"
                  aria-current={path === "/forum" ? "page" : "false"}
                />
                {/* <NavButton
                label="Menu"
                icon={FiBookOpen}
                href="/menu"
                aria-current={`${path === "/menu" ? "page" : "false"}`}
              />
              <NavButton
                label="Revenue Center"
                icon={FiBox}
                href="/revenue-center"
                aria-current={`${
                  path === "/revenue-center" ? "page" : "false"
                }`}
              /> */}
              </Stack>
            </Stack>
            <Stack spacing={{ base: "5", sm: "6" }}>
              {/* <Stack spacing="1">
                <NavButton label="Help" href="/" icon={FiHelpCircle} />
                <NavButton label="Settings" href="/" icon={FiSettings} />
              </Stack> */}
              {/* <Box bg="bg-subtle" px="4" py="5" borderRadius="lg">
              <Stack spacing="4">
                <Stack spacing="1">
                  <Text fontSize="sm" fontWeight="medium">
                    Almost there
                  </Text>
                  <Text fontSize="sm" color="muted">
                    Fill in some more information about you and your person.
                  </Text>
                </Stack>
                <Progress
                  value={80}
                  size="sm"
                  aria-label="Profile Update Progress"
                />
                <HStack spacing="3">
                  <Button variant="link" size="sm">
                    Dismiss
                  </Button>
                  <Button variant="link" size="sm" colorScheme="blue">
                    Update profile
                  </Button>
                </HStack>
              </Stack>
            </Box> */}
              <Divider />
              {/* <UserProfile
              name="Christoph Winston"
              image="https://tinyurl.com/yhkm2ek8"
              email="chris@chakra-ui.com"
            /> */}
              <Menu>
                <MenuButton>
                  <HStack spacing="3" ps="2">
                    <IconContext.Provider value={{ color: "white" }}>
                      <Avatar boxSize="10" icon={<FaUserCog />} />
                    </IconContext.Provider>
                    <Box>
                      <Text fontWeight="medium" fontSize="sm">
                        {`${user?.firstName} ${user?.lastName}`}
                      </Text>
                      <Text color="muted" fontSize="sm">
                        {user?.admin?.email}
                      </Text>
                    </Box>
                  </HStack>
                </MenuButton>
                <MenuList marginBottom={4}>
                  <MenuGroup title="Profile">
                    {/* <Link href="/profile" passHref>
                      <MenuItem icon={<FiUser />}>
                        <a>My Account</a>
                      </MenuItem>
                    </Link> */}
                    <MenuItem icon={<FiLogOut />} onClick={logoutHandler}>
                      Sign Out
                    </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  {/* <MenuGroup title="Help">
                    <MenuItem icon={<FiSettings />}>Account Settings</MenuItem>
                    <MenuItem icon={<FiTool />}>FAQ</MenuItem>
                  </MenuGroup> */}
                </MenuList>
              </Menu>
            </Stack>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
};
