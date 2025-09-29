import { useState, useEffect } from "react";
import { useWeather } from "./weather.js";

export const useLocalCities = () => {
  const { postLocation } = useWeather();
  const [currentCity, setCurrentCity] = useState("");
  const [inputCity, setInputCity] = useState("");
  const [cities, setCities] = useState(() => {
    const saved = localStorage.getItem("locations");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    if (currentCity) {
      postLocation(currentCity);
    }
  }, [currentCity]);

  const handleAddCity = () => {
    if (!inputCity.trim()) return;
    const updated = [...new Set([inputCity, ...cities])];
    setCities(updated);
    setCurrentCity(inputCity);
    localStorage.setItem("locations", JSON.stringify(updated));
    setInputCity("");
  };
  const handleNav = (index) => {
    if (!cities.length || !cities) return;
    setCurrentCity(cities[index])
  };
  return {
    currentCity,
    cities,
    inputCity,
    setInputCity,
    setCurrentCity,
    handleAddCity,
    handleNav
  };
};
