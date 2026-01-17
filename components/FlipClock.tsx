import React, { useState, useEffect } from 'react';

const FlipClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="flex flex-col items-center justify-center pointer-events-none select-none">
      <h1 className="text-8xl md:text-9xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tighter">
        {formatTime(time)}
      </h1>
      <p className="text-nexus-400 font-sans tracking-widest uppercase text-sm mt-4">
        {formatDate(time)} • System Optimal
      </p>
    </div>
  );
};

export default FlipClock;