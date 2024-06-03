import { CURRENT_LOCATION_API_BASE_URL } from '@/constants';
import axios from 'axios';
import { CurrentLocationData } from '@/interfaces/currentLocationData';

export const getCurrentLocation = async (): Promise<CurrentLocationData> => {
  const value = await axios.get(`${CURRENT_LOCATION_API_BASE_URL}/json`);
  return value.data;
};
