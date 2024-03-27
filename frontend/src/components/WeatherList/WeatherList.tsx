import styles from './weather-list.module.css';
import WeatherListItem from '../WeatherListItem/WeatherListItem';
import { useWeather } from '../../context/WeatherContext';

const WeatherList = () => {
  const { weatherData } = useWeather();
  // Dont use the first item in the array, because it's the current weather
  const forecast = weatherData?.slice(1);
  return (
    <div className={styles.weatherList}>
      <h2>Upcoming days</h2>
      {forecast?.map((weather) => <WeatherListItem key={weather.date} data={weather} />)}
    </div>
  );
};

export default WeatherList;
