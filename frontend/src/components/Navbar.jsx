import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useColorMode } from "../components/ui/color-mode";
import { LuMoon, LuSun } from "react-icons/lu";
import { Switch } from "@chakra-ui/react";
import { useEffect } from "react";
import { useWeather } from "../weather/weather.js";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { location, postLocation, weatherData } = useWeather();
  const now = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const [unit, setUnit] = useState("C");
  const [city, input] = useState({
    city: "",
  });
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
            value={city.city}
            onChange={(e) => input({ city: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                postLocation(city.city); 
                input({ city: "" }); 
              }
            }}
            border={"1px solid"}
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
          <Flex
            align="center"
            borderRadius="full"
            overflow="hidden"
            border="1px solid"
            borderColor={colorMode === "light" ? "purple.500" : "yellow.400"}
          >
            <Button
              flex="1"
              bg={
                unit === "C"
                  ? colorMode === "light"
                    ? "purple.500"
                    : "yellow.400"
                  : "transparent"
              }
              color={unit === "C" ? "white" : "inherit"}
              borderRadius={0}
              onClick={() => setUnit("C")}
            >
              °C
            </Button>
            <Button
              flex="1"
              bg={
                unit === "F"
                  ? colorMode === "light"
                    ? "purple.500"
                    : "yellow.400"
                  : "transparent"
              }
              color={unit === "F" ? "white" : "inherit"}
              borderRadius={0}
              onClick={() => setUnit("F")}
            >
              °F
            </Button>
          </Flex>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
