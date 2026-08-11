import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'ph_promo_expiry';
const DEFAULT_DURATION = 2 * 3600 + 12 * 60; // 2 hours 12 minutes

const Countdown: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [remaining, setRemaining] = useState<number>(() => {
    if (typeof window === 'undefined') return DEFAULT_DURATION;
    const now = Date.now();
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const target = parseInt(stored, 10);
      if (!isNaN(target) && target > now) {
        return Math.floor((target - now) / 1000);
      }
    }
    const newTarget = now + DEFAULT_DURATION * 1000;
    localStorage.setItem(STORAGE_KEY, newTarget.toString());
    return DEFAULT_DURATION;
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const stored = localStorage.getItem(STORAGE_KEY);
      let target = stored ? parseInt(stored, 10) : 0;
      if (isNaN(target) || target <= now) {
        target = now + DEFAULT_DURATION * 1000;
        localStorage.setItem(STORAGE_KEY, target.toString());
      }
      setRemaining(Math.max(0, Math.floor((target - now) / 1000)));
    };

    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  const h = Math.floor(remaining / 3600);
  const m = Math.floor((remaining % 3600) / 60);
  const s = remaining % 60;

  return (
    <div className={`flex items-center gap-1 font-mono font-bold tracking-tight ${compact ? 'text-xs' : 'text-xs md:text-sm'}`}>
      <div className="bg-blue-600 text-white px-2 py-0.5 rounded-md shadow-xs text-center min-w-[28px] tabular-nums">
        {h.toString().padStart(2, '0')}<span className="text-[10px] font-normal text-blue-200 ml-0.5">h</span>
      </div>
      <span className="text-blue-400 font-sans text-xs font-semibold">:</span>
      <div className="bg-blue-600 text-white px-2 py-0.5 rounded-md shadow-xs text-center min-w-[28px] tabular-nums">
        {m.toString().padStart(2, '0')}<span className="text-[10px] font-normal text-blue-200 ml-0.5">m</span>
      </div>
      <span className="text-blue-400 font-sans text-xs font-semibold">:</span>
      <div className="bg-blue-600 text-white px-2 py-0.5 rounded-md shadow-xs text-center min-w-[28px] tabular-nums">
        {s.toString().padStart(2, '0')}<span className="text-[10px] font-normal text-blue-200 ml-0.5">s</span>
      </div>
    </div>
  );
};

export default Countdown;