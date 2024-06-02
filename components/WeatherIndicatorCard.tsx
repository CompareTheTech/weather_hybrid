import { StyleSheet, Text, View } from 'react-native';
import { FC, ReactNode } from 'react';

interface WeatherIndicatorCardProps {
  icon: ReactNode;
  name: string;
  data: string;
}

const WeatherIndicatorCard: FC<WeatherIndicatorCardProps> = ({ icon, name, data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>{icon}</View>
      <View style={styles.name}>
        <Text>{name}</Text>
      </View>
      <Text style={styles.data}>{data}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 80,
    alignItems: 'center',
    backgroundColor: 'rgba(256, 256, 256, 0.4)',
    borderRadius: 15,
    padding: 15,
  },
  icon: {
    flex: 2,
    marginRight: 10,
    justifyContent: 'flex-start',
  },
  name: {
    flex: 7,
  },
  data: {
    flex: 4,
    textAlign: 'right',
  },
});

export default WeatherIndicatorCard;
