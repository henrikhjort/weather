// src/index.js
import express, { Express, Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
const cors = require("cors");
import { groupByDate, createWeatherObjects } from "./src/helpers";

dotenv.config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

const app: Express = express();
app.use(cors());
const port = process.env.PORT || 1337;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/api/weather", async (req: Request, res: Response) => {
  try {
    const { latitude, longitude, unit } = req.query;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${WEATHER_API_KEY}`
    );
    const dict = groupByDate(response.data.list);
    const keys = Object.keys(dict);
    const weatherData = createWeatherObjects(keys, dict);
    res.status(200).json(weatherData);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to fetch weather data");
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
