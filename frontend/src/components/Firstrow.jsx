import {
  Box,
  Container,
  Flex,
  GridItem,
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
import "leaflet/dist/leaflet.css";
import Map from "./Map.jsx?react";
import { useColorMode } from "../components/ui/color-mode";

function Firstrow() {
  const { setCoords, postCoords, weatherData, loading, location, countryName } =
    useWeather();
  let latitude, longitude;
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          latitude = lat;
          longitude = lng;
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
  let timeWeather;
  timeWeather = React.useMemo(() => {
    if (!weatherData) return null;
    return weatherData.hourly;
  }, [weatherData]);
  const { colorMode } = useColorMode();

  const bgGradient =
    colorMode === "light"
      ? "linear-gradient(135deg, #a2b0efff 0%, #764ba2 100%)"
      : "linear-gradient(135deg, #8197a3ff 0%, #1c1c1c 100%)";
  const bgGradient2 =
    colorMode === "light"
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : "linear-gradient(135deg, #163c50ff 0%, #1c1c1c 100%)";
  return (
    <Flex
      maxW={{
        base: "80%",
        sm: "90%",
      }}
      mx="auto"
      alignItems="center"
      justifyContent="space-between"
      flexDir={{ base: "column", sm: "row" }}
      gap={{ base: 10, sm: 8 }}
    >
      <Box flex={{ base: "1", sm: "0 0 60%" }}>
        <SimpleGrid
          py={11}
          px={10}
          columns={{ base: 2, sm: 5 }}
          boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
          rows={{ base: 2, sm: 2 }}
          overflow={"scroll"}
          scrollbarWidth={"none"}
          gap="40px"
          bg={bgGradient}
          borderRadius="30px"
        >
          <Image
            src={RainImg}
            alt="Rain"
            boxSize="64px"
            display={{ base: "none", sm: "block" }}
          />
          <Flex flexDir="column">
            <Heading as="h1" fontSize="35px" mb={2} ms={"-5"}>
              {weatherData ? location : "Loading..."}
            </Heading>
            <Heading as="h2" ms={"-5"}>
              {countryName}
            </Heading>
          </Flex>
          <Flex flexDir="column">
            <Heading as="h1" fontSize="35px" mb={2}>
              {curTemperature}°
            </Heading>
            <Heading as="h2">Temperatura</Heading>
          </Flex>
          <Flex flexDir="column">
            <Heading as="h1" fontSize="35px">
              {humidity}
              <Box as="span" fontSize="14px" verticalAlign="baseline">
                %
              </Box>
            </Heading>
            <Heading as="h2">Umiditate</Heading>
          </Flex>
          <Flex flexDir="column">
            <Heading as="h1" fontSize="35px">
              {curWindSpeed}
              <Box as="span" fontSize="14px" verticalAlign="baseline">
                km/h
              </Box>
            </Heading>
            <Heading as="h2">Viteza Vantului</Heading>
          </Flex>
          <GridItem colSpan={{ base: 2, sm: 5 }}>
            <Flex
              overflowX="auto"
              gap={4}
              w="100%"
              py={2}
              css={{
                "&::-webkit-scrollbar": {
                  width: "4px",
                },
                "&::-webkit-scrollbar-track": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  borderRadius: "24px",
                },
              }}
            >
              {timeWeather?.time.map((t, idx) => (
                <Flex
                  key={idx}
                  flex="0 0 auto"
                  flexDir="column"
                  bg={bgGradient2}
                  borderRadius="30px"
                  justify="center"
                  alignItems="center"
                  p={5}
                  minW="120px"
                >
                  <Heading
                    as="h1"
                    fontSize="25px"
                    lineHeight="1"
                    fontWeight={"light"}
                    m={0}
                    mb={2}
                  >
                    {t.slice(11)} {t.slice(11, 13) < 12 ? "AM" : "PM"}
                  </Heading>
                  <Image src={RainImg} alt="Rain" boxSize="64px" />
                  <Heading as="h1" fontSize="25px" lineHeight="1" m={0} mt={2}>
                    {timeWeather.temperature_2m[idx]}° C
                  </Heading>
                </Flex>
              ))}
            </Flex>
          </GridItem>
        </SimpleGrid>
      </Box>

      <Box
        flex={{ base: "1", sm: "0 0 40%" }}
        ms={{ base: 0, sm: 10 }}
        display={{ base: "block", sm: "block" }}
        w="100%"
      >
        <Box
          h="400px"
          p={5}
          borderRadius="30px"
          boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
          bg={bgGradient}
          display={{ base: "block", sm: "block" }}
        >
          <Map />
        </Box>
      </Box>
    </Flex>
  );
}

export default Firstrow;
