import express from "express";
import { getWeatherLocation } from "../controllers/sendData.controller.js";
import { getWeatherDataByLocation } from "../controllers/getDataLocation.controller.js";
const router = express.Router();

router.post("/weather", getWeatherLocation);
router.post("/location", getWeatherDataByLocation);

export default router;
