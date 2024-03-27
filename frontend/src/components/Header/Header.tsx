import styles from './header.module.css';
import { useWeather } from '../../context/WeatherContext';
import Toggle from '../Toggle/Toggle';

const Header = () => {
  const { myLocation } = useWeather();
  return (
    <div className={styles.header}>
      <h2>Weather Site</h2>
      <div className={styles.locationText}>
        <span className={styles.bold}>Your current location:</span>
        <span>
          {myLocation.city}, {myLocation.country}
        </span>
      </div>
      <div className={styles.switcherContainer}>
        <Toggle />
      </div>
    </div>
  );
};

export default Header;
