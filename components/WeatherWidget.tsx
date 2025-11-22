
import React, { useEffect, useState } from 'react';
import { Cloud, Sun, Moon, CloudRain, CloudSnow } from 'lucide-react';
import { fetchWeather } from '../services/openSourceApis';
import { WeatherData } from '../types';

export const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    fetchWeather().then(setWeather);
  }, []);

  if (!weather) return null;

  const getIcon = () => {
    const { condition, isDay } = weather;
    if (condition.includes('Rain')) return <CloudRain size={14} />;
    if (condition.includes('Snow')) return <CloudSnow size={14} />;
    if (condition.includes('Cloud') || condition.includes('Fog')) return <Cloud size={14} />;
    return isDay ? <Sun size={14} /> : <Moon size={14} />;
  };

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800/50 backdrop-blur-sm text-xs font-medium text-neutral-600 dark:text-neutral-400 mt-2 animate-fade-in shadow-sm">
      <span className={weather.isDay ? "text-amber-500 dark:text-amber-300" : "text-indigo-500 dark:text-indigo-300"}>
        {getIcon()}
      </span>
      <span>
        {weather.temperature}°C {weather.condition} in Bremen
      </span>
    </div>
  );
};
