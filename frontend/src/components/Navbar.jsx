import React from "react";
import {
  Container,
  Flex,
  Text,
  HStack,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { TiAdjustBrightness } from "react-icons/ti";
import { CgAddR } from "react-icons/cg";
import { IoMoon } from "react-icons/io5";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW="1140" px={6}>
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDir={{ base: "row", sm: "row" }}
      >
        <Text
          fontSize={{ base: "26", sm: "34" }}
          fontWeight={"bold"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          <Link to={"/"}>Imageit</Link>
        </Text>
        <HStack spacing="14px">
          <Button>
            <Link to={"/create"}>
              <CgAddR size="18" />
            </Link>
          </Button>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? (
              <IoMoon size={20} />
            ) : (
              <TiAdjustBrightness size="22" />
            )}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
