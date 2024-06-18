export interface HourlyWeatherModel {
  elevation: number;
  generationtime_ms: number;
  hourly: HourlyWeather;
  hourly_units: HourlyWeatherUnits;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
}

export interface HourlyWeather {
  temperature_2m: number[];
  time: string[];
  weathercode: number[];
}

export interface HourlyWeatherUnits {
  temperature_2m: string;
  time: string;
  weathercode: string;
}
