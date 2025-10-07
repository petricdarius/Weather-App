import { Image } from "@chakra-ui/react";
import React from "react";
import { useWeather } from "../weather/weather";

function WeatherImage({ option = "current_weather", index = "" }) {
  const { weatherData } = useWeather();

  const code = React.useMemo(() => {
    if (!weatherData) return null;

    if (index === "") return weatherData[option]?.weathercode;
    return weatherData[option]?.weather_code?.[index];
  }, [weatherData, option, index]);

  const isDay =
    weatherData?.[option]?.is_day?.[index] ??
    weatherData?.[option]?.is_day ??
    true;

  if (code === null || code === undefined) {
    return null;
  }

  let imageSource = "";

  switch (code) {
    case 0:
      imageSource = isDay ? "sun.png" : "crescent-moon.png";
      break;
    case 1:
    case 2:
      imageSource = isDay ? "cloudy-day.png" : "moon (1).png";
      break;
    case 3:
      imageSource = "overcast.png";
      break;
    case 45:
    case 48:
      imageSource = "fog.png";
      break;
    case 51:
    case 53:
    case 55:
      imageSource = "light-rain.png";
      break;
    case 56:
    case 57:
    case 66:
    case 67:
    case 87:
    case 88:
      imageSource = "sleet.png";
      break;
    case 61:
    case 63:
    case 80:
      imageSource = "rain.png";
      break;
    case 65:
    case 81:
    case 82:
      imageSource = "rain (1).png";
      break;
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      imageSource = "snow.png";
      break;
    case 95:
    case 96:
    case 99:
      imageSource = "storm.png";
      break;
    default:
      imageSource = "overcast.png";
      break;
  }

  const imagePath = new URL(
    `../assets/weather_images/${imageSource}`,
    import.meta.url
  ).href;

  return (
    <Image

      src={imagePath}
      alt={`Weather code ${code}`}
    />
  );
}

export default WeatherImage;
