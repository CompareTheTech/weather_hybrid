import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { useStore } from '@/store';
import { observer } from 'mobx-react';
import { TemperatureUnitEnum } from '@/enum/temperatureUnit.enum';
import { LinearGradient } from 'expo-linear-gradient';
import { getNextSevenDaysWeather } from '@/api/getNextSevenDaysWeather';
import Loader from '@/components/Loader';
import { transformTemperatureByUnit } from '@/utils/transformTemperatureByUnit';
import WeatherIcon from '@/components/WeatherIcon';
import { format } from 'date-fns';
import TextBold from '@/components/Text/TextBold';
import SunriseIcon from '@/components/icons/SunriseIcon';
import SunsetIcon from '@/components/icons/SunsetIcon';

interface DayWeather {
  sunrise: string;
  sunset: string;
  maxTemp: number;
  minTemp: number;
  weathercode: number;
  time: string;
  isTomorrow: boolean;
}

const SettingsScreen = observer(() => {
  const { activeCity } = useStore();
  const [weather, setWeather] = useState<DayWeather[] | null>(null);

  useEffect(() => {
    if (!activeCity.currentLocation) {
      return;
    }

    const [lat, lon] = activeCity.getCityCoordinates as [string, string];
    getNextSevenDaysWeather(lat, lon).then((data) => {
      const weather = [];
      for (let i = 1; i <= 7; i++) {
        weather.push({
          sunrise: data.daily.sunrise[i],
          sunset: data.daily.sunset[i],
          maxTemp: data.daily.temperature_2m_max[i],
          minTemp: data.daily.temperature_2m_min[i],
          weathercode: data.daily.weathercode[i],
          time: data.daily.time[i],
          isTomorrow: i === 1,
        });
      }
      setWeather(weather);
    });
  }, [activeCity.currentLocation]);

  if (!weather) {
    return <Loader />;
  }

  return (
    <LinearGradient
      colors={['#FEE3BC', '#FEE3BC', '#F39876']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.listWrapper}>
          {weather.map((data) => (
            <DayCard key={data.time} {...data} />
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
});

const DayCard: FC<DayWeather> = ({
  time,
  maxTemp,
  minTemp,
  weathercode,
  sunrise,
  sunset,
  isTomorrow,
}) => {
  const [isOpenCart, setIsOpenCard] = useState(isTomorrow);

  return (
    <TouchableOpacity style={styles.dayCard} onPress={() => setIsOpenCard(!isOpenCart)}>
      <View style={styles.dayData}>
        <TextBold>{isTomorrow ? 'Tomorrow' : format(time, 'EEEE')}</TextBold>
        <WeatherCard maxTemp={maxTemp} minTemp={minTemp} weathercode={weathercode} />
      </View>
      {isOpenCart && (
        <View style={styles.sunWrapper}>
          <View style={styles.sun}>
            <SunriseIcon></SunriseIcon>
            <TextBold style={styles.sunTime}>{format(sunrise, 'HH:mm')}</TextBold>
          </View>
          <View style={styles.sun}>
            <SunsetIcon></SunsetIcon>
            <TextBold style={styles.sunTime}>{format(sunset, 'HH:mm')}</TextBold>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

interface WeatherCardProps {
  maxTemp: number;
  minTemp: number;
  weathercode: number;
}

const WeatherCard: FC<WeatherCardProps> = observer(({ maxTemp, minTemp, weathercode }) => {
  const { settingsStore } = useStore();

  return (
    <View style={styles.weatherCard}>
      <TextBold>
        {`${transformTemperatureByUnit(minTemp, settingsStore.temperatureUnit, TemperatureUnitEnum.Celsius)}${settingsStore.temperatureUnit} / ${transformTemperatureByUnit(maxTemp, settingsStore.temperatureUnit, TemperatureUnitEnum.Celsius)}${settingsStore.temperatureUnit}`}
      </TextBold>
      <View style={styles.weatherIcon}>
        <WeatherIcon weathercode={weathercode} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  listWrapper: {
    flex: 1,
    gap: 10,
  },
  dayCard: {
    backgroundColor: 'rgba(256, 256, 256, 0.3)',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  dayData: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  daySun: {},
  weatherCard: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  weatherIcon: {
    height: 30,
    width: 40,
  },
  sunWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
  sun: {
    height: 80,
    width: 50,
    justifyContent: 'space-between',
  },
  sunTime: {
    textAlign: 'center',
  },
});

export default SettingsScreen;
