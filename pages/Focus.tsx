import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../store/useStore.ts';
import { Play, Pause, RotateCcw, Coffee, Zap, Music, ChevronDown } from 'lucide-react';

const Focus: React.FC = () => {
  const { timerSeconds, isTimerRunning, setTimerSeconds, setIsTimerRunning } = useStore();
  const [showOptions, setShowOptions] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // Default max time for progress calculation (defaults to 25m if not set)
  const [maxTime, setMaxTime] = useState(1500); 

  useEffect(() => {
    if (isTimerRunning && timerSeconds > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimerSeconds(timerSeconds - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isTimerRunning, timerSeconds, setTimerSeconds, setIsTimerRunning]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggle = () => setIsTimerRunning(!isTimerRunning);
  const handleReset = () => {
    setIsTimerRunning(false);
    setTimerSeconds(maxTime);
  };

  const setDuration = (mins: number) => {
      const secs = mins * 60;
      setMaxTime(secs);
      setTimerSeconds(secs);
      setIsTimerRunning(false);
      setShowOptions(false);
  };

  const progress = (maxTime - timerSeconds) / maxTime * 100;

  return (
    <div className="flex flex-col items-center justify-center py-12 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
      <div className="w-full max-w-2xl text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-5xl font-black">Deep Work</h2>
          <p className="text-white/40 font-medium">Focus is a muscle. Train it with intent.</p>
        </div>

        <div className="relative flex items-center justify-center group">
          <svg className="w-80 h-80 -rotate-90">
            <circle
              cx="160" cy="160" r="150"
              className="stroke-white/5 fill-none"
              strokeWidth="12"
            />
            <circle
              cx="160" cy="160" r="150"
              className="stroke-pink-500 fill-none transition-all duration-1000 ease-linear"
              strokeWidth="12"
              strokeDasharray={942.48}
              strokeDashoffset={942.48 - (942.48 * progress) / 100}
              strokeLinecap="round"
            />
          </svg>
          
          <div className="absolute flex flex-col items-center z-10">
            <button 
                onClick={() => !isTimerRunning && setShowOptions(!showOptions)}
                className={`relative group/timer ${isTimerRunning ? 'cursor-default' : 'cursor-pointer'}`}
            >
                <span className="text-8xl font-mono font-black tracking-tighter tabular-nums transition-colors group-hover/timer:text-pink-400">
                    {formatTime(timerSeconds)}
                </span>
                {!isTimerRunning && (
                    <div className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover/timer:opacity-100 transition-opacity">
                        <ChevronDown className="w-8 h-8 text-white/20" />
                    </div>
                )}
            </button>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 mt-4">
                {isTimerRunning ? 'Focusing...' : 'Select Duration'}
            </span>

            {/* Duration Selector Popup */}
            {showOptions && !isTimerRunning && (
                <div className="absolute top-full mt-4 bg-[#0a0a0a] border border-white/10 p-2 rounded-2xl shadow-2xl flex flex-col gap-1 w-48 animate-in slide-in-from-top-2 z-50">
                    {[25, 50, 75, 90].map(mins => (
                        <button 
                            key={mins}
                            onClick={() => setDuration(mins)}
                            className={`px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest text-left hover:bg-white/10 transition-colors flex justify-between ${maxTime === mins * 60 ? 'text-pink-400 bg-white/5' : 'text-white/60'}`}
                        >
                            <span>{mins} Min</span>
                            {maxTime === mins * 60 && <div className="w-2 h-2 rounded-full bg-pink-500 self-center" />}
                        </button>
                    ))}
                </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center gap-6">
          <button 
            onClick={handleReset}
            className="p-5 bg-white/5 hover:bg-white/10 rounded-3xl transition-all border border-white/5"
          >
            <RotateCcw className="w-6 h-6 text-white/60" />
          </button>
          <button 
            onClick={handleToggle}
            className={`w-24 h-24 flex items-center justify-center rounded-full transition-all shadow-2xl ${
              isTimerRunning 
                ? 'bg-white text-black scale-105' 
                : 'bg-gradient-to-r from-orange-400 to-pink-500 text-white hover:scale-105'
            }`}
          >
            {isTimerRunning ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10 fill-current" />}
          </button>
          <button className="p-5 bg-white/5 hover:bg-white/10 rounded-3xl transition-all border border-white/5">
            <Music className="w-6 h-6 text-white/60" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Focus;