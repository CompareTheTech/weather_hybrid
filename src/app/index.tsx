import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import SearchIcon from '@/components/icons/SearchIcon';
import { LinearGradient } from 'expo-linear-gradient';
import MenuIcon from '@/components/icons/MenuIcon';
import { Link } from 'expo-router';
import { getCurrentLocation } from '@/api/getCurrentLocation';
import { useStore } from '@/store';
import { observer } from 'mobx-react/src';
import { format } from 'date-fns';
import { getWeather } from '@/api/getWeather';
import { transformTemperatureByUnit } from '@/utils/transformTemperatureByUnit';
import WeatherIcon from '@/components/WeatherIcon';
import WeatherIndicatorList from '@/components/WeatherIndicatorList';
import { countries } from 'country-data';
import BottomMenu from '@/components/BottomMenu';
import Loader from '@/components/Loader';

const HomeScreen = observer(() => {
  const { activeCity, settingsStore } = useStore();

  useEffect(() => {
    let weatherPromise: Promise<any> = Promise.resolve();
    if (!activeCity.currentLocation) {
      weatherPromise = getCurrentLocation().then((location) => {
        activeCity.setCurrentLocation(location);
        const [lat, lon] = location.loc?.split(',');
        return getWeather(lat, lon);
      });
    } else {
      const [lat, lon] = activeCity.getCityCoordinates as [string, string];
      weatherPromise = getWeather(lat, lon);
    }

    weatherPromise.then((weather) => {
      activeCity.setWeather(weather);
    });
  }, [activeCity.currentLocation]);

  if (!activeCity.currentLocation || !activeCity.weather) {
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
        <View style={styles.header}>
          <TouchableOpacity style={styles.searchIcon}>
            <Link href="/search">
              <SearchIcon />
            </Link>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuIcon}>
            <Link href="/settings">
              <MenuIcon />
            </Link>
          </TouchableOpacity>
        </View>
        <View style={styles.location}>
          <Text style={styles.city}>
            {'city' in activeCity.currentLocation
              ? activeCity.currentLocation?.city
              : activeCity.currentLocation.name}
          </Text>
          <Text style={styles.region}>{countries[activeCity.currentLocation.country].name}</Text>
          <Text style={styles.date}>{format(new Date(), 'EEE, MMM dd')}</Text>
        </View>
        <View style={styles.weather}>
          <View style={styles.weatherIcon}>
            <WeatherIcon weatherId={activeCity.weather.weather[0].id} />
          </View>
          <View style={styles.temperatureWrapper}>
            <View style={styles.temperature}>
              <Text style={styles.temperatureText}>
                {transformTemperatureByUnit(
                  activeCity.weather?.main.temp,
                  settingsStore.temperatureUnit
                )}
              </Text>
              <Text style={styles.temperatureUnit}>{settingsStore.temperatureUnit}</Text>
            </View>
            <Text style={styles.condition}>{activeCity.weather.weather[0].main}</Text>
          </View>
        </View>
        <WeatherIndicatorList weather={activeCity.weather} />
        <BottomMenu />
      </ScrollView>
    </LinearGradient>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  searchIconText: {
    fontSize: 20,
  },
  menuIcon: {
    padding: 10,
  },
  location: {
    paddingLeft: 10,
  },
  city: {
    fontSize: 40,
    fontWeight: '600',
  },
  region: {
    fontSize: 30,
    fontWeight: '400',
  },
  date: {
    fontSize: 16,
    marginTop: 5,
    color: '#9A938C',
  },
  searchIcon: {
    marginLeft: 20,
  },
  weather: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 50,
    marginBottom: 50,
  },
  weatherIcon: {
    width: '60%',
  },
  temperatureWrapper: {
    flex: 1,
    marginBottom: 20,
  },
  temperature: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  temperatureText: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  temperatureUnit: {
    fontSize: 16,
    color: '#313341',
  },
  condition: {
    flex: 1,
    textAlign: 'center',
  },
});

export default HomeScreen;
