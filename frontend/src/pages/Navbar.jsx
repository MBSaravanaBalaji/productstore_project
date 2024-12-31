import { CiSquarePlus } from "react-icons/ci";
import { Button, Container, Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import { Link } from "react-router-dom";
import { useColorMode } from "@/components/ui/color-mode";
import { FaSun } from "react-icons/fa";

const Navbar = () => { 
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Link
          to="/"
          style={{ textDecoration: "none" }} // Remove default underline
        >
          <span
            style={{
              fontSize: "35px",
              fontWeight: "bold",
              textTransform: "uppercase",
              background: "linear-gradient(to right,#7928CA, #FF0080)", // Replace colors with Chakra's cyan.400 and blue.500 equivalents
              WebkitBackgroundClip: "text",
              color: "transparent",
              display: "block",
              textAlign: "center",
            }}
          >
            Product Store 🛒
          </span>
        </Link>

        <HStack spacing={2} alignItems={"center"}>
          <Link to="/create">
            <Button>
              <CiSquarePlus fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
          <FaSun fontSize={20} />
          </Button>

        </HStack>
      </Flex>
    </Container>
  );
};
export default Navbar;