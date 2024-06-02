import { CURRENT_LOCATION_API_BASE_URL } from '@/constants';
import axios from 'axios';

export const getCurrentLocation = async (): Promise<CurrentLocationData> => {
  const value = await axios.get(`${CURRENT_LOCATION_API_BASE_URL}/json`);
  return value.data;
};
