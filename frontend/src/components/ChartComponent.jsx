import React, { useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useColorMode } from "../components/ui/color-mode";
import { useWeather } from "../weather/weather.js";
import { useColours } from "../assets/css/Colours.jsx";
import DaysComponent from "./DaysComponent.jsx";
function ChartComponent() {
  const { colorMode } = useColorMode();
  const { weatherData } = useWeather();
  const { bgGradient, bgGradient2 } = useColours();
  const bgGradient3 =
    colorMode === "light"
      ? "linear-gradient(135deg, #b9c3f0ff 0%, #d6e9ffff 100%)"
      : "linear-gradient(135deg, #273f50ff 0%, #203e4fff 100%)";
  const data = [];
  weatherData?.daily.time.forEach((days, index) => {
    const day = new Date(weatherData.daily.time[index]).toLocaleDateString(
      "ro-RO",
      { weekday: "short" }
    );
    const humidityVal = weatherData.daily.relative_humidity_2m_mean[index];
    const dayLight = parseInt(
      parseInt(weatherData.daily.daylight_duration[index]) / 60 / 60
    );
    const uvIndex = weatherData.daily.uv_index_max[index];
    data.push({
      day: `${day[0].toUpperCase() + day.slice(1)}`,
      humidityVal: `${humidityVal}`,
      dayLight,
      uvIndex,
    });
  });
  const [option, setOption] = useState("humidityVal");
  let lineColour;
  switch (option) {
    case "dayLight":
      lineColour = "#effa5aff";
      break;
    case "uvIndex":
      lineColour = "#6f5afaff";
      break;
    default:
      lineColour = "#5abdfaff";
      break;
  }
  const optionLabels = {
    humidityVal: "Humidity",
    dayLight: "Daylight Time",
    uvIndex: "UV Index",
  };
  const formatValue = (val, key) => {
    if (key === "humidityVal") return `${val}%`;
    if (key === "dayLight") return `${val} h`;
    if (key === "uvIndex") return `${val}`;
    return val;
  };
  return (
    <Flex
      w="90%"
      mx="auto"
      alignItems="stretch"
      flexDir={{ base: "column", sm: "row" }}
      gap={{ base: 10, sm: "5%" }}
    >
      <Box
        flex={{ base: "1", sm: "0 0 60%" }}
        p={5}
        bg={bgGradient}
        borderRadius="30px"
        boxShadow="md"
        border="1px solid rgba(0,0,0,0.08)"
        mt={10}
        w={{ base: "88%", sm: "60%" }}
        mx="auto"
      >
        <Flex
          justifyContent="space-between"
          gap={{
            base: 0,
            sm: 2,
          }}
          mb={4}
          flexDir={{
            base: "column",
            sm: "row",
          }}
        >
          <Heading as={"h1"} fontSize={"4xl"} m={2}>
            Overview
          </Heading>
          <Flex
            justifyContent={{ base: "center", sm: "flex-end" }}
            gap={{ base: 2, sm: 4 }}
            mt={{ base: 3, sm: 0 }}
            flexWrap={{ base: "nowrap", sm: "nowrap" }}
            w={{ base: "100%", sm: "fit-content" }}
            flexDir={{
              base: "column",
              sm: "row",
            }}
            alignItems={{
              base: "center",
            }}
          >
            <Button
              borderRadius="10px"
              bg={option === "humidityVal" ? bgGradient3 : bgGradient2}
              color={colorMode === "light" ? "black" : "white"}
              size={{ base: "sm", sm: "sm" }}
              onClick={() => setOption("humidityVal")}
              w={{
                sm: "40%",
                base: "60%",
              }}
            >
              Humidity
            </Button>
            <Button
              w={{
                sm: "40%",
                base: "60%",
              }}
              borderRadius="10px"
              bg={option === "dayLight" ? bgGradient3 : bgGradient2}
              color={colorMode === "light" ? "black" : "white"}
              size={{ base: "sm", sm: "sm" }}
              onClick={() => setOption("dayLight")}
            >
              Daylight Time
            </Button>
            <Button
              w={{
                sm: "40%",
                base: "60%",
              }}
              borderRadius="10px"
              bg={option === "uvIndex" ? bgGradient3 : bgGradient2}
              color={colorMode === "light" ? "black" : "white"}
              size={{ base: "sm", sm: "sm" }}
              onClick={() => setOption("uvIndex")}
            >
              UV Index
            </Button>
          </Flex>
        </Flex>

        <Box ms={"-5"}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid stroke={""} strokeDasharray="5 5" />
              <XAxis
                className="xaxis"
                dataKey="day"
                tick={{
                  fill: colorMode === "dark" ? "white " : "black",
                }}
                interval={0}
                tickMargin={10}
              />
              <YAxis
                tick={{
                  fill: colorMode === "dark" ? "white " : "black",
                }}
                label={{
                  value: "",
                  position: "insideTopLeft",
                  angle: -190,
                }}
                tickMargin={10}
                tickFormatter={(val) => formatValue(val, option)}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "transparent",
                  borderRadius: "10px",
                  border: "2px solid #4cbaff",
                  padding: "10px",
                }}
                labelStyle={{
                  color: colorMode === "dark" ? "#fff" : "#000",
                  fontWeight: "bold",
                  fontSize: 14,
                }}
                itemStyle={{
                  color: colorMode === "dark" ? "#fff" : "#000",
                  fontSize: 14,
                }}
                formatter={(value) => [
                  formatValue(value, option),
                  optionLabels[option],
                ]}
              />

              <Legend />
              <Line
                type="monotone"
                dataKey={option}
                stroke={lineColour}
                strokeWidth={3}
                name={optionLabels[option]}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
      <Box
        flex={{ base: "1", sm: "0 0 35%" }}
        w={{ base: "90%", sm: "35%" }}
        mx="auto"
      >
        <Box
          border="1px solid rgba(0,0,0,0.08)"
          h="400px"
          p={{
            base: 1,
            sm: 5,
          }}
          pt={{
            base: 5,
            sm: 1,
          }}
          borderRadius="30px"
          boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
          bg={bgGradient}
          mt={10}
        >
          <DaysComponent />
        </Box>
      </Box>
    </Flex>
  );
}

export default ChartComponent;
