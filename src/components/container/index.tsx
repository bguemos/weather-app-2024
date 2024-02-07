import React from 'react';
import styles from './Container.module.css'
import WeatherIcon from '../weathericons';

interface ForecastData {
    name: string;
    main: {
        temp: number;
    };
    weather: {
        description: string;
    }[];
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
}

interface ContainerProps {
    data: ForecastData | null;
}

const Container: React.FC<ContainerProps> = ({ data }) => {
    if (!data) return null;

    const { name, main, weather, wind } = data;

  
    const temperature = main ? Math.round(main.temp - 273.15) : 0; 
    const description = weather && weather.length > 0 ? weather[0].description : ''; 
    const { speed, deg, gust } = wind || { speed: 0, deg: 0, gust: 0 }; 

    return (
        <div className={styles.weathercontainer} id="weather-container">
        
          
        
            <div className={styles.weatherinfo} id="weather-info">
                <h1 className={styles.city}>{name}</h1>
                <p>{description}</p>
                <p> {speed} m/s, {deg}°, Gust: {gust} m/s</p>
            </div>
            <div className={styles.temp} id="temp-div">
            <WeatherIcon weatherCondition={description}  />
                <p>{temperature}°C</p>
            </div>
        </div>
    );
};

export default Container;






   