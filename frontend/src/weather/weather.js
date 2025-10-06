import { create } from "zustand";

export const useWeather = create((set) => ({
  coords: { latitude: null, longitude: null },
  weatherData: null,
  loading: false,
  error: null,
  location: null,
  countryName: null,
  initialLocation: null,
  filteredCities: null,
  setCoords: (latitude, longitude) => set({ coords: { latitude, longitude } }),
  setDefaultCoords : (latitude, longitude ) => {
    if(!weatherData) set({coords: {latitude: 47.62, longitude: 23.612253}})
  },
  postCoords: async (latitude, longitude) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/weather", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latitude, longitude }),
      });
      const data = await res.json();
      set({
        weatherData: data.weatherData,
        loading: false,
        location: data.cityName,
        initialLocation: data.cityName,
        countryName: data.countryName,
      });

      return { success: true };
    } catch (err) {
      set({ error: err.message, loading: false });
      return { success: false };
    }
  },
  postLocation: async (location) => {
    try {
      const res = await fetch("/api/location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location }),
      });
      const data = await res.json();
      set((state) => ({
        weatherData: data.weatherData,
        loading: false,
        location: `${location[0].toUpperCase()}${location.slice(1)}`,
        countryName: data.countryName,
        initialLocation: state.initialLocation || state.location,
      }));
      return { success: true };
    } catch (err) {
      set({ error: err.message, loading: false });
      return { success: false };
    }
  },

  searchlocation: async (location) => {
    try {
      const res = await fetch("api/cities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location }),
      });
      const data = await res.json();
      set({ filteredCities: data, loading: false });
      return { success: true };
    } catch (error) {
      set({ error: err.message, loading: false });
      return { success: false };
    }
  },
}));
