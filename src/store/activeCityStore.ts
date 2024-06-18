import { makeAutoObservable } from 'mobx';
import { WeatherData } from '@/interfaces/weatherData';
import { makePersistable } from 'mobx-persist-store';
import { getStorageByPlatform } from '@/utils/getStorageByPlatform';
import { CurrentLocationData } from '@/interfaces/currentLocationData';
import { CityLocationData } from '@/interfaces/cityLocationData';

class ActiveCityStore {
  currentLocation: CurrentLocationData | CityLocationData | null = null;
  weather: WeatherData | null = null;

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: 'ActiveCityStore',
      properties: ['currentLocation', 'weather'],
      storage: getStorageByPlatform(),
    });
  }

  get getCityCoordinates(): null | [string, string] {
    if (!this.currentLocation) {
      return null;
    }
    const location = this.currentLocation as CurrentLocationData;
    if (location.ip) {
      const [lat, lon] = location.loc?.split(',');
      return [lat, lon];
    } else {
      const city = this.currentLocation as CityLocationData;
      return [city.lat.toString(), city.lon.toString()];
    }
  }

  setCurrentLocation(currentLocation: CurrentLocationData | CityLocationData) {
    this.currentLocation = currentLocation;
  }

  setWeather(weather: WeatherData) {
    this.weather = weather;
  }
}

export default new ActiveCityStore();
