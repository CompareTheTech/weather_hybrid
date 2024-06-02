import { createContext, useContext } from 'react';
import SettingsStore from '@/store/settingsStore';
import ActiveCityStore from '@/store/activeCityStore';

const stores = {
  activeCity: ActiveCityStore,
  settingsStore: SettingsStore,
};
export const StoreContext = createContext(stores);

export const useStore = () => useContext(StoreContext);
