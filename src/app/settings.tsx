import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { useStore } from '@/store';
import { observer } from 'mobx-react';
import { TemperatureUnitEnum } from '@/enum/temperatureUnit.enum';
import { WindSpeedUnitEnum } from '@/enum/windSpeedUnit.enum';
import { AtmosphericPressureUnitEnum } from '@/enum/atmosphericPressureUnit.enum';

const SettingsScreen = observer(() => {
  const { settingsStore } = useStore();

  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <Text style={styles.blockHeader}>UNITS</Text>
        <View>
          <View>
            <Text>Temperature units</Text>
            <Picker
              selectedValue={settingsStore.temperatureUnit}
              onValueChange={(value) => settingsStore.setTemperatureUnit(value)}
            >
              <Picker.Item
                label={TemperatureUnitEnum.Celsius}
                value={TemperatureUnitEnum.Celsius}
              />
              <Picker.Item
                label={TemperatureUnitEnum.Fahrenheit}
                value={TemperatureUnitEnum.Fahrenheit}
              />
            </Picker>
          </View>
          <View>
            <Text>Wind speed units</Text>
            <Picker
              selectedValue={settingsStore.windSpeedUnit}
              onValueChange={(value) => settingsStore.setWindSpeedUnit(value)}
            >
              <Picker.Item
                label={WindSpeedUnitEnum.MetersPerSecond}
                value={WindSpeedUnitEnum.MetersPerSecond}
              />
              <Picker.Item
                label={WindSpeedUnitEnum.KilometersPerHour}
                value={WindSpeedUnitEnum.KilometersPerHour}
              />
              <Picker.Item
                label={WindSpeedUnitEnum.MilesPerHour}
                value={WindSpeedUnitEnum.MilesPerHour}
              />
            </Picker>
          </View>
          <View>
            <Text>Atmospheric pressure units</Text>
            <Picker
              selectedValue={settingsStore.atmosphericPressureUnit}
              onValueChange={(value) => settingsStore.setAtmosphericPressureUnit(value)}
            >
              <Picker.Item
                label={AtmosphericPressureUnitEnum.MercuryMM}
                value={AtmosphericPressureUnitEnum.MercuryMM}
              />
              <Picker.Item
                label={AtmosphericPressureUnitEnum.hPa}
                value={AtmosphericPressureUnitEnum.hPa}
              />
              <Picker.Item
                label={AtmosphericPressureUnitEnum.atm}
                value={AtmosphericPressureUnitEnum.atm}
              />
            </Picker>
          </View>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  block: {
    marginBottom: 20,
  },
  blockHeader: {
    color: '#9C9EAA',
    marginBottom: 20,
  },
});

export default SettingsScreen;
