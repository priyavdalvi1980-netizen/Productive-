import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { LayoutGrid, ListTodo, Settings as SettingsIcon, Zap, Sparkles, Archive } from 'lucide-react';
import { useStore } from './store/useStore.ts';
import { Page } from './types.ts';
import Dashboard from './pages/Dashboard.tsx';
import TasksPage from './pages/TasksPage.tsx';
import SettingsPage from './pages/Settings.tsx';
import Focus from './pages/Focus.tsx';
import Assistant from './pages/Assistant.tsx';
import CompletedPage from './pages/CompletedPage.tsx';
import AuthPage from './pages/AuthPage.tsx';

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [bootText, setBootText] = useState("INITIALIZING NEURAL INTERFACE...");

  useEffect(() => {
    const bootSequence = [
      { p: 10, t: "LOADING CORE MODULES..." },
      { p: 30, t: "SYNCHRONIZING DATABASES..." },
      { p: 50, t: "ESTABLISHING SECURE LINK..." },
      { p: 75, t: "OPTIMIZING NEURAL PATHWAYS..." },
      { p: 90, t: "SYSTEM READY." },
      { p: 100, t: "WELCOME USER." }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < bootSequence.length) {
        setLoadingProgress(bootSequence[currentStep].p);
        setBootText(bootSequence[currentStep].t);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(onFinish, 800);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[1000] bg-black text-white flex flex-col items-center justify-center overflow-hidden font-mono">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[linear-gradient(rgba(0,255,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [perspective:1000px] [transform-style:preserve-3d] [transform:rotateX(60deg)_scale(2)] origin-top animate-pan-grid"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-md px-6">
        {/* Animated Logo */}
        <div className="relative w-32 h-32 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-500 border-r-purple-500 animate-[spin_2s_linear_infinite]" />
            <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-pink-500 border-l-blue-500 animate-[spin_3s_linear_infinite_reverse]" />
            <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-6xl font-black text-white animate-pulse">∞</span>
            </div>
            <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full animate-pulse"></div>
        </div>

        {/* Title with Glitch Effect */}
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter relative group">
          <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-white to-purple-500">
            PRODUCTIVE
          </span>
          <span className="absolute top-0 left-0 -ml-1 text-red-500 opacity-70 animate-glitch-1 hidden group-hover:block">PRODUCTIVE</span>
          <span className="absolute top-0 left-0 ml-1 text-blue-500 opacity-70 animate-glitch-2 hidden group-hover:block">PRODUCTIVE</span>
        </h1>

        {/* Progress Bar */}
        <div className="w-full space-y-2">
            <div className="flex justify-between text-[10px] uppercase tracking-widest text-cyan-500/80">
                <span>{bootText}</span>
                <span>{loadingProgress}%</span>
            </div>
            <div className="w-full h-1 bg-gray-900 rounded-full overflow-hidden border border-white/10">
                <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 shadow-[0_0_10px_rgba(6,182,212,0.8)] transition-all duration-300 ease-out"
                    style={{ width: `${loadingProgress}%` }}
                />
            </div>
        </div>
      </div>

      <style>{`
        @keyframes pan-grid {
            0% { transform: rotateX(60deg) scale(2) translateY(0); }
            100% { transform: rotateX(60deg) scale(2) translateY(40px); }
        }
        @keyframes glitch-1 {
          0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 2px); }
          20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -2px); }
          40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
          60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
          80% { clip-path: inset(10% 0 70% 0); transform: translate(-2px, 2px); }
          100% { clip-path: inset(30% 0 50% 0); transform: translate(2px, -2px); }
        }
        @keyframes glitch-2 {
          0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -2px); }
          20% { clip-path: inset(80% 0 5% 0); transform: translate(-2px, 2px); }
          40% { clip-path: inset(30% 0 20% 0); transform: translate(2px, -2px); }
          60% { clip-path: inset(10% 0 80% 0); transform: translate(-2px, 2px); }
          80% { clip-path: inset(50% 0 30% 0); transform: translate(2px, -2px); }
          100% { clip-path: inset(70% 0 10% 0); transform: translate(-2px, 2px); }
        }
      `}</style>
    </div>
  );
};

const Navigation = () => {
  const location = useLocation();
  const { widgets, userName } = useStore();
  
  const navItems = [
    { id: Page.Dashboard, icon: LayoutGrid, label: 'Dash' },
    { id: Page.Tasks, icon: ListTodo, label: 'Tasks' },
    ...(widgets.focus ? [{ id: Page.Focus, icon: Zap, label: 'Focus' }] : []),
    ...(widgets.focus ? [{ id: Page.Assistant, icon: Sparkles, label: 'AI' }] : []),
    { id: 'completed', icon: Archive, label: 'Archive' },
    { id: 'settings', icon: SettingsIcon, label: 'Settings' },
  ];

  return (
    <div className="
      fixed z-50 glass-panel transition-all duration-300 shadow-2xl border-white/10
      /* Mobile: Bottom Center, Horizontal */
      bottom-6 left-1/2 -translate-x-1/2 flex flex-row items-center gap-2 p-2 rounded-[2.5rem] max-w-[95vw] overflow-x-auto no-scrollbar
      /* Desktop: Left Center, Vertical */
      md:left-6 md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:translate-x-0 md:flex-col md:gap-4 md:p-3 md:rounded-[2rem] md:w-auto md:max-w-none md:overflow-visible
    ">
      {navItems.map(item => {
        const isActive = location.pathname === (item.id === 'dashboard' ? '/' : `/${item.id}`);
        return (
          <Link
            key={item.id}
            to={item.id === 'dashboard' ? '/' : `/${item.id}`}
            className={`relative p-3 md:p-3.5 rounded-[1.5rem] transition-all duration-300 group flex items-center justify-center flex-shrink-0
              ${isActive ? 'bg-gradient-primary text-white shadow-lg scale-110' : 'hover:bg-white/10 text-white/40 hover:text-white hover:scale-105'}`}
          >
             <item.icon className={`w-5 h-5 md:w-6 md:h-6 ${isActive ? 'fill-current' : ''}`} />
             {isActive && (
               <div className="absolute 
                 /* Mobile: Tooltip Top */
                 -top-14 left-1/2 -translate-x-1/2
                 /* Desktop: Tooltip Right */
                 md:top-1/2 md:left-full md:ml-4 md:translate-x-0 md:-translate-y-1/2 md:bottom-auto
                 bg-white text-black text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 animate-in fade-in duration-200 shadow-xl pointer-events-none whitespace-nowrap hidden md:block z-[60]">
                 {item.label}
                 {/* Arrow adjustment */}
                 <div className="absolute w-2 h-2 bg-white rotate-45
                    /* Mobile Arrow */
                    -bottom-1 left-1/2 -translate-x-1/2
                    /* Desktop Arrow */
                    md:left-[-3px] md:top-1/2 md:-translate-y-1/2 md:bottom-auto
                 " />
               </div>
             )}
          </Link>
        );
      })}

      {userName && (
        <>
            <div className="w-px h-8 md:w-8 md:h-px bg-white/10 mx-1 md:my-1 flex-shrink-0" />
            <div className="relative group px-1 flex-shrink-0">
                <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-[#FF8C42] to-[#F04393] p-[2px] shadow-lg cursor-default transition-transform hover:scale-105">
                    <div className="w-full h-full rounded-full bg-black/90 flex items-center justify-center overflow-hidden">
                        <span className="text-sm font-black text-white">{userName.charAt(0).toUpperCase()}</span>
                    </div>
                </div>
                 <div className="absolute 
                    /* Mobile Tooltip */
                    -top-14 left-1/2 -translate-x-1/2
                    /* Desktop Tooltip */
                    md:top-1/2 md:left-full md:ml-4 md:translate-x-0 md:-translate-y-1/2 md:bottom-auto
                    bg-white text-black text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-xl pointer-events-none whitespace-nowrap mb-2 md:mb-0 z-[60]">
                     {userName}
                     <div className="absolute w-2 h-2 bg-white rotate-45
                        /* Mobile Arrow */
                        -bottom-1 left-1/2 -translate-x-1/2
                        /* Desktop Arrow */
                        md:left-[-3px] md:top-1/2 md:-translate-y-1/2 md:bottom-auto
                     " />
                 </div>
            </div>
        </>
      )}
    </div>
  );
};

const AppContent = () => {
  return (
    <>
      <div className="pt-24 px-4 md:px-8 max-w-[1600px] mx-auto min-h-screen
         /* Mobile Padding */
         pb-32
         /* Desktop Padding */
         md:pb-10 md:pl-32
      ">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/focus" element={<Focus />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/completed" element={<CompletedPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Navigation />
    </>
  );
};

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const { theme, brandColors, isAuthenticated } = useStore();

  useEffect(() => {
    // Apply theme colors to root
    const root = document.documentElement;
    root.style.setProperty('--brand-color-1', brandColors[0]);
    root.style.setProperty('--brand-color-2', brandColors[1]);
    root.style.setProperty('--brand-color-3', brandColors[2]);
  }, [brandColors]);

  // If splash is running, show it
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  // If not authenticated, show auth page
  if (!isAuthenticated) {
    return <AuthPage />;
  }

  // Otherwise show the main app
  return (
    <HashRouter>
       <AppContent />
    </HashRouter>
  );
};

export default App;