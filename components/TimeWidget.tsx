
import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

export const TimeWidget: React.FC = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/Berlin',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      };
      setTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 backdrop-blur-sm text-xs font-medium text-neutral-600 dark:text-neutral-400 animate-fade-in shadow-sm">
      <Clock size={14} className="text-teal-600 dark:text-teal-400" />
      <span>{time} <span className="hidden sm:inline">in Bremen</span></span>
    </div>
  );
};
