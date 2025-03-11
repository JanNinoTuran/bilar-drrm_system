import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Cloud,
  CloudRain,
  Sun,
  CloudSun,
  AlertTriangle,
  Droplets,
  Wind,
} from "lucide-react";
import Clock from "./Clock";

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
  }[];
  wind: {
    speed: number;
  };
  name: string;
  sys: {
    country: string;
  };
}

interface MiniWeatherWidgetProps {
  city?: string;
  lat?: number;
  lon?: number;
  apiKey?: string;
  showDate?: boolean;
}

const MiniWeatherWidget: React.FC<MiniWeatherWidgetProps> = ({
  city = "Bilar",
  lat = 9.7177,
  lon = 124.1146,
  apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY,
  showDate = false,
}) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const queryParam =
          lat && lon
            ? `lat=${lat}&lon=${lon}`
            : `q=${encodeURIComponent(city)}`;
        const url = `https://api.openweathermap.org/data/2.5/weather?${queryParam}&units=metric&appid=${apiKey}`;

        if (!apiKey) {
          setWeatherData(getMockWeatherData());
          setIsLoading(false);
          return;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Weather API error: ${response.status}`);
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setWeatherData(getMockWeatherData());
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
    const intervalId = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [city, lat, lon, apiKey]);

  const getMockWeatherData = (): WeatherData => {
    return {
      main: {
        temp: 28.5,
        feels_like: 30.2,
        humidity: 75,
      },
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "clear sky",
        },
      ],
      wind: {
        speed: 3.6,
      },
      name: "Bilar",
      sys: {
        country: "PH",
      },
    };
  };

  const getWeatherIcon = (weatherId: number) => {
    if (weatherId >= 200 && weatherId < 300) {
      return <AlertTriangle className="h-5 w-5 text-purple-500" />;
    } else if (weatherId >= 300 && weatherId < 600) {
      return <CloudRain className="h-5 w-5 text-blue-500" />;
    } else if (weatherId >= 600 && weatherId < 700) {
      return <Cloud className="h-5 w-5 text-gray-300" />;
    } else if (weatherId >= 700 && weatherId < 800) {
      return <Cloud className="h-5 w-5 text-gray-400" />;
    } else if (weatherId === 800) {
      return <Sun className="h-5 w-5 text-yellow-500" />;
    } else if (weatherId === 801) {
      return <CloudSun className="h-5 w-5 text-yellow-400" />;
    } else {
      return <Cloud className="h-5 w-5 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-1 text-sm text-gray-600">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Loading weather...</span>
      </div>
    );
  }

  if (!weatherData) {
    return null;
  }

  return (
    <div className="flex flex-col items-end gap-1">
      {showDate && (
        <p className="text-sm text-gray-500 mb-1">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      )}
      <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-1.5 rounded-full shadow-sm border border-blue-100 hover:shadow-md transition-all duration-300">
        <div className="flex items-center gap-1">
          {getWeatherIcon(weatherData.weather[0].id)}
          <span className="font-medium text-sm">
            {Math.round(weatherData.main.temp)}°C
          </span>
        </div>
        <Badge variant="outline" className="bg-white/80 text-xs font-normal">
          {weatherData.name}
        </Badge>
        <div className="hidden sm:flex items-center gap-1 text-xs text-gray-500">
          <Droplets className="h-3 w-3 text-blue-400" />
          <span>{weatherData.main.humidity}%</span>
        </div>
        <div className="hidden sm:flex items-center gap-1 text-xs text-gray-500">
          <Wind className="h-3 w-3 text-blue-400" />
          <span>{Math.round(weatherData.wind.speed * 3.6)} km/h</span>
        </div>
        <Clock />
      </div>
    </div>
  );
};

export default MiniWeatherWidget;
