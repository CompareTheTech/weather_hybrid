import {
  HOURLY_WEATHER_CODE,
  HOURLY_WEATHER_DAYS_LIMIT,
  HOURLY_WEATHER_QUERY,
  OpenMeteo_API_BASE_URL,
} from '@/constants';
import { HourlyWeatherModel } from '@/interfaces/hourlyWeatherModel';
import axios from 'axios';

export const getHourlyWeather = async (
  latitude: string,
  longitude: string
): Promise<HourlyWeatherModel> => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const value = await axios.get(`${OpenMeteo_API_BASE_URL}/v1/forecast`, {
    params: {
      latitude,
      longitude,
      hourly: [HOURLY_WEATHER_QUERY, HOURLY_WEATHER_CODE],
      forecast_days: HOURLY_WEATHER_DAYS_LIMIT,
      timezone,
    },
  });
  return value.data;
};
