import React from 'react';
import './App.css';
import { WeatherProvider } from './context/WeatherContext';
import Header from './components/Header/Header';
import SearchBox from './components/SearchBox/SearchBox';
import WeatherCard from './components/WeatherCard/WeatherCard';
import WeatherList from './components/WeatherList/WeatherList';

function App() {
  return (
    <WeatherProvider>
      <div className="App">
        <div className="left">
          <div className="first-row">
            <Header />
          </div>
          <div className="second-row">
            <SearchBox />
          </div>
          <div className="third-row">
            <WeatherCard />
          </div>
        </div>
        <div className="right">
          <WeatherList />
        </div>
      </div>
    </WeatherProvider>
  );
}

export default App;
