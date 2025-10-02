import express from "express";
import weather from "./routes/weather.route.js";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT;

const __dirname = path.resolve();
app.use("/api", weather);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`SV running on ${port}`);
});
