
interface ICurrentProps {
    date: string;
    temperature: number;
    wind: number;
    description: string;
}


interface WeatherData {
    name: string;
    main: {
        temp: number;
    };
    weather: {
        description: string;
        icon: string;
    }[];
}


interface ContainerProps {
    data: WeatherData | null;
}


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
