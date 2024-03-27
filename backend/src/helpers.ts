import { format } from "date-fns";
import type ForecastItem from "../types/ForecastItem";
import type Weather from "../types/Weather";

type Dict = {
  [key: string]: ForecastItem[];
};

export const groupByDate = (list: ForecastItem[]) => {
  // key = date
  // value = list of ForecastItems for that date
  let dict: Dict = {};
  for (const item of list) {
    const key = new Date(item.dt_txt).toDateString();
    if (dict[key]) {
      dict[key].push(item);
    } else {
      dict[key] = [item];
    }
  }
  return dict;
};

/*
  const items = dict["Mon Mar 25 2024"];
  const thisDatesWeather = getWeatherForDate(items);
  const averageTemp = getAverageTemp(items);
  const maxTemp = getMaxTemp(items);
  const minTemp = getMinTemp(items);
  console.log(thisDatesWeather);
  console.log(averageTemp);
  console.log(maxTemp);
  console.log(minTemp);
*/

export const createWeatherObjects = (keys: string[], dict: Dict) => {
  let result = [];
  for (const key of keys) {
    // Items for a single day
    const items = dict[key];
    const thisDatesWeather = getWeatherForDate(items);
    if (!thisDatesWeather) {
      continue;
    }
    const averageTemp = getAverageTemp(items);
    const maxTemp = getMaxTemp(items);
    const minTemp = getMinTemp(items);
    // dateLabel should be "Monday 22.8" for example
    const date = new Date(key);
    const dateLabel = format(date, "EEEE d.M");
    const description =
      thisDatesWeather.description.charAt(0).toUpperCase() +
      thisDatesWeather.description.slice(1);
    const rainAmount = parseRainAndSnowAmount(items);
    const weather: Weather = {
      date: new Date(key).toISOString(),
      dateLabel: dateLabel,
      averageTemp,
      maxTemp,
      minTemp,
      weatherIcon: thisDatesWeather.icon,
      description: description,
      rain: rainAmount,
    };
    result.push(weather);
  }
  // Sort result by date
  result.sort((a, b) => {
    return a.date > b.date ? 1 : -1;
  });
  return result;
};

const getWeatherForDate = (items: ForecastItem[]) => {
  const weathers = items.map((item) => item.weather).flat();
  const weatherIds = weathers.map((weather) => weather.id);
  const weatherIdsSet = new Set(weatherIds);
  // It's possible that there are multiple weather ids for a single day, but for now we'll just take the first one
  const todaysId = Array.from(weatherIdsSet)[0];
  const todaysWeather = weathers.find((weather) => weather.id === todaysId);
  return todaysWeather;
};

const getAverageTemp = (items: ForecastItem[]) => {
  const temps = items.map((item) => item.main.temp);
  const sum = temps.reduce((acc, temp) => acc + temp, 0);
  const average = sum / temps.length;
  return Math.round(average);
};

const getMaxTemp = (items: ForecastItem[]) => {
  const temps = items.map((item) => item.main.temp_max);
  const maxTemp = Math.max(...temps);
  return Math.round(maxTemp * 10) / 10;
};

const getMinTemp = (items: ForecastItem[]) => {
  const temps = items.map((item) => item.main.temp_min);
  const minTemp = Math.min(...temps);
  if (minTemp < 0.5) {
    return 0;
  }
  return Math.round(minTemp * 10) / 10;
};

const parseRainAndSnowAmount = (items: ForecastItem[]) => {
  const snows = [];
  const rains = [];
  for (const item of items) {
    if (item.rain) {
      const key = Object.keys(item.rain)[0];
      rains.push(item.rain[key]);
    }
    if (item.snow) {
      const key = Object.keys(item.snow)[0];
      snows.push(item.snow[key]);
    }
  }
  const combined = rains.concat(snows);
  if (combined.length === 0) {
    return 0;
  }
  const average =
    combined.reduce((acc, value) => acc + value, 0) / combined.length;
  return Math.round(average * 10) / 10;
};
