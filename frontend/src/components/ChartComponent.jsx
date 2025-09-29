import React from "react";
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
function ChartComponent() {
  const { colorMode } = useColorMode();
  const { weatherData } = useWeather();
  const bgGradient =
    colorMode === "light"
      ? "linear-gradient(135deg, #d6e9ff 0%, #f1f5f9 100%)"
      : "linear-gradient(135deg, #163c50ff 0%, #1c1c1c 100%)";
  const bgGradient2 =
    colorMode === "light"
      ? "linear-gradient(135deg, #a2b0efff 0%, #d6e9ffff 100%)"
      : "linear-gradient(135deg, #1c3a50ff 0%, #163c50ff 100%)";
  const data = [];
  weatherData?.daily.time.forEach((days, index) => {
    const day = new Date(weatherData.daily.time[index]).toLocaleDateString(
      "ro-RO",
      { weekday: "short" }
    );
    const humidityVal = weatherData.daily.relative_humidity_2m_mean[index];
    data.push({
      day: `${day[0].toUpperCase() + day.slice(1)}`,
      humidityVal: `${humidityVal}`,
    });
  });
  return (
    <Box
      p={5}
      ps={0}
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
          bg={bgGradient2}
          color={colorMode === "light" ? "black" : "white"}
          size="sm"
        >
          Humidity
        </Button>
        <Button
          borderRadius="10px"
          bg={bgGradient2}
          color={colorMode === "light" ? "black" : "white"}
          size="sm"
        >
          Pressure
        </Button>
        <Button
          borderRadius="10px"
          bg={bgGradient2}
          color={colorMode === "light" ? "black" : "white"}
          size="sm"
        >
          Rain
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
            tickFormatter={(val) => `${val}%`}
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
            formatter={(value, name) => [`${value}%`, name]}
          />

          <Legend />
          <Line
            type="monotone"
            dataKey="humidityVal"
            stroke="#4cbaffff"
            strokeWidth={3}
            name="Humidity"
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default ChartComponent;
