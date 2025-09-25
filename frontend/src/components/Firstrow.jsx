import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Span,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import RainImg from "../assets/weather_images/rain.png";
import MapSvg from "../assets/map.svg?react";
import { useWeather } from "../weather/weather.js";
import { useMemo } from "react";

function Firstrow() {
  const { setCoords, postCoords, weatherData, loading, location, countryName } =
    useWeather();

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
  let humidity;
  humidity = React.useMemo(() => {
    if (!weatherData) return null;
    const nowTime = new Date(weatherData.current_weather.time).getTime();

    const hourlyTimes = weatherData.hourly.time.map((t) =>
      new Date(t).getTime()
    );

    let closestIdx = 0;
    let minDiff = Infinity;
    hourlyTimes.forEach((t, i) => {
      const diff = Math.abs(t - nowTime);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = i;
      }
    });
    humidity = weatherData.hourly.relative_humidity_2m[closestIdx];
    return humidity;
  }, [weatherData]);
  let curTemperature = React.useMemo(() => {
    if (!weatherData) return null;
    return weatherData.current_weather.temperature;
  }, [weatherData]);
  let curWindSpeed;
  curWindSpeed = React.useMemo(() => {
    if (!weatherData) return null;
    const nowTime = new Date(weatherData.current_weather.time).getTime();

    const hourlyTimes = weatherData.hourly.time.map((t) =>
      new Date(t).getTime()
    );

    let closestIdx = 0;
    let minDiff = Infinity;
    hourlyTimes.forEach((t, i) => {
      const diff = Math.abs(t - nowTime);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = i;
      }
    });
    curWindSpeed = weatherData.hourly.wind_speed_10m[closestIdx];
    return curWindSpeed;
  }, [weatherData]);
  let weatherCode;
  weatherCode = React.useMemo(() => {
    if (!weatherData) return null;
    return weatherData.current_weather.weathercode;
  }, [weatherData]);
  console.log(weatherData);
  console.log(weatherCode);
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
            <SimpleGrid columns={{ base: 2, sm: 5 }} gap="40px">
              <Image src={RainImg} alt="Rain" boxSize="64px" />
              <Flex flexDir="column">
                <Heading as="h1" fontSize="35px" mb={2} ms={"-5"}>
                  {weatherData
                    ? `${location[0].toUpperCase()}${location.slice(1)}`
                    : "Loading..."}
                </Heading>
                <Heading as="h2" ms={"-5"}>
                  {countryName}
                </Heading>
              </Flex>
              <Flex flexDir="column">
                <Heading as="h1" fontSize="35px" mb={2}>
                  {curTemperature}°
                </Heading>
                <Heading as="h2">Temperature</Heading>
              </Flex>
              <Flex flexDir="column">
                <Heading as="h1" fontSize="35px">
                  {humidity}
                  <Box as="span" fontSize="14px" verticalAlign="baseline">
                    %
                  </Box>
                </Heading>
                <Heading as="h2">Humidity</Heading>
              </Flex>
              <Flex flexDir="column">
                <Heading as="h1" fontSize="35px">
                  {curWindSpeed}
                  <Box as="span" fontSize="14px" verticalAlign="baseline">
                    km/h
                  </Box>
                </Heading>
                <Heading as="h2">Windspeed</Heading>
              </Flex>
            </SimpleGrid>
          </Box>

          <Box display={{ base: "none", sm: "block" }}>
            <MapSvg width="100%" height="100%" />
          </Box>
        </SimpleGrid>
      </Flex>
    </Container>
  );
}

export default Firstrow;
