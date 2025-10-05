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
import "../assets/css/style.css";
import { useColours } from "../assets/css/Colours.jsx";
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
  const { bgGradient, bgGradient2 } = useColours();
  let nowTime = weatherData?.current_weather.time.slice(11, 16);
  nowTime = nowTime?.replace(`${nowTime[3]}${nowTime[4]}`, "00");
  const startIndex = React.useMemo(() => {
    if (!timeWeather) return 0;

    const nowDate = new Date(weatherData.current_weather.time).getTime();
    const hourlyTimes = timeWeather.time.map((t) => new Date(t).getTime());

    let closestIdx = 0;
    let minDiff = Infinity;

    hourlyTimes.forEach((t, i) => {
      const diff = Math.abs(t - nowDate);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = i;
      }
    });

    return closestIdx;
  }, [timeWeather, weatherData]);
  return (
    <Flex
      maxW={{
        base: "80%",
        sm: "90%",
      }}
      mx="auto"
      alignItems="stretch"
      justifyContent="space-between"
      flexDir={{ base: "column", sm: "row" }}
      gap={{ base: 10, sm: "5%" }}
      mt={{
        base: 5,
        sm: 0,
      }}
    >
      <Box flex={{ base: "1", sm: "0 0 60%" }}>
        <SimpleGrid
          border="1px solid rgba(0,0,0,0.08)"
          py={11}
          px={10}
          columns={{ base: 1, sm: 5 }}
          boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
          gap="40px"
          bg={bgGradient}
          borderRadius="30px"
          h="100%"
        >
          <Image
            src={RainImg}
            alt="Rain"
            boxSize={{
              sm: "64px",
              base: "100px",
            }}
            display="block"
            className="grid_item"
          />
          <Flex flexDir="column" className="grid_item">
            <Heading as="h1" fontSize="35px" mb={2}>
              {weatherData ? location : "Loading..."}
            </Heading>
            <Heading as="h2">{countryName}</Heading>
          </Flex>
          <Flex flexDir="column" className="grid_item">
            <Heading as="h1" fontSize="35px" mb={2}>
              {curTemperature}°
              <Box as="span" fontSize="14px" verticalAlign="baseline">
                C
              </Box>
            </Heading>
            <Heading as="h2">Temperatura</Heading>
          </Flex>

          <Flex flexDir="column" className="grid_item">
            <Heading as="h1" fontSize="35px">
              {humidity}
              <Box as="span" fontSize="14px" verticalAlign="baseline">
                %
              </Box>
            </Heading>
            <Heading as="h2">Umiditate</Heading>
          </Flex>

          <Flex flexDir="column" className="grid_item">
            <Heading as="h1" fontSize="35px">
              {curWindSpeed}
              <Box as="span" fontSize="14px" verticalAlign="baseline">
                km/h
              </Box>
            </Heading>
            <Heading as="h2">Viteza Vantului</Heading>
          </Flex>

          <GridItem colSpan={{ base: 1, sm: 5 }}>
            <Flex
              overflowX="auto"
              gap={4}
              w="100%"
              py={2}
              css={{
                "&::-webkit-scrollbar": { width: "4px" },
                "&::-webkit-scrollbar-track": { width: "6px" },
                "&::-webkit-scrollbar-thumb": { borderRadius: "24px" },
              }}
            >
              {timeWeather?.time.slice(startIndex).map(
                (t, idx) =>
                  idx <= 23 && (
                    <Flex
                      key={idx}
                      flex="0 0 auto"
                      flexDir="column"
                      bg={bgGradient2}
                      borderRadius="30px"
                      justify="center"
                      alignItems="center"
                      p={5}
                      minW="90px" // important, ca toate cardurile să fie vizibile în scroll
                    >
                      <Heading
                        as="h1"
                        fontSize="20px"
                        lineHeight="1"
                        fontWeight={"light"}
                        m={0}
                        mb={4}
                      >
                        {t.slice(11)}
                      </Heading>
                      <Image src={RainImg} alt="Rain" boxSize="44px" />
                      <Heading
                        as="h1"
                        fontSize="15px"
                        lineHeight="1"
                        m={0}
                        mt={4}
                      >
                        {timeWeather.temperature_2m[startIndex + idx]}° C
                      </Heading>
                    </Flex>
                  )
              )}
            </Flex>
          </GridItem>
        </SimpleGrid>
      </Box>

      <Box flex={{ base: "1", sm: "0 0 %" }} zIndex={0}>
        <Box
          border="1px solid rgba(0,0,0,0.08)"
          h={{ base: "400px", sm: "400px" }}
          p={5}
          borderRadius="30px"
          boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
          bg={bgGradient}
        >
          <Map />
        </Box>
      </Box>
    </Flex>
  );
}

export default Firstrow;
