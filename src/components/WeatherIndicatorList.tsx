import React, { FC } from 'react';
import { WeatherData } from '@/interfaces/weatherData';
import { StyleSheet, View } from 'react-native';
import { useStore } from '@/store';
import { transformWindByUnit } from '@/utils/transformWindByUnit';
import WeatherIndicatorCard from '@/components/WeatherIndicatorCard';
import AtmosphericPressureIcon from '@/components/icons/indicators/AtmosphericPressureIcon';
import { transformPressureByUnit } from '@/utils/transformPressureByUnit';
import WindIcon from '@/components/icons/indicators/WindIcon.xml';
import HumidityIcon from '@/components/icons/indicators/HumidityIcon';
import { observer } from 'mobx-react';

interface WeatherListProps {
  weather: WeatherData;
}

const WeatherIndicatorList: FC<WeatherListProps> = observer(({ weather }) => {
  const { settingsStore } = useStore();

  return (
    <View style={styles.container}>
      <WeatherIndicatorCard
        icon={<AtmosphericPressureIcon />}
        name="Atmospheric pressure"
        data={`${transformPressureByUnit(weather.main.pressure, settingsStore.atmosphericPressureUnit)} ${settingsStore.atmosphericPressureUnit}`}
      />
      <WeatherIndicatorCard
        icon={<WindIcon />}
        name="Wind"
        data={`${transformWindByUnit(weather.wind.speed, settingsStore.windSpeedUnit)} ${settingsStore.windSpeedUnit}`}
      />
      <WeatherIndicatorCard
        icon={<HumidityIcon />}
        name="Humidity"
        data={`${weather.main.humidity} %`}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
});

export default WeatherIndicatorList;
