import { Box, Container, Flex, Heading, Image, SimpleGrid } from "@chakra-ui/react";
import React, { useEffect } from "react";
import RainImg from "../assets/rain.png";
import MapSvg from "../assets/map.svg?react";
import { useWeather } from "../weather/weather.js";

function Firstrow() {
  const { setCoords, postCoords, weatherData, loading, location,countryName } = useWeather();
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setCoords(lat, lng);
          await postCoords(lat, lng);
        },
        (err) => console.error("Geolocation error:", err)
      );
    }
  }, []);

  return (
    <Container>
      <Flex
        w="100%"
        alignItems="center"
        justifyContent="space-between"
        flexDir={{ base: "column", sm: "row" }}
      >
        <SimpleGrid columns={{ base: 1, sm: 2 }} gap="20px">
          <Box h="200px">
            <Flex gap="20px">
              <Image src={RainImg} alt="Rain" boxSize="64px" />
              <Heading as="h1">
                {weatherData ? `${location}: ${weatherData.current_weather.temperature}°` : "Loading..."}
              </Heading>

            </Flex>
          </Box>
          <MapSvg style={{ width: "100%", height: "100%" }} />
        </SimpleGrid>
      </Flex>
    </Container>
  );
}

export default Firstrow;
