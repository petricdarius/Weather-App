import { Box, Button, HStack, Heading, Radiomark } from "@chakra-ui/react";
import React from "react";
import { useColorMode } from "../components/ui/color-mode";
import { useLocalCities } from "../weather/fetchLocalCities.js";
import { useMemo } from "react";
function NavigateCities() {
  const { colorMode } = useColorMode();
  const { cities, handleNav, currentCity } = useLocalCities();
  const bgGradient2 =
    colorMode === "light"
      ? "linear-gradient(135deg, #a2b0efff 0%, #d6e9ffff 100%)"
      : "linear-gradient(135deg, #1c3a50ff 0%, #294757ff 100%)";
  const bgGradient =
    colorMode === "light"
      ? "linear-gradient(135deg, #d6e9ff 0%, #f1f5f9 100%)"
      : "linear-gradient(135deg, #163c50ff 0%, #1c1c1c 100%)";
  return (
    <Box mt={5} display="flex" justifyContent="center">
      <HStack gap={4} p={5} borderRadius="25px" bg={bgGradient2}>
        {cities.map((city, index) => (
          <Radiomark
            key={index}
            variant="outline"
            cursor="pointer"
            bg={bgGradient}
            onClick={() => handleNav(index)}
            filled={currentCity === city} // ⚠️ evidențiază city-ul curent
          />
        ))}
      </HStack>
    </Box>
  );
}

export default NavigateCities;
