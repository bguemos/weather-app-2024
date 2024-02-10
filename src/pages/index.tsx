import React, { useState, useEffect } from 'react';
import Container, { ForecastData }  from '../components/container';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import Header from '../components/header';
import WeatherIcon from '../components/weathericons'; 
import Footer from '../components/footer';

const Home = () => {
    const [data, setData] = useState<ForecastData | null>(null);
    const [forecast, setForecast] = useState<any[]>([]);
    const [city, setCity] = useState('');
    const [lastUpdated, setLastUpdated] = useState('');

    const apiKey = process.env.NEXT_PUBLIC_API;
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}`;

    const getWeather = () => {
        if (!city) {
            alert('Please enter a city');
            return;
        }
        
     
        fetchWeatherData();
    };

    const fetchWeatherData = () => {
        fetch(currentWeatherUrl)
            .then(response => response.json())
            .then(data => {
                setData(data);
                setLastUpdated(new Date(data.dt * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
            })
            .catch(error => {
                console.error('Error fetching current weather data:', error);
                alert('Error fetching current weather data. Please try again.');
            });

        fetch(forecastUrl)
            .then(response => response.json())
            .then(data => {
                const filteredForecast: { [key: string]: any } = data.list.reduce((acc: { [key: string]: any }, current: any) => {
                    const dateParts = current.dt_txt.split('-');
                    const year = parseInt(dateParts[0]);
                    const month = parseInt(dateParts[1]);
                    const day = parseInt(dateParts[2].split(' ')[0]);
                
                    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                    const formattedDate = `${months[month - 1]} ${day}, ${year}`;
                
                    acc[formattedDate] = current;
                    
                    return acc;
                }, {});

                const uniqueForecast = Object.values(filteredForecast);
                setForecast(uniqueForecast);
            })
            .catch(error => {
                console.error('Error fetching forecast data:', error);
                alert('Error fetching forecast data. Please try again.');
            });
    };

    return (
        <>
            <Head>
                <title>WeatherWise</title>
                <meta name="description" content="WeatherWise" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                />
            </Head>
            <Header />
            <main className={styles.maincontent}>
              <h1 className={styles.header}>Weather in Focus: Your Trusted Source for Forecasts</h1>
                <div className={styles.weatherinfo}>
                    <div className={styles.buttonrow}>
                    <input
                        className={styles.inputbox}
                        type="text"
                        id="city"
                        placeholder="Enter City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button className={styles.button} onClick={getWeather}>Get Weather</button>
                    </div>
                    {data && <Container data={data} />}
                </div>
                <div className={styles.forecastcontainer} id="forecast-container">
                    <h2 className={styles.title}>5-Day Forecast</h2>
                    {forecast && forecast.map((item, index) => (
                        <div key={index} className={styles.forecastitems}>
                            <strong><p>{new Date(item.dt * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p></strong>   
                            <p>{Math.round(item.main.temp - 273.15)}°C</p>
                            <p>{item.weather[0].description}</p>
                            <WeatherIcon weatherCondition={item.weather[0].main} />
                        </div>
                    ))}
                </div>
            </main>
            <Footer/>
        </>
    );
};

export default Home;




