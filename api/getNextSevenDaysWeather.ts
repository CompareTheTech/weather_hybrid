import { NEXT7DAYS_WEATHER_DAYS_LIMIT, OpenMeteo_API_BASE_URL } from '@/constants';
import axios from 'axios';
import { NextSevenDaysWeatherModel } from '@/interfaces/nextSevenDaysWeatherModel';

export const getNextSevenDaysWeather = async (
  latitude: string,
  longitude: string
): Promise<NextSevenDaysWeatherModel> => {
  const daily = ['weathercode', 'temperature_2m_max', 'temperature_2m_min', 'sunrise', 'sunset'];

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const value = await axios.get(`${OpenMeteo_API_BASE_URL}/v1/forecast`, {
    params: { latitude, longitude, daily, timezone, forecast_days: NEXT7DAYS_WEATHER_DAYS_LIMIT },
  });
  return value.data;
};
