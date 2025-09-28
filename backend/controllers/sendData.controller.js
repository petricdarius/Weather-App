export const getWeatherLocation = async (req, res) => {
  try {
    const { latitude: lat, longitude: lng } = req.body;
    const cityRes = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}}`
    );
    const cityJson = await cityRes.json();
    const cityName = cityJson.city || "Unknown";
    const countryName = cityJson.countryName;
    const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&hourly=temperature_2m,precipitation_probability,rain,showers,relative_humidity_2m,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,rain_sum,showers_sum,snowfall_sum,precipitation_sum,sunrise,sunset,uv_index_max,relative_humidity_2m_mean&timezone=Europe/Bucharest`;
    const weatherRes = await fetch(weatherURL);
    const weatherData = await weatherRes.json();
    res.status(201).json({ weatherData, cityName, countryName });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
