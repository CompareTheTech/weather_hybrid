import { WindSpeedUnitEnum } from '@/enum/windSpeedUnit.enum';

export const transformWindByUnit = (data: number, unit: WindSpeedUnitEnum) => {
  if (unit === WindSpeedUnitEnum.KilometersPerHour) {
    return (data * 3.6).toFixed(1);
  }

  if (unit === WindSpeedUnitEnum.MilesPerHour) {
    return (data * 2.23694).toFixed(1);
  }

  return data.toFixed(1);
};
