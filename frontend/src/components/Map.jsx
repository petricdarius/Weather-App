import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useWeather } from "../weather/weather.js";
import cloudyDay from "../assets/weather_images/cloudy-day.png";
import { Flex, Heading, Image } from "@chakra-ui/react";
import L from "leaflet";

function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 0.5 });
    const timer = setTimeout(() => {
      map.flyTo(center, zoom - 5, { duration: 0.5 });
    }, 2000);
  }, [center, zoom, map]);

  return null;
}

function Map() {
  const markerRef = useRef(null);
  const { coords, location, weatherData, countryName } = useWeather();

  const latitude = weatherData?.latitude ?? coords.latitude ?? 47.62;
  const longitude = weatherData?.longitude ?? coords.longitude ?? 23.612253;
  const locationLocale = location ?? "Current location";

  useEffect(() => {
    if (markerRef.current) markerRef.current.openPopup();
  }, [latitude, longitude]);
  const invisibleIcon = L.icon({
    iconUrl: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",
    iconSize: [0, 0],
    iconAnchor: [0, 0],
    popupAnchor: [0, 0],
  });
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={3}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ChangeView center={[latitude, longitude]} zoom={10} />
      <Marker
        ref={markerRef}
        position={[latitude, longitude]}
        icon={invisibleIcon}
      >
        <Popup>
          <Flex flexDir="column" alignItems="center">
            <Heading as={"h2"}> {locationLocale} </Heading>
            <Image src={cloudyDay} alt="Cloudy Day" boxSize="40px" />
            <Heading as={"h5"} fontSize={"md"}>
              {countryName}
            </Heading>
          </Flex>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
