import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useWeather } from "../weather/weather.js";
import cloudyDay from "../assets/weather_images/cloudy-day.png";
import { Flex, Heading, Image } from "@chakra-ui/react";
import L from "leaflet";
import { useColorMode } from "../components/ui/color-mode";
import MapPopupStyles from "../assets/css/MapPopup.jsx";
function FixMap() {
  const map = useMap();
  React.useEffect(() => {
    map.invalidateSize(); // recalculare dimensiune și recentrare
  }, [map]);
  return null;
}
function MapContent({ mapCenter, zoom, colorMode, locationLocale, countryName, markerRef, invisibleIcon, cloudyDay }) {
  const map = useMap();

  useEffect(() => {
    if (!mapCenter || mapCenter.some(isNaN)) return;
    map.flyTo(mapCenter, zoom, { duration: 0.5 });
    
    const timer = setTimeout(() => {
      map.flyTo([mapCenter[0], mapCenter[1]], zoom - 5, { duration: 0.5 });
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [mapCenter, zoom, map]);

  useEffect(() => {
    const resizeTimer = setTimeout(() => {
      map.invalidateSize();
    }, 100); 

    return () => clearTimeout(resizeTimer);
  }, [map]);

  useEffect(() => {
    if (markerRef.current) markerRef.current.openPopup();
  }, [mapCenter, markerRef]);

  const popupBg = colorMode === "light" ? "#a2b0ef" : "#163c50";
  const popupColor = colorMode === "light" ? "#1c1c1c" : "#f7fafc";

  return (
    <>
      <MapPopupStyles />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker ref={markerRef} position={mapCenter} icon={invisibleIcon}>
        <Popup 
          style={{ 
            backgroundColor: popupBg, 
            color: popupColor 
          }}
        >
          <Flex flexDir="column" alignItems="center">
            <Heading as="h2">{locationLocale}</Heading>
            <Image src={cloudyDay} alt="Cloudy Day" boxSize="40px" />
            <Heading as="h5" fontSize="md">{countryName}</Heading>
          </Flex>
        </Popup>
      </Marker>
    </>
  );
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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function checkScreen() {
      setIsMobile(window.innerWidth < 481);
    }
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

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
      <FixMap />
      <MapContent
        mapCenter={mapCenter}
        zoom={10} 
        colorMode={colorMode}
        locationLocale={locationLocale}
        countryName={countryName}
        markerRef={markerRef}
        invisibleIcon={invisibleIcon}
        cloudyDay={cloudyDay}
      />
    </MapContainer>
  );
}

export default Map;