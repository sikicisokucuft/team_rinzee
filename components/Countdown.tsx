import React, { useState, useEffect } from 'react';

const Countdown: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
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
    <div className={`flex items-center gap-1 font-mono font-bold tracking-tight ${compact ? 'text-xs' : 'text-xs md:text-sm'}`}>
      <div className="bg-blue-600 text-white px-2 py-0.5 rounded-md shadow-xs text-center min-w-[28px] tabular-nums">
        {timeLeft.h.toString().padStart(2, '0')}<span className="text-[10px] font-normal text-blue-200 ml-0.5">h</span>
      </div>
      <span className="text-blue-400 font-sans text-xs font-semibold">:</span>
      <div className="bg-blue-600 text-white px-2 py-0.5 rounded-md shadow-xs text-center min-w-[28px] tabular-nums">
        {timeLeft.m.toString().padStart(2, '0')}<span className="text-[10px] font-normal text-blue-200 ml-0.5">m</span>
      </div>
      <span className="text-blue-400 font-sans text-xs font-semibold">:</span>
      <div className="bg-blue-600 text-white px-2 py-0.5 rounded-md shadow-xs text-center min-w-[28px] tabular-nums">
        {timeLeft.s.toString().padStart(2, '0')}<span className="text-[10px] font-normal text-blue-200 ml-0.5">s</span>
      </div>
    </div>
  );
};

export default Countdown;