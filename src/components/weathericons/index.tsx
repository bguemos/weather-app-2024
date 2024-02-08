import React from 'react';

interface WeatherIconProps {
  weatherCondition: string; 
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ weatherCondition }) => {
  let iconSrc;

  switch (weatherCondition) {
    case 'Clear':
      iconSrc = '/sun.png'; 
      break;
    case 'Clouds':
      iconSrc = '/cloud2.png';
      break;
    case 'Rain':
      iconSrc = '/rain.png';
      break;
    case 'Overcast':
      iconSrc = '/mixed.png';
      break;
    default:
      iconSrc = '/mixed.png'; 
  }

  return <img src={iconSrc} alt={weatherCondition} style={{ width: 70, height: 65 }} />;
};

export default WeatherIcon;

  
  
