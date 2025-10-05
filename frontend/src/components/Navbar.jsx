import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Input,
  Stack,
  DataList,
} from "@chakra-ui/react";
import React from "react";
import { useColours } from "../assets/css/Colours";
import { useColorMode } from "../components/ui/color-mode";
import { LuMoon, LuSun } from "react-icons/lu";
import { useWeather } from "../weather/weather";

const Navbar = ({ localCities }) => {
  const { currentCity, cities, inputCity, setInputCity, handleAddCity } =
    localCities;
  const { searchlocation, filteredCities } = useWeather();
  const { colorMode, toggleColorMode } = useColorMode();
  const { bgGradient2 } = useColours();
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
        <Flex
          w="100%"
          alignItems="center"
          h="auto"
          justifyContent={{ base: "center", sm: "space-between" }}
          flexDir={{ base: "column", sm: "row" }}
          position="relative"
          textAlign="center"
          py={2}
        >
          <Heading as="h1" mt={2}>
            {formattedDate[0].toUpperCase() + formattedDate.slice(1)}
          </Heading>

          <Button
            display={{ base: "block", sm: "none" }}
            position="absolute"
            right="-10%"
            top="10px"
            colorScheme={colorMode === "light" ? "purple" : "yellow"}
            variant="outline"
            size="md"
            borderRadius="full"
            onClick={toggleColorMode}
          >
            {colorMode === "light" ? <LuMoon /> : <LuSun />}
          </Button>

          <HStack spacing={2} mt={{ base: 4, sm: 3 }}>
            <Flex flexDir={"column"}>
              <Input
                name="city"
                maxW={{ base: "200px", sm: "200px" }}
                placeholder="⌕   Oras sau cod postal"
                borderRadius="20px"
                value={inputCity}
                onChange={(e) => {
                  searchlocation(e.target.value);
                  setInputCity(e.target.value);
                }}
                border="1px solid"
                boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
                _placeholder={{
                  color: colorMode === "light" ? "black" : "white",
                }}
              />
              <Stack zIndex={10} gap="4" bg={bgGradient2} borderRadius={"20px"}>
                <DataList.Root
                  size="lg"
                  zIndex={10}
                  p={inputCity.length && 3}
                >
                  {inputCity.length > 0 &&
                    filteredCities?.map((city, index) => (
                      <DataList.Item key={index}>
                        <DataList.ItemValue
                        cursor={"pointer"}
                          onClick={() => {
                            setInputCity(city?.name);
                            handleAddCity();
                          }}
                        >
                          {city?.name}
                        </DataList.ItemValue>
                      </DataList.Item>
                    ))}
                </DataList.Root>
              </Stack>
            </Flex>
            <Button
              colorScheme={colorMode === "light" ? "purple" : "yellow"}
              variant="outline"
              size="md"
              borderRadius="full"
              onClick={toggleColorMode}
              display={{ base: "none", sm: "block" }}
            >
              {colorMode === "light" ? <LuMoon /> : <LuSun />}
            </Button>
          </HStack>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Navbar;
