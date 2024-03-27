import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import type Weather from '../types/Weather';

const WeatherContext = createContext<WeatherContextProps | undefined>(undefined);

interface WeatherProviderProps {
  children: ReactNode;
}

interface WeatherContextProps {
  weatherData: Weather[];
  myLocation: Location;
  location: Location;
  setLocation: (location: Location) => void;
  resetLocation: () => void;
  loading: boolean;
  setIsSearching: (isSearching: boolean) => void;
  isSearching: boolean;
  unit: 'metric' | 'imperial';
  setUnit: (unit: 'metric' | 'imperial') => void;
}

export type Location = {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
};

type AddressComponent = {
  long_name: string;
  short_name: string;
  types: string[];
};

type LocationData = {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
    location_type: string;
    viewport: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
  };
  place_id: string;
  plus_code: {
    compound_code: string;
    global_code: string;
  };
  types: string[];
};

// Default location is Helsinki
const defaultLocation = {
  latitude: 60.192059,
  longitude: 24.945831,
  city: 'Helsinki',
  country: 'Finland',
};

export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const [myLocation, setMyLocation] = useState<Location>(defaultLocation);
  const [location, setLocation] = useState<Location>(defaultLocation);
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weatherData, setWeatherData] = useState<Weather[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setLoading(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async function (position) {
        const locationData = await fetchLocation(
          position.coords.latitude,
          position.coords.longitude,
        );
        if (!locationData) {
          setMyLocation(defaultLocation);
          setLoading(false);
          return;
        }
        const city = locationData?.address_components.find((component: AddressComponent) =>
          component.types.includes('locality'),
        )?.long_name;
        const country = locationData?.address_components.find((component: AddressComponent) =>
          component.types.includes('country'),
        )?.long_name;
        setMyLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          city: city,
          country: country,
        });
        setLoading(false);
      });
    } else {
      setMyLocation(defaultLocation);
      setLoading(false);
    }
  }, []);

  const fetchLocation = async (latitude: number, longitude: number) => {
    try {
      setLoading(true);
      const api_key = process.env.REACT_APP_GOOGLE_API_KEY;
      if (!api_key) {
        throw new Error('REACT_APP_GOOGLE_API_KEY is not set');
      }
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${api_key}`,
      );
      if (!res.ok) {
        throw new Error('Failed to fetch location details');
      }
      const data = await res.json();
      const obj = data.results.find((o: LocationData) => {
        return o.types.includes('locality') && o.types.includes('political');
      });
      return obj;
    } catch (error) {
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!location) {
      return;
    }
    const fetchWeather = async () => {
      try {
        const api_url = process.env.REACT_APP_API_URL;
        if (!api_url) {
          throw new Error('REACT_APP_API_URL is not set');
        }
        setLoading(true);
        const latitude = location.latitude;
        const longitude = location.longitude;
        const res = await fetch(
          `${api_url}/api/weather?latitude=${latitude}&longitude=${longitude}&unit=${unit}`,
        );
        if (!res.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await res.json();
        console.log(data);
        setWeatherData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [location, unit]);

  const resetLocation = () => {
    setLocation(defaultLocation);
  };

  return (
    <WeatherContext.Provider
      value={{
        myLocation,
        weatherData,
        location,
        loading,
        setLocation,
        resetLocation,
        isSearching,
        setIsSearching,
        unit,
        setUnit,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};
