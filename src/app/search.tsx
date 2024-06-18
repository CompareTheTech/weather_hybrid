import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import SearchIcon from '@/components/icons/SearchIcon';
import { Link, router } from 'expo-router';
import CrossIcon from '@/components/icons/CrossIcon';
import { getGeoLocation } from '@/api/getGeoLocation';
import RightArrowIcon from '@/components/icons/RightArrowIcon';
import { countries } from 'country-data';
import { useStore } from '@/store';
import { CityLocationData } from '@/interfaces/cityLocationData';

export default function SearchScreen() {
  const [search, setSearch] = useState('');
  const [cities, setCities] = useState<CityLocationData[] | null>(null);

  const clearSearch = () => {
    setSearch('');
  };

  useEffect(() => {
    if (!search.length) {
      return;
    }

    const timeOutId = setTimeout(
      () =>
        getGeoLocation(search).then((data) => {
          setCities(data);
        }),
      500
    );
    return () => clearTimeout(timeOutId);
  }, [search]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <View style={styles.searchIcon}>
            <SearchIcon />
          </View>
          <TextInput
            style={styles.search}
            placeholder="Search..."
            value={search}
            onChangeText={(value) => setSearch(value)}
            autoFocus={true}
          />
          <Pressable style={styles.crossIcon} onPress={clearSearch}>
            <CrossIcon />
          </Pressable>
        </View>
        <Link href="/" style={styles.cancelButton}>
          <Text>Cancel</Text>
        </Link>
      </View>
      <CitiesList cities={cities} />
    </View>
  );
}

interface CitiesListProps {
  cities: CityLocationData[] | null;
}

const CitiesList: FC<CitiesListProps> = ({ cities }) => {
  if (cities === null) {
    return;
  }

  if (!cities.length) {
    return (
      <View style={styles.noResult}>
        <Text>No result</Text>
      </View>
    );
  }

  const { activeCity } = useStore();

  const selectCity = (city: CityLocationData) => {
    activeCity.setCurrentLocation(city);
    router.replace('/');
  };

  return (
    <View>
      {cities.map((city) => (
        <Pressable
          key={`${city.lat}_${city.lon}`}
          style={styles.city}
          onPress={() => selectCity(city)}
        >
          <View>
            <Text style={styles.cityName}>{city.name}</Text>
            <Text>
              {city.state && `${city.state}, `}
              {countries[city.country].name}
            </Text>
          </View>
          <RightArrowIcon />
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 30,
    alignContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 50,
  },
  search: {
    flex: 1,
  },
  searchIcon: {
    transform: [{ scale: 0.5 }],
  },
  crossIcon: {
    justifyContent: 'center',
    transform: [{ scale: 0.6 }],
    paddingLeft: 10,
    paddingRight: 10,
  },
  cancelButton: {
    padding: 10,
  },
  city: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingVertical: 10,
    marginVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 50,
    justifyContent: 'space-between',
    paddingRight: 20,
    alignItems: 'center',
  },
  cityName: {
    fontWeight: 'bold',
  },
  noResult: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
