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
  const [phase, setPhase] = useState<number>(0);

  useEffect(() => {
    // Cinematic Sequence: Accelerated for performance
    const sequence = [
      { t: 50, p: 1 },
      { t: 600, p: 2 },
      { t: 1200, p: 3 },
      { t: 1500, p: 4 },
      { t: 2200, p: 5 },
      { t: 2500, fn: onFinish }
    ];

    const timeouts = sequence.map(s => setTimeout(() => {
      if (s.fn) s.fn();
      else setPhase(s.p);
    }, s.t));

    return () => timeouts.forEach(clearTimeout);
  }, [onFinish]);

  // Solar Gradient Colors: Orange, Pink, Purple
  const solarColors = ['#FF8C42', '#F04393', '#8D46E7'];
  
  const textGradient = {
    backgroundImage: `linear-gradient(135deg, ${solarColors[0]} 0%, ${solarColors[1]} 50%, ${solarColors[2]} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    filter: 'drop-shadow(0 0 30px rgba(240, 67, 147, 0.6))'
  };

  return (
    <div className={`fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden bg-black transition-all duration-700 ease-in-out
      ${phase === 5 ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100'}`}
    >
        {/* Background Void */}
        <div className="absolute inset-0 bg-[#020202]" />

        {/* Dynamic Gas/Nebula Effect */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`}>
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full mix-blend-screen filter blur-[80px] md:blur-[120px] opacity-50 animate-gas-swirl-1
                bg-[radial-gradient(circle,rgba(255,140,66,0.6)_0%,transparent_70%)] transition-all duration-1000
                ${phase >= 3 ? 'scale-[2.5] opacity-0' : phase >= 1 ? 'scale-100' : 'scale-0'}`} 
            />
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vw] rounded-full mix-blend-screen filter blur-[70px] md:blur-[100px] opacity-50 animate-gas-swirl-2
                bg-[radial-gradient(circle,rgba(240,67,147,0.6)_0%,transparent_70%)] transition-all duration-1000 delay-100
                ${phase >= 3 ? 'scale-[2.5] opacity-0' : phase >= 1 ? 'scale-100' : 'scale-0'}`} 
            />
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45vw] h-[45vw] rounded-full mix-blend-screen filter blur-[90px] md:blur-[130px] opacity-50 animate-gas-swirl-3
                bg-[radial-gradient(circle,rgba(141,70,231,0.6)_0%,transparent_70%)] transition-all duration-1000 delay-200
                ${phase >= 3 ? 'scale-[2.5] opacity-0' : phase >= 1 ? 'scale-100' : 'scale-0'}`} 
            />
        </div>

        {/* Content Container */}
        <div className={`relative z-10 flex flex-col items-center justify-center transition-all duration-700
            ${phase >= 4 ? 'scale-100' : 'scale-95'}`}>
            
            <div className="relative mb-6 md:mb-10">
                <div className={`text-9xl md:text-[12rem] transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) relative z-20
                    ${phase >= 2 ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-50 blur-xl'}
                    ${phase === 3 ? 'animate-pulse-fast' : ''}`}
                >
                    <span style={textGradient} className="block leading-none">∞</span>
                </div>

                <div className={`absolute inset-0 flex items-center justify-center pointer-events-none z-10`}>
                     <div className={`w-[140%] h-[140%] border border-[#FF8C42]/20 rounded-full animate-[spin_8s_linear_infinite] transition-all duration-700 ${phase >= 3 ? 'opacity-100 scale-150' : 'opacity-0 scale-50'}`} style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}/>
                     <div className={`w-[160%] h-[160%] border border-[#F04393]/10 rounded-full animate-[spin_10s_linear_infinite_reverse] transition-all duration-700 delay-100 ${phase >= 3 ? 'opacity-100 scale-125' : 'opacity-0 scale-50'}`} style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}/>
                </div>
            </div>

            <div className="relative overflow-hidden p-2">
                <h1 className={`text-5xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text transition-all duration-700 transform
                    ${phase >= 4 ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`}
                    style={textGradient}
                >
                    PRODUCTIVE
                </h1>
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-200%] 
                    ${phase >= 4 ? 'animate-shine' : ''}`} 
                />
            </div>

             <div className={`mt-8 flex items-center gap-6 transition-all duration-700 delay-200
                ${phase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="h-[1px] w-8 md:w-16 bg-gradient-to-r from-transparent to-[#FF8C42]" />
                <span className="text-[10px] md:text-xs font-mono text-white/30 tracking-[0.8em] uppercase">
                  Neural Engine Active
                </span>
                <div className="h-[1px] w-8 md:w-16 bg-gradient-to-l from-transparent to-[#8D46E7]" />
             </div>

        </div>

        <style>{`
            @keyframes gasSwirl1 { 0% { transform: translate(-50%, -50%) rotate(0deg) scale(1); } 50% { transform: translate(-45%, -55%) rotate(180deg) scale(1.1); } 100% { transform: translate(-50%, -50%) rotate(360deg) scale(1); } }
            @keyframes gasSwirl2 { 0% { transform: translate(-50%, -50%) rotate(0deg) scale(1.1); } 50% { transform: translate(-55%, -45%) rotate(-180deg) scale(1); } 100% { transform: translate(-50%, -50%) rotate(-360deg) scale(1.1); } }
            @keyframes gasSwirl3 { 0% { transform: translate(-50%, -50%) rotate(0deg) scale(0.9); } 50% { transform: translate(-50%, -50%) rotate(90deg) scale(1.2); } 100% { transform: translate(-50%, -50%) rotate(0deg) scale(0.9); } }
            @keyframes pulseFast { 0%, 100% { transform: scale(1); filter: brightness(1); } 50% { transform: scale(1.1); filter: brightness(1.5); text-shadow: 0 0 50px rgba(255, 140, 66, 0.8); } }
            @keyframes shine { 0% { transform: translateX(-200%) skewX(-12deg); } 100% { transform: translateX(200%) skewX(-12deg); } }
            .animate-gas-swirl-1 { animation: gasSwirl1 15s infinite linear; }
            .animate-gas-swirl-2 { animation: gasSwirl2 20s infinite linear; }
            .animate-gas-swirl-3 { animation: gasSwirl3 18s infinite linear; }
            .animate-pulse-fast { animation: pulseFast 0.6s ease-out; }
            .animate-shine { animation: shine 2s ease-in-out infinite; animation-delay: 0.5s; }
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
                    <div className="w-full h-full rounded-full bg-black/90 flex items-center justify-center">
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