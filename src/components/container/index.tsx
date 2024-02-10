import React from 'react';
import styles from './Container.module.css'
import WeatherIcon from '../weathericons';

 export interface ForecastData {
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
    lastUpdated: number; 
}

interface ContainerProps {
    data: ForecastData | null;
}

const Container: React.FC<ContainerProps> = ({ data }) => {
    if (!data) return null;

    const { name, main, weather, wind, lastUpdated } = data;

    const temperature = main ? Math.round(main.temp - 273.15) : 0;
    const description = weather && weather.length > 0 ? weather[0].description : '';
    const { speed, deg, gust } = wind || { speed: 0, deg: 0, gust: 0 };
    const lastUpdatedTime = lastUpdated ? new Date(lastUpdated * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '';

    console.log('Data:', data);
 

    return (
        <div className={styles.weathercontainer} id="weather-container">
            <div className={styles.weatherinfo} id="weather-info">
                <h1 className={styles.city}>{name}</h1>
                <p>{description}</p>
                <p> {speed} m/s, {deg}°, Gust: {gust} m/s</p>
                <p>Last Updated: {lastUpdatedTime}</p> 
             
            </div>
            <div className={styles.temp} id="temp-div">
                <WeatherIcon weatherCondition={description} />
                <p>{temperature}°C</p>
            </div>
            
        </div>
    );
};


export default Container;






   