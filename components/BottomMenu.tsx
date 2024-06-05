import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import RightArrowIcon from '@/components/icons/RightArrowIcon';
import { getHourlyWeather } from '@/api/getHourlyWeather';
import { useStore } from '@/store';
import { HourlyWeatherModel } from '@/interfaces/hourlyWeatherModel';
import WeatherTimeCard, { WeatherTimeCardProps } from '@/components/WeatherTimeCard';
import { format } from 'date-fns';
import TextRegular from '@/components/Text/TextRegular';

const BottomMenu = observer(() => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => setActiveTabIndex(0)}>
            <TextRegular style={[styles.tab, activeTabIndex === 0 && styles.activeTab]}>
              Today
            </TextRegular>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTabIndex(1)}>
            <TextRegular style={[styles.tab, activeTabIndex === 1 && styles.activeTab]}>
              Tomorrow
            </TextRegular>
          </TouchableOpacity>
        </View>
        <Link href="/nextSevenDays">
          <View style={styles.sevenDays}>
            <TextRegular>Next 7 Days</TextRegular>
            <RightArrowIcon />
          </View>
        </Link>
      </View>
      <Content activeTabIndex={activeTabIndex} />
    </View>
  );
});

const Content = observer(({ activeTabIndex }: { activeTabIndex: number }) => {
  const { activeCity } = useStore();

  const [hourlyWeather, setHourlyWeather] = useState<HourlyWeatherModel | null>(null);
  const [currentTabHourlyWeather, setCurrentTabHourlyWeather] = useState<
    WeatherTimeCardProps[] | null
  >(null);

  useEffect(() => {
    const coordinates = activeCity.getCityCoordinates;
    if (!coordinates) {
      return;
    }
    const [lat, lon] = coordinates;
    getHourlyWeather(lat, lon).then((data) => {
      setHourlyWeather(data);
    });
  }, [activeCity.currentLocation]);

  useEffect(() => {
    if (!hourlyWeather) {
      return;
    }

    const weather: WeatherTimeCardProps[] = [];
    const startIndex = activeTabIndex * 24;
    const currentTime = format(new Date(), 'HH');
    for (let i = startIndex; i < startIndex + 24; i++) {
      const time = format(hourlyWeather?.hourly.time[i], 'HH:mm');

      weather.push({
        temperature_2m: hourlyWeather.hourly.temperature_2m[i],
        time,
        weathercode: hourlyWeather?.hourly.weathercode[i],
        isCurrent: time.split(':')[0] === currentTime && activeTabIndex === 0,
      });
    }
    setCurrentTabHourlyWeather(weather);
  }, [activeTabIndex, hourlyWeather]);

  if (!currentTabHourlyWeather) {
    return;
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.cardList}>
        {currentTabHourlyWeather.map((data) => (
          <WeatherTimeCard key={data.time} {...data} />
        ))}
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  tabs: {
    flexDirection: 'row',
    gap: 20,
    borderBottomColor: '#E2A272',
    borderBottomWidth: 1,
  },
  tab: {
    opacity: 0.5,
    paddingBottom: 5,
  },
  activeTab: {
    fontWeight: 'bold',
    borderBottomColor: '#000',
    borderBottomWidth: 3,
    opacity: 1,
  },
  sevenDays: {
    flexDirection: 'row',
    gap: 10,
  },
  cardList: {
    flexDirection: 'row',
    gap: 10,
  },
});
export default BottomMenu;
