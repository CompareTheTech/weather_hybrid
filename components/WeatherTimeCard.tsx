import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WeatherIcon from '@/components/WeatherIcon';
import { transformTemperatureByUnit } from '@/utils/transformTemperatureByUnit';
import { observer } from 'mobx-react';
import { useStore } from '@/store';
import { TemperatureUnitEnum } from '@/enum/temperatureUnit.enum';
import TextBold from '@/components/Text/TextBold';

export interface WeatherTimeCardProps {
  temperature_2m: number;
  time: string;
  weathercode: number;
  isCurrent?: boolean;
}

const WeatherTimeCard: FC<WeatherTimeCardProps> = observer(
  ({ temperature_2m, time, weathercode, isCurrent }) => {
    const { settingsStore } = useStore();

    return (
      <View style={[styles.container, isCurrent && styles.activeContainer]}>
        <Text>{isCurrent ? 'now' : time}</Text>
        <View style={styles.icon}>
          <WeatherIcon weathercode={weathercode} />
        </View>
        <TextBold>{`${transformTemperatureByUnit(temperature_2m, settingsStore.temperatureUnit, TemperatureUnitEnum.Celsius)}${settingsStore.temperatureUnit}`}</TextBold>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(256, 256, 256, 0.3)',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  activeContainer: {
    backgroundColor: 'rgba(256, 256, 256, 0.6)',
  },
  icon: {
    marginTop: 5,
    marginBottom: 5,
    width: 30,
    height: 30,
    flex: 1,
  },
});

export default WeatherTimeCard;
