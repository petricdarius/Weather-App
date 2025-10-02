import { create } from "zustand";

export const useWeather = create((set) => ({
  coords: { latitude: null, longitude: null },
  weatherData: null,
  loading: false,
  error: null,
  location: null,
  countryName: null,
  initialLocation: null,
  setCoords: (latitude, longitude) => set({ coords: { latitude, longitude } }),

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
}));
