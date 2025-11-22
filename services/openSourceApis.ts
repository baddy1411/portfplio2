
import { WeatherData, GithubProfile } from '../types';

// Open-Meteo API (Free, No Key required)
// Coordinates for Bremen, Germany
const LAT = 53.0793;
const LON = 8.8017;

export const fetchWeather = async (): Promise<WeatherData | null> => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,is_day,weather_code&timezone=auto`
    );
    const data = await response.json();
    
    if (!data.current) return null;

    // Map WMO weather codes to text
    const getCondition = (code: number) => {
      if (code === 0) return 'Clear sky';
      if (code >= 1 && code <= 3) return 'Partly cloudy';
      if (code >= 45 && code <= 48) return 'Foggy';
      if (code >= 51 && code <= 67) return 'Rain';
      if (code >= 71 && code <= 77) return 'Snow';
      return 'Cloudy';
    };

    return {
      temperature: Math.round(data.current.temperature_2m),
      isDay: data.current.is_day === 1,
      condition: getCondition(data.current.weather_code)
    };
  } catch (error) {
    // Silently fail for weather widget
    return null;
  }
};

// GitHub Public API
export const fetchGithubProfile = async (username: string): Promise<GithubProfile | null> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      // User not found or rate limited. Return null silently to show fallback UI.
      return null;
    }
    return await response.json();
  } catch (error) {
    // Network error. Return null silently.
    return null;
  }
};
