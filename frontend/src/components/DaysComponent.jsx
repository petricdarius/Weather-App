import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { useWeather } from "../weather/weather";
import { useColours } from "../assets/css/Colours";
import RainImg from "../assets/weather_images/rain.png";

function DaysComponent() {
  const { bgGradient, bgGradient2 } = useColours();
  const { weatherData } = useWeather();
  let days;
  days = React.useMemo(() => {
    if (!weatherData) return;
    return weatherData.daily.time;
  }, [weatherData]);
  let daysData;
  daysData = React.useMemo(() => {
    if (!weatherData) return;
    return weatherData.daily;
  }, [weatherData]);
  days?.forEach((days, index) => {
    const day = new Date(weatherData.daily.time[index]).toLocaleDateString(
      "ro-RO",
      { day: "numeric", month: "short", weekday: "short" }
    );
  });
  return (
    <Flex
      h={"100%"}
      overflow={"auto"}
      className="scrollable-element"
      w={"100%"}
    >
      <Flex flexDir={"column"} style={{ width: "100%", height: "100%" }}>
        <Heading
          as={"h1"}
          fontSize={"4xl"}
          m={1}
          position="sticky"
          top="0"
          w={"fit"}
          p={{
            base:0,
            sm:3
          }}
          h={"fit"}
          borderRadius={"20px"}
          bg={bgGradient}
          zIndex={10}
        >
          Forecast
        </Heading>

        <Box mt={4}>
          {days?.map((day, index) => {
            const date = new Date(
              weatherData.daily.time[index]
            ).toLocaleDateString("ro-RO", {
              day: "numeric",
              month: "short",
              weekday: "short",
            });
            return (
              <Flex
              key={index}
                flex={"row"}
                w={{
                  base:"100%",
                  sm:"90%"
                }}
                bg={bgGradient2}
                ms={"auto"}
                me={"auto"}
                mt={5}
                p={3}
                alignItems={"center"}
                borderRadius={"20px"}
                justifyContent={"space-between"}
              >
                <Flex alignItems={"center"} flexDir={"row"}>
                  <Image
                    src={RainImg}
                    boxSize={{
                      base: "34px",
                      sm: "74px",
                    }}
                  />
                  <Heading
                    as="h1"
                    fontSize={{
                      base: "20px",
                      sm: "30px",
                    }}
                    mb={2}
                    ms={3}
                    display={"flex"}
                    alignItems={"baseline"}
                    flexDir={{
                      base:"column",
                      sm:"row"
                    }}
                  >
                    High {parseInt(daysData.temperature_2m_max[index])} °C
                    <Box
                      ms={2}
                      as="span"
                      fontSize={{
                        base: "15px",
                        sm: "15px",
                      }}
                      verticalAlign="baseline"
                    >
                       Low {parseInt(daysData.temperature_2m_min[index])} °C
                    </Box>
                  </Heading>
                </Flex>
                <Heading
                  as="h1"
                  fontSize={{
                    base: "25px",
                    sm: "30px",
                  }}
                  mb={2}
                  ms={3}
                >
                  {`${date[0].toUpperCase()}${date.slice(1, 3)}`}
                  <Box
                    ms={3}
                    as="span"
                    fontSize={{
                      base: "15px",
                      sm: "15px",
                    }}
                    verticalAlign="baseline"
                  >
                    {date.slice(5)}
                  </Box>
                </Heading>
              </Flex>
            );
          })}
        </Box>
      </Flex>
    </Flex>
  );
}

export default DaysComponent;
