import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  AlertTriangle,
  Cloud,
  CloudRain,
  Sun,
  CloudSun,
  Wind,
  Thermometer,
  Droplets,
} from "lucide-react";

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
  name: string;
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
}

interface OpenWeatherWidgetProps {
  city?: string;
  lat?: number;
  lon?: number;
  apiKey?: string;
}

const OpenWeatherWidget: React.FC<OpenWeatherWidgetProps> = ({
  city = "Bilar",
  lat = 9.7177,
  lon = 124.1146,
  apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY,
}) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Use coordinates if available, otherwise use city name
        const queryParam =
          lat && lon
            ? `lat=${lat}&lon=${lon}`
            : `q=${encodeURIComponent(city)}`;
        const url = `https://api.openweathermap.org/data/2.5/weather?${queryParam}&units=metric&appid=${apiKey}`;

        // If no API key, use mock data
        if (!apiKey) {
          console.warn("No OpenWeather API key provided. Using mock data.");
          setWeatherData(getMockWeatherData());
          setIsLoading(false);
          return;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(
            `Weather API error: ${response.status} ${response.statusText}`,
          );
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError("Failed to load weather data. Using default forecast.");
        setWeatherData(getMockWeatherData());
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();

    // Refresh weather data every 30 minutes
    const intervalId = setInterval(fetchWeather, 30 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [city, lat, lon, apiKey]);

  const getMockWeatherData = (): WeatherData => {
    return {
      main: {
        temp: 28.5,
        feels_like: 30.2,
        humidity: 75,
        pressure: 1010,
      },
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "01d",
        },
      ],
      wind: {
        speed: 3.6,
        deg: 120,
      },
      name: "Bilar",
      dt: Date.now() / 1000,
      sys: {
        country: "PH",
        sunrise: Date.now() / 1000 - 6 * 3600,
        sunset: Date.now() / 1000 + 6 * 3600,
      },
    };
  };

  const getWeatherIcon = (weatherId: number) => {
    // Based on OpenWeather API weather condition codes
    // https://openweathermap.org/weather-conditions
    if (weatherId >= 200 && weatherId < 300) {
      // Thunderstorm
      return <AlertTriangle className="h-16 w-16 text-purple-500" />;
    } else if (weatherId >= 300 && weatherId < 400) {
      // Drizzle
      return <CloudRain className="h-16 w-16 text-blue-400" />;
    } else if (weatherId >= 500 && weatherId < 600) {
      // Rain
      return <CloudRain className="h-16 w-16 text-blue-500" />;
    } else if (weatherId >= 600 && weatherId < 700) {
      // Snow
      return <Cloud className="h-16 w-16 text-gray-300" />;
    } else if (weatherId >= 700 && weatherId < 800) {
      // Atmosphere (fog, mist, etc.)
      return <Cloud className="h-16 w-16 text-gray-400" />;
    } else if (weatherId === 800) {
      // Clear
      return <Sun className="h-16 w-16 text-yellow-500" />;
    } else if (weatherId === 801) {
      // Few clouds
      return <CloudSun className="h-16 w-16 text-yellow-400" />;
    } else {
      // Clouds
      return <Cloud className="h-16 w-16 text-gray-500" />;
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getWindDirection = (degrees: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <span className="ml-2">Loading weather data...</span>
        </CardContent>
      </Card>
    );
  }

  if (!weatherData) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6">
          <div className="text-center text-red-500">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
            <p>Failed to load weather data</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">
                {weatherData.name}, {weatherData.sys.country}
              </h2>
              <p className="text-sm opacity-90">
                {new Date(weatherData.dt * 1000).toLocaleDateString([], {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <div className="mt-4">
                <span className="text-4xl font-bold">
                  {Math.round(weatherData.main.temp)}°C
                </span>
                <p className="text-sm mt-1">
                  Feels like {Math.round(weatherData.main.feels_like)}°C
                </p>
              </div>
            </div>
            <div className="text-center">
              {getWeatherIcon(weatherData.weather[0].id)}
              <p className="text-sm mt-1 capitalize">
                {weatherData.weather[0].description}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Droplets className="h-5 w-5 text-blue-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Humidity</p>
                <p className="font-medium">{weatherData.main.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center">
              <Wind className="h-5 w-5 text-blue-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Wind</p>
                <p className="font-medium">
                  {Math.round(weatherData.wind.speed * 3.6)} km/h{" "}
                  {getWindDirection(weatherData.wind.deg)}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <Sun className="h-5 w-5 text-yellow-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Sunrise</p>
                <p className="font-medium">
                  {formatTime(weatherData.sys.sunrise)}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <Sun className="h-5 w-5 text-gray-700 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Sunset</p>
                <p className="font-medium">
                  {formatTime(weatherData.sys.sunset)}
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
              {error}
            </div>
          )}

          <div className="mt-4 text-center text-xs text-gray-500">
            <p>
              Last updated:{" "}
              {new Date(weatherData.dt * 1000).toLocaleTimeString()}
            </p>
            <p className="mt-1">Powered by OpenWeather API</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OpenWeatherWidget;
