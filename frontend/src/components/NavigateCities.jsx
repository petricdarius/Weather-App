import { Box, HStack, Radiomark } from "@chakra-ui/react";
import React from "react";
import { useColorMode } from "../components/ui/color-mode";
import { FaLocationArrow } from "react-icons/fa6";

function NavigateCities({ localCities }) {
  const { colorMode } = useColorMode();
  const { cities, handleNav, currentCity } = localCities;
  
  const bgGradient2 =
    colorMode === "light"
      ? "linear-gradient(135deg, #a2b0efff 0%, #d6e9ffff 100%)"
      : "linear-gradient(135deg, #1c3a50ff 0%, #294757ff 100%)";
  
  const activeBgGradient =
    colorMode === "light"
      ? "linear-gradient(135deg, #4a90e2 0%, #357abd 100%)"
      : "linear-gradient(135deg, #2d5f8b 0%, #1e3d59 100%)";

  const inactiveBgGradient =
    colorMode === "light"
      ? "linear-gradient(135deg, #d6e9ff 0%, #f1f5f9 100%)"
      : "linear-gradient(135deg, #163c50ff 0%, #1c1c1c 100%)";


  if (!cities || cities.length === 0) {
    return null;
  }

  return (
    <Box mt={5} display="flex" justifyContent="center">
      <HStack gap={4} p={5} borderRadius="25px" bg={bgGradient2}>
        {cities.map((city, index) => {
          const isActive = currentCity === city;
          const bg = isActive ? activeBgGradient : inactiveBgGradient;
          
          return index === 0 ? (
            <Box
              key={`${city}-${index}`}
              as={FaLocationArrow}
              cursor="pointer"
              bg={bg}
              p={1}
              borderRadius="50%"
              onClick={() => handleNav(index)}
              color={isActive ? "white" : "gray.500"}
              boxSize="24px"
              title={city}
            />
          ) : (
            <Radiomark
              key={`${city}-${index}`}
              cursor="pointer"
              bg={bg}
              p={2}
              borderRadius="50%"
              onClick={() => handleNav(index)}
              color={isActive ? "white" : "gray.500"}
              boxSize="24px"
              title={city}
            />
          );
        })}
      </HStack>
    </Box>
  );
}

export default NavigateCities;