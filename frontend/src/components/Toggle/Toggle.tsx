import styles from './toggle.module.css';
import { useWeather } from '../../context/WeatherContext';

const Toggle = () => {
  const { unit, setUnit } = useWeather();

  const handleToggle = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <div className={styles.toggleContainer} onClick={handleToggle}>
      {unit === 'metric' ? (
        <>
          <span className={styles.text}>°C</span>
          <div className={styles.ball} />
        </>
      ) : (
        <>
          <div className={styles.ball} />
          <span className={styles.text}>°F</span>
        </>
      )}
    </div>
  );
};

export default Toggle;
