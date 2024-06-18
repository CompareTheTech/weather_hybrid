import { OpenWeatherMap_API_BASE_URL } from '@/constants';
import { WeatherData } from '@/interfaces/weatherData';
import axios from 'axios';

export const getWeather = async (lat: string, lon: string): Promise<WeatherData> => {
  const value = await axios.get(`${OpenWeatherMap_API_BASE_URL}/data/2.5/weather`, {
    params: { lat, lon, appid: process.env.EXPO_PUBLIC_API_KEY },
  });
  return value.data;
};
