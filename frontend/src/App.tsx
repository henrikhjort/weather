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
        <div className="header">
          <Header />
        </div>
        <div className="content">
          <div className="left">
            <SearchBox />
            <WeatherCard />
          </div>
          <div className="right">
            <WeatherList />
          </div>
        </div>
      </div>
    </WeatherProvider>
  );
}

export default App;
