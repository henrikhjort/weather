import React, { useState } from 'react';
import styles from './weather-list-item.module.css';
import type Weather from '../../types/Weather';
import { getTempLabel, getIconForWeatherCondition } from '../../helpers';
import { ReactComponent as ThermoWarm } from '../../../src/icons/thermo_warm.svg';
import { ReactComponent as ThermoCold } from '../../../src/icons/thermo_cold.svg';
import { ReactComponent as RainIcon } from '../../../src/icons/weather_rainy.svg';

type WeatherListItemProps = {
  data: Weather;
};

const WeatherListItem = ({ data }: WeatherListItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.listItem} onClick={() => setIsOpen(!isOpen)}>
      <div className={styles.labelContainer}>
        <span>{data.dateLabel}</span>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.row}>
          <div className={styles.iconContainer}>{getIconForWeatherCondition(data.description)}</div>
          <div className={styles.tempContainer}>{getTempLabel(data.averageTemp)}</div>
        </div>
        {isOpen && (
          <>
            <div className={styles.row}>
              <div className={styles.iconContainer}>
                <ThermoWarm />
              </div>
              <div className={styles.tempContainer}>Max {getTempLabel(data.maxTemp)}</div>
            </div>
            <div className={styles.row}>
              <div className={styles.iconContainer}>
                <ThermoCold />
              </div>
              <div className={styles.tempContainer}>Min {getTempLabel(data.minTemp)}</div>
            </div>
            <div className={styles.row}>
              <div className={styles.iconContainer}>
                <RainIcon />
              </div>
              <div className={styles.tempContainer}>Rain {getTempLabel(data.rain)}mm</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherListItem;
