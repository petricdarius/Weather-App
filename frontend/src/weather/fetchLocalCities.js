import { useState, useEffect, useMemo, useCallback } from "react";
import { useWeather } from "./weather.js";

export const useLocalCities = () => {
  const { postLocation, initialLocation } = useWeather();

  const [currentCity, setCurrentCity] = useState(initialLocation || "");
  const [inputCity, setInputCity] = useState("");
  const [userCities, setUserCities] = useState(() => {
    const saved = localStorage.getItem("userCities");
    return saved ? JSON.parse(saved) : [];
  });

  const cities = useMemo(() => {
    const allCities = initialLocation ? [initialLocation, ...userCities] : userCities;
    
    const uniqueCities = [];
    const seen = new Set();
    
    for (const city of allCities) {
      if (!seen.has(city)) {
        seen.add(city);
        uniqueCities.push(city);
      }
    }
    
    return uniqueCities;
  }, [initialLocation, userCities]);

  useEffect(() => {
    if (initialLocation && initialLocation !== currentCity) {
      setCurrentCity(initialLocation);
    }
  }, [initialLocation]);

  useEffect(() => {
    if (currentCity && currentCity.trim()) {
      postLocation(currentCity);
    }
  }, [currentCity]);

  const handleAddCity = useCallback((selectedCity) => {
  const newCity = (selectedCity || inputCity).trim();
  if (!newCity) return;

  setUserCities((prev) => {
    const updated = [...new Set([...prev, newCity])];
    localStorage.setItem("userCities", JSON.stringify(updated));
    return updated;
  });

  setCurrentCity(newCity);
  setInputCity("");
}, [inputCity]);


  const handleNav = useCallback((index) => {
    if (!cities.length || index >= cities.length) return;
    
    const selectedCity = cities[index];
    setCurrentCity(selectedCity);
  }, [cities]);
  return {
    currentCity,
    cities,
    inputCity,
    setInputCity,
    setCurrentCity,
    handleAddCity,
    handleNav,
  };
};