type WeatherObject = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type ForecastItem = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: WeatherObject[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
  rain?: {
    [key: string]: number;
  };
  snow?: {
    [key: string]: number;
  };
};

export default ForecastItem;
