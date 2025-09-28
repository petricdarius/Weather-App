export const getWeatherDataByLocation = async (req, res) => {
  try {
    const { location } = req.body;
    if (!location) {
      return res.status(400).json({ error: "Location missing" });
    }
    const cityCoordsURL = `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`;
    const cityCoords = await fetch(cityCoordsURL);
    const coordinates = await cityCoords.json();
    const countryName = coordinates.results[0].country;
    const { latitude: lat, longitude: lng } = coordinates.results[0];
    const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&hourly=temperature_2m,precipitation_probability,rain,showers,relative_humidity_2m,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,rain_sum,showers_sum,snowfall_sum,precipitation_sum,sunrise,sunset,uv_index_max,relative_humidity_2m_mean&timezone=Europe/Bucharest`;
    const response = await fetch(weatherURL);
    const weatherData = await response.json();
    res.status(201).json({
      weatherData,
      countryName,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server error",
    });
  }
};
