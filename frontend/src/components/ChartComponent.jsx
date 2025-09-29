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
import { Box, Button, Flex } from "@chakra-ui/react";
import { useColorMode } from "../components/ui/color-mode";
import { useWeather } from "../weather/weather.js";
import { useColours } from "../assets/css/Colours.jsx";
function ChartComponent() {
  const { colorMode } = useColorMode();
  const { weatherData } = useWeather();
  const {bgGradient, bgGradient2} = useColours()
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
    <Box
      p={5}
      bg={bgGradient}
      borderRadius="30px"
      boxShadow="md"
      border="1px solid rgba(0,0,0,0.08)"
      w={{
        base: "80%",
        sm: "54%",
      }}
      ms={{
        base: "10%",
        sm: "5%",
      }}
      mt={10}
    >
      <Flex justify="flex-end" gap={2} mb={4}>
        <Button
          borderRadius="10px"
          bg={option === "humidityVal" ? bgGradient3 : bgGradient2}
          color={colorMode === "light" ? "black" : "white"}
          size="sm"
          onClick={() => setOption("humidityVal")}
        >
          Humidity
        </Button>

        <Button
          borderRadius="10px"
          bg={option === "dayLight" ? bgGradient3 : bgGradient2}
          color={colorMode === "light" ? "black" : "white"}
          size="sm"
          onClick={() => setOption("dayLight")}
        >
          Daylight Time
        </Button>

        <Button
          borderRadius="10px"
          bg={option === "uvIndex" ? bgGradient3 : bgGradient2}
          color={colorMode === "light" ? "black" : "white"}
          size="sm"
          onClick={() => setOption("uvIndex")}
        >
          UV Index
        </Button>
      </Flex>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke={""} strokeDasharray="5 5" />
          <XAxis
            dataKey="day"
            tick={{
              fill: colorMode === "dark" ? "white " : "black",
              fontSize: 14,
            }}
            tickMargin={10}
          />
          <YAxis
            tick={{
              fill: colorMode === "dark" ? "white " : "black",
              fontSize: 14,
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
            formatter={(value) => [formatValue(value, option), optionLabels[option]]}
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
  );
}

export default ChartComponent;
