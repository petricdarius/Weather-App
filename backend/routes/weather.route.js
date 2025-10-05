import express from "express";
import { getWeatherLocation } from "../controllers/sendData.controller.js";
import { getWeatherDataByLocation } from "../controllers/getDataLocation.controller.js";
import { getCities } from "../controllers/getCities.controller.js";
const router = express.Router();

router.post("/weather", getWeatherLocation);
router.post("/location", getWeatherDataByLocation);
router.post("/cities", getCities);

export default router;
