// export const getWeatherLocation = async (req, res) => {
//   try {
//     const { location } = req.body;

//     const cityCoordsURL = `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`;
//     const cityCoords = await fetch(cityCoordsURL);
//     const coordinates = await cityCoords.json();
//     const { latitude: lat, longitude: lng } = coordinates.results[0];
//     const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&hourly=temperature_2m,precipitation_probability,rain,showers,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,sunrise,sunset,uv_index_max&timezone=Europe/Bucharest`;
//     const response = await fetch(weatherURL);
//     const data = await response.json();
//     res.status(201).json({
//       data: data,
//       message: "Weather Returned succesfully",
//     });
//   } catch (error) {
//     res.status(404).json({
//       error: "Invalid Request",
//     });
//   }
// };
export const getWeatherLocation = async (req, res) => {
  try {
    const { latitude: lat, longitude: lng } = req.body;
    const cityRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}}`);
    const cityJson = await cityRes.json();
    const cityName = cityJson.city || "Unknown";
    const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&hourly=temperature_2m,precipitation_probability,rain,showers,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,sunrise,sunset,uv_index_max&timezone=Europe/Bucharest`;
    const weatherRes = await fetch(weatherURL);
    const weatherData = await weatherRes.json();

    res.status(201).json({ weatherData, cityName });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
