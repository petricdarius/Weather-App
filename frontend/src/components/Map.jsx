import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useWeather } from "../weather/weather.js";
import cloudyDay from "../assets/weather_images/cloudy-day.png";
import { Flex, Heading, Image } from "@chakra-ui/react";
import L from "leaflet";
import { useColorMode } from "../components/ui/color-mode";
import MapPopupStyles from "../assets/css/MapPopup.jsx";

function ChangeView({ center, zoom }) {
  if (!center || center.some(isNaN)) return;
  const map = useMap();
  useEffect(() => {
    if (!center || isNaN(center[0]) || isNaN(center[1])) return;
    map.flyTo(center, zoom, { duration: 0.5 });
    const invalidateTimer = setTimeout(() => {
      try {
        map.invalidateSize();
      } catch (e) {
      }
    }, 300);

    const flyBackTimer = setTimeout(() => {
      map.flyTo([center[0], center[1]], zoom - 5, { duration: 0.5 });
      setTimeout(() => {
        try {
          map.invalidateSize();
        } catch (e) {
        }
      }, 350);
    }, 2000);

    return () => {
      clearTimeout(invalidateTimer);
      clearTimeout(flyBackTimer);
    };
  }, [center, zoom, map]);
  return null;
}
function Map() {
  const markerRef = useRef(null);
  const { coords, location, weatherData, countryName } = useWeather();
  const { colorMode } = useColorMode();

  const fallback = [47.62, 23.612253];
  const latitude = weatherData?.latitude ?? coords?.latitude ?? fallback[0];
  const longitude = weatherData?.longitude ?? coords?.longitude ?? fallback[1];
  const mapCenter = [latitude, longitude];
  const locationLocale = location ?? "Current location";

  useEffect(() => {
    if (markerRef.current) markerRef.current.openPopup();
  }, [mapCenter]);

  const invisibleIcon = L.icon({
    iconUrl: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",
    iconSize: [0, 0],
    iconAnchor: [0, 0],
    popupAnchor: [0, 0],
  });

  return (
    <MapContainer
      center={mapCenter}
      zoom={3}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "100%" }}

    >
      <MapPopupStyles />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {<ChangeView center={mapCenter} zoom={10} />}
      <Marker ref={markerRef} position={mapCenter} icon={invisibleIcon}>
        <Popup
          style={{
            backgroundColor: colorMode === "light" ? "#a2b0ef" : "#163c50",
            color: colorMode === "light" ? "#1c1c1c" : "#f7fafc",
          }}
        >
          <Flex flexDir="column" alignItems="center">
            <Heading as="h2">{locationLocale}</Heading>
            <Image src={cloudyDay} alt="Cloudy Day" boxSize="40px" />
            <Heading as="h5" fontSize="md">
              {countryName}
            </Heading>
          </Flex>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;