export interface WeatherData {
  base: string;
  clouds: Clouds;
  cod: number;
  coord: Coord;
  dt: number;
  id: number;
  main: MainData;
  name: string;
  sys: SunData;
  timezone: number;
  visibility: number;
  weather: WeatherType[];
  wind: Wind;
}

export interface MainData {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

export interface Clouds {
  all: number;
}

export interface Coord {
  lat: number;
  lon: number;
}

export interface SunData {
  country: string;
  sunrise: number;
  sunset: number;
}

export interface WeatherType {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface Wind {
  deg: number;
  gust: number;
  speed: number;
}
