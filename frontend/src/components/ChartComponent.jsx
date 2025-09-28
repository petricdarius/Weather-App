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
import { Box } from "@chakra-ui/react";
import { useColorMode } from "../components/ui/color-mode";
import { useWeather } from "../weather/weather.js";
function ChartComponent() {
  const { colorMode } = useColorMode();
  const { weatherData } = useWeather();
  const bgGradient =
    colorMode === "light"
      ? "linear-gradient(135deg, #a2b0ef 0%, #764ba2 100%)"
      : "linear-gradient(135deg, #8197a3 0%, #1c1c1c 100%)";

  const data = [];
  weatherData?.daily.time.forEach((days, index) => {
    const day = new Date(weatherData.daily.time[index]).toLocaleDateString(
      "ro-RO",
      { weekday: "short" }
    );
    const high = weatherData.daily.temperature_2m_max[index];
    const low = weatherData.daily.temperature_2m_min[index];
    data.push({
      day: `${day[0].toUpperCase() + day.slice(1)}`,
      high,
      low,
    });
  });
  return (
    <Box
      p={5}
      ps={0}
      bg={bgGradient}
      borderRadius="30px"
      boxShadow="md"
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
      <ResponsiveContainer width="100%" height={300} border="1px solid red">
        <LineChart data={data}>
          <CartesianGrid stroke={""} strokeDasharray="5 5" />
          <XAxis
            dataKey="day"
            tick={{ fill: "white", fontSize: 14 }}
            tickMargin={10}
          />
          <YAxis
            tick={{ fill: "white", fontSize: 14 }}
            label={{
              value: "°C",
              position: "insideLeft",
              angle: -90,
              color: "red",
            }}
            tickMargin={10}
          />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="high"
            stroke="#ff4c4c"
            strokeWidth={3}
            name="High"
          />

          <Line
            type="monotone"
            dataKey="low"
            stroke="#4c9dff"
            strokeWidth={3}
            name="Low"
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default ChartComponent;
