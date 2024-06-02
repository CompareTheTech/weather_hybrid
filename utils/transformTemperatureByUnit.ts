import { TemperatureUnitEnum } from '@/enum/temperatureUnit.enum';

export const transformTemperatureByUnit = (
  data: number,
  unit: TemperatureUnitEnum,
  dataUnit: TemperatureUnitEnum = TemperatureUnitEnum.Kelvin
) => {
  if (dataUnit === TemperatureUnitEnum.Kelvin) {
    if (unit === TemperatureUnitEnum.Fahrenheit) {
      return ((data - 273.15) * 1.8 + 32).toFixed(0);
    }

    if (unit === TemperatureUnitEnum.Celsius) {
      return (data - 273.15).toFixed(0);
    }

    return data;
  } else if (dataUnit === TemperatureUnitEnum.Celsius) {
    if (unit === TemperatureUnitEnum.Fahrenheit) {
      return ((data * 9) / 5 + 32).toFixed(0);
    }

    if (unit === TemperatureUnitEnum.Kelvin) {
      return (data + 273.15).toFixed(0);
    }

    return data.toFixed(0);
  }
};
