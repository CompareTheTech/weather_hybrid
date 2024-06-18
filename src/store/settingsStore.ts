import { makeAutoObservable } from 'mobx';
import { TemperatureUnitEnum } from '@/enum/temperatureUnit.enum';
import { AtmosphericPressureUnitEnum } from '@/enum/atmosphericPressureUnit.enum';
import { WindSpeedUnitEnum } from '@/enum/windSpeedUnit.enum';
import { makePersistable } from 'mobx-persist-store';
import { getStorageByPlatform } from '@/utils/getStorageByPlatform';

class SettingsStore {
  temperatureUnit: TemperatureUnitEnum = TemperatureUnitEnum.Celsius;
  windSpeedUnit: WindSpeedUnitEnum = WindSpeedUnitEnum.MetersPerSecond;
  atmosphericPressureUnit: AtmosphericPressureUnitEnum = AtmosphericPressureUnitEnum.MercuryMM;

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: 'SettingsStore',
      properties: ['temperatureUnit', 'windSpeedUnit', 'atmosphericPressureUnit'],
      storage: getStorageByPlatform(),
    });
  }

  setTemperatureUnit(unit: TemperatureUnitEnum) {
    this.temperatureUnit = unit;
  }

  setWindSpeedUnit(unit: WindSpeedUnitEnum) {
    this.windSpeedUnit = unit;
  }

  setAtmosphericPressureUnit(unit: AtmosphericPressureUnitEnum) {
    this.atmosphericPressureUnit = unit;
  }
}

export default new SettingsStore();
