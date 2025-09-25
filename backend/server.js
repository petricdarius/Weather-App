import express from "express";
import weather from "./routes/weather.route.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json()); 
const port = process.env.PORT;
app.use(cors());

app.use("/", weather);

app.listen(port, () => {
  console.log(`SV running on ${port}`);
});
