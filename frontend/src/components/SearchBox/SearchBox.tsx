import React, { useState, useEffect } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import styles from './search-box.module.css';
import { useWeather } from '../../context/WeatherContext';
import type { Location } from '../../context/WeatherContext';
import { NO_RESULTS_ERROR } from '../../errors';

const SearchBox = () => {
  const { setLocation, setIsSearching } = useWeather();
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  useEffect(() => {
    if (searchTerm.length > 0) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [searchTerm]);

  const handleBlur = () => {
    if (searchTerm.length === 0) {
      setIsSearching(false);
    }
  };

  return (
    <div className={styles.searchWrapper}>
      <PlacesAutocomplete
        value={searchTerm}
        onChange={handleChange}
        onSelect={async (address) => {
          try {
            const results = await geocodeByAddress(address);
            const latLng = await getLatLng(results[0]);
            const location: Location = {
              latitude: latLng.lat,
              longitude: latLng.lng,
              city: address.split(',')[0],
              country: '',
            };
            setLocation(location);
            setSearchTerm('');
          } catch (error) {
            console.error('Error', error);
          }
        }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className={styles.inputWrapper}>
            <input
              className={styles.input}
              {...getInputProps({
                placeholder: 'Search country, region, city',
              })}
              onBlur={() => handleBlur()}
            />
            <div className={styles.suggestionsWrapper}>
              {loading && <div>Loading...</div>}
              {suggestions.length === 0 && searchTerm.length > 0 ? (
                <h1>{NO_RESULTS_ERROR}</h1>
              ) : (
                suggestions.map((suggestion) => {
                  return (
                    // library handles the key prop
                    // eslint-disable-next-line react/jsx-key
                    <div
                      className={styles.suggestionWrapper}
                      {...getSuggestionItemProps(suggestion, {})}
                    >
                      <span className={styles.suggestion}>
                        {suggestion.formattedSuggestion.mainText}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default SearchBox;
