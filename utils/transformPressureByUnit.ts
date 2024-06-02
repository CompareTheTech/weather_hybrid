import { AtmosphericPressureUnitEnum } from '@/enum/atmosphericPressureUnit.enum';

export const transformPressureByUnit = (data: number, unit: AtmosphericPressureUnitEnum) => {
  if (unit === AtmosphericPressureUnitEnum.atm) {
    return (data / 1013.25).toFixed(4);
  }

  if (unit === AtmosphericPressureUnitEnum.MercuryMM) {
    return (data * 0.75).toFixed(0);
  }

  return data.toFixed(0);
};
