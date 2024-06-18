export interface NextSevenDaysWeatherModel {
  daily: NextSevenDaysWeather;
  daily_units: NextSevenDaysWeatherUnits;
  elevation: number;
  generationtime_ms: number;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
}

export interface NextSevenDaysWeather {
  sunrise: string[];
  sunset: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  time: string[];
  weathercode: number[];
}

export interface NextSevenDaysWeatherUnits {
  sunrise: string;
  sunset: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  time: string;
  weathercode: string;
}
