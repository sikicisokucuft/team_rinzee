import React, { useState, useEffect } from 'react';

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 12, s: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { ...prev, h: prev.h - 1, m: 59, s: 59 };
        return { h: 2, m: 12, s: 0 }; // Reset to create perpetual urgency
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-2 font-mono text-violet-600 text-xl font-bold">
      <div className="bg-violet-50 px-2 py-1 rounded border border-violet-200">
        {timeLeft.h.toString().padStart(2, '0')}
      </div>
      <span className="self-center text-violet-400">:</span>
      <div className="bg-violet-50 px-2 py-1 rounded border border-violet-200">
        {timeLeft.m.toString().padStart(2, '0')}
      </div>
      <span className="self-center text-violet-400">:</span>
      <div className="bg-violet-50 px-2 py-1 rounded border border-violet-200">
        {timeLeft.s.toString().padStart(2, '0')}
      </div>
    </div>
  );
};

export default Countdown;