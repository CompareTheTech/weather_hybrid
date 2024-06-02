import React, { FC } from 'react';
import ThunderstormCloudIcon from '@/components/icons/clouds/ThunderstormCloudIcon';
import RainCloudIcon from '@/components/icons/clouds/RainCloudIcon';
import SunRainCloudIcon from '@/components/icons/clouds/SunRainCloudIcon';
import CloudSunIcon from '@/components/icons/clouds/CloudSunIcon';
import SnowCloudIcon from '@/components/icons/clouds/SnowCloudIcon';
import SunIcon from '@/components/icons/clouds/SunIcon';
import CloudIcon from '@/components/icons/clouds/CloudIcon';

interface WeatherIconProps {
  weatherId?: number;
  weathercode?: number;
}

const WeatherIcon: FC<WeatherIconProps> = ({ weatherId, weathercode }) => {
  if (weathercode) {
    if ([1, 2, 3, 45, 48].includes(weathercode)) {
      return <CloudSunIcon />;
    }

    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67].includes(weathercode)) {
      return <RainCloudIcon />;
    }

    if ([71, 73, 75, 77, 85, 86].includes(weathercode)) {
      return <SnowCloudIcon />;
    }

    if ([80, 81, 82].includes(weathercode)) {
      return <SunRainCloudIcon />;
    }

    if ([95, 96, 99].includes(weathercode)) {
      return <ThunderstormCloudIcon />;
    }
  }

  if (weatherId) {
    if (weatherId >= 200 && weatherId <= 232) {
      return <ThunderstormCloudIcon />;
    }

    if (weatherId >= 300 && weatherId <= 321) {
      return <RainCloudIcon />;
    }

    if (weatherId >= 500 && weatherId <= 531) {
      return <SunRainCloudIcon />;
    }

    if (weatherId >= 701 && weatherId <= 781) {
      return <CloudSunIcon />;
    }

    if (weatherId >= 600 && weatherId <= 622) {
      return <SnowCloudIcon />;
    }

    if (weatherId >= 801 && weatherId <= 804) {
      return <CloudIcon />;
    }
  }

  return <SunIcon />;
};

export default WeatherIcon;
