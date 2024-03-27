import styles from './weather-card.module.css';
import { useWeather } from '../../context/WeatherContext';
import { getTempLabel } from '../../helpers';
import { ReactComponent as ThermoWarm } from '../../../src/icons/thermo_warm.svg';
import { ReactComponent as ThermoCold } from '../../../src/icons/thermo_cold.svg';
import { ReactComponent as RainIcon } from '../../../src/icons/weather_rainy.svg';
import Spinner from '../Spinner/Spinner';

const WeatherCard = () => {
  const { weatherData, location, loading, isSearching } = useWeather();
  const currentTemp = weatherData[0];

  if (isSearching) {
    return null;
  }

  return (
    <div className={styles.weatherCard}>
      <div className={styles.weatherCardTitle}>
        {loading ? <Spinner /> : <h1>{getTempLabel(currentTemp?.averageTemp)}</h1>}
        <h1>{location.city}</h1>
        <p>{currentTemp?.description}</p>
        <div className={styles.minMaxRainRow}>
          <div className={styles.tempWrapper}>
            <ThermoWarm />
            <span>Max</span>
            <span>{getTempLabel(currentTemp?.maxTemp)}</span>
          </div>
          <div className={styles.tempWrapper}>
            <ThermoCold />
            <span>Min</span>
            <span>{getTempLabel(currentTemp?.minTemp)}</span>
          </div>
          <div className={styles.tempWrapper}>
            <RainIcon />
            <span>Rain</span>
            <span>{getTempLabel(currentTemp?.rain || 0)}mm</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
