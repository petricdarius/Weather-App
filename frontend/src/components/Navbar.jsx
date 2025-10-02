import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { useColorMode } from "../components/ui/color-mode";
import { LuMoon, LuSun } from "react-icons/lu";

const Navbar = ({ localCities }) => {
  const { currentCity, cities, inputCity, setInputCity, handleAddCity } =
    localCities;

  const { colorMode, toggleColorMode } = useColorMode();
  const now = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const locale = "ro-RO";
  const formattedDate = new Intl.DateTimeFormat(locale, options).format(now);

  return (
    <Container maxW={"90%"} px={4}>
      <Flex
        w="100%"
        alignItems="center"
        h={16}
        justifyContent="space-between"
        flexDir={{ base: "column", sm: "row" }}
      >
        <Heading as="h1">
          {formattedDate[0].toUpperCase() + formattedDate.slice(1)}
        </Heading>

        <HStack spacing={2}>
          <Input
            name="city"
            maxW={{ base: "100px", sm: "200px" }}
            placeholder="⌕ Oras sau cod postal"
            borderRadius="20px"
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddCity();
            }}
            border="1px solid"
            boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
            _placeholder={{ color: colorMode === "light" ? "black" : "white" }}
          />

          <Button
            colorScheme={colorMode === "light" ? "purple" : "yellow"}
            variant="outline"
            size="md"
            borderRadius="full"
            onClick={toggleColorMode}
          >
            {colorMode === "light" ? <LuMoon /> : <LuSun />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
