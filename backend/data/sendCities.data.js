import fs from "fs";

const citiesArray = JSON.parse(
  fs.readFileSync("backend/data/cities.json", "utf8")
);

export const sendCities = () => citiesArray;
