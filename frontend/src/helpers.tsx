import { ReactComponent as CloudyIcon } from './/icons/weather_cloudy.svg';
import { ReactComponent as SunnyIcon } from './/icons/weather_sunny.svg';
import { ReactComponent as RainyIcon } from './/icons/weather_rainy.svg';
import { ReactComponent as SnowyIcon } from './/icons/weather_snowy.svg';

export const getTempLabel = (temp: number) => {
  if (temp === undefined) return '';
  if (temp > 0) {
    return `+${temp}`;
  } else return temp;
};

const cloudyConditions = ['Few clouds', 'Scattered clouds', 'Broken clouds', 'Overcast clouds'];
const sunnyConditions = ['Clear sky'];
const rainyConditions = [
  'Light rain',
  'Moderate rain',
  'Heavy intensity rain',
  'Very heavy rain',
  'Extreme rain',
  'Freezing rain',
  'Light intensity shower rain',
  'Shower rain',
  'Heavy intensity shower rain',
  'Ragged shower rain',
];
const snowyConditions = [
  'Light snow',
  'Snow',
  'Heavy snow',
  'Sleet',
  'Shower sleet',
  'Light rain and snow',
  'Rain and snow',
  'Light shower snow',
  'Shower snow',
  'Heavy shower snow',
];

export const getIconForWeatherCondition = (condition: string) => {
  if (cloudyConditions.includes(condition)) {
    return <CloudyIcon />;
  } else if (sunnyConditions.includes(condition)) {
    return <SunnyIcon />;
  } else if (rainyConditions.includes(condition)) {
    return <RainyIcon />;
  } else if (snowyConditions.includes(condition)) {
    return <SnowyIcon />;
  }
};
