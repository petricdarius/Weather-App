import { sendCities } from "../data/sendCities.data.js";

export const getCities = (req, res) => {
  try {
    const cities = sendCities();
    const cityName = req.body.location;
    const filteredCities = cities.filter((city) =>
      city.name.toLowerCase().startsWith(cityName.toLowerCase())
    ).slice(0, 15);
    res.status(201).json(filteredCities);
  } catch (error) {
    res.status(400).json({ message: "file not found" });
  }
};
