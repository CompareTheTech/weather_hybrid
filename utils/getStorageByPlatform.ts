import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStorageByPlatform = () => {
  return Platform.OS === 'web' ? undefined : AsyncStorage;
};
