import React, { useState } from 'react';
import { useStore } from '../store/useStore.ts';
import { Palette, Check, Bell, Zap, SlidersHorizontal, ShieldCheck, Volume2, TrendingUp, HeartPulse, Coffee, Moon, Droplets, Monitor } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const store = useStore();
  const { theme, setTheme, brandColors, setBrandColors, widgets, setWidget } = store;

  const presets = [
    { name: 'Futuristic', colors: ['#00F2FF', '#7000FF', '#FF00D6'] },
    { name: 'Solar', colors: ['#FF8C42', '#F04393', '#8D46E7'] },
    { name: 'Emerald', colors: ['#10B981', '#3B82F6', '#6366F1'] },
    { name: 'Crimson', colors: ['#F43F5E', '#D946EF', '#8B5CF6'] },
    { name: 'Midnight', colors: ['#6366F1', '#8B5CF6', '#D946EF'] },
    { name: 'Aurora', colors: ['#34D399', '#22D3EE', '#818CF8'] },
    { name: 'Deep Space', colors: ['#1E293B', '#3B82F6', '#9333EA'] },
  ];

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") new Notification("Productive ♾️", { body: "System interface synchronized!" });
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-10 md:space-y-16 pb-44 animate-fade-in px-4 w-full pt-2 md:pt-0">
      <div className="space-y-2">
        <h1 className="text-4xl md:text-8xl font-black text-gradient tracking-tighter leading-none uppercase">Settings</h1>
        <p className="text-white/30 text-[10px] md:text-lg font-black tracking-[0.4em] uppercase">Architecture & Tuning</p>
      </div>

      <div className="glass-panel p-6 md:p-16 rounded-[2.5rem] md:rounded-[3rem] space-y-10 md:space-y-12 border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary" />
        <div className="flex items-center gap-5 text-white/50">
           <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl"><Palette className="w-6 h-6" /></div>
           <div className="space-y-0.5">
              <h3 className="text-xl md:text-4xl font-black tracking-tight uppercase text-gradient">Visuals</h3>
              <p className="text-[10px] md:text-sm font-black text-white/20 uppercase tracking-[0.3em]">Holographic Engine</p>
           </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
           {presets.map(p => {
             const isSelected = JSON.stringify(brandColors) === JSON.stringify(p.colors);
             return (
               <button key={p.name} onClick={() => setBrandColors(p.colors)} className={`glass-card p-2 md:p-3 rounded-2xl transition-all border-2 group ${isSelected ? 'border-white/50 bg-white/15 shadow-[0_0_50px_rgba(255,255,255,0.1)] scale-105' : 'border-white/5 hover:border-white/25 hover:scale-102'}`}>
                 <div className="h-20 md:h-36 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-2xl" style={{ background: `linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]}, ${p.colors[2]})` }}>
                     {isSelected && <Check className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-2xl" />}
                 </div>
                 <div className="pt-3 md:pt-4 text-[10px] md:text-sm font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors text-center">{p.name}</div>
               </button>
             );
           })}
        </div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="flex-1 glass-card p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border-white/10">
                <h4 className="font-black text-xs md:text-xl mb-4 md:mb-6 uppercase tracking-[0.3em] text-white/40">Atmosphere</h4>
                <div className="flex gap-3 md:gap-4">
                    {[
                        { id: 'obsidian', icon: Moon, label: 'Obsidian' },
                        { id: 'royal', icon: Droplets, label: 'Royal Blue' },
                        { id: 'auto', icon: Monitor, label: 'Sync' }
                    ].map(t => (
                        <button key={t.id} onClick={() => setTheme(t.id as any)} className={`flex-1 py-6 md:py-8 rounded-2xl flex flex-col items-center gap-3 md:gap-4 transition-all ${theme === t.id ? 'bg-white text-black shadow-[0_0_80px_rgba(255,255,255,0.15)] scale-105' : 'bg-white/5 text-white/20 hover:bg-white/10 hover:text-white'}`}>
                            <t.icon className="w-5 h-5 md:w-6 md:h-6" />
                            <span className="text-[8px] md:text-sm font-black uppercase tracking-widest">{t.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
      </div>

      <div className="glass-panel p-6 md:p-16 rounded-[2.5rem] md:rounded-[3rem] space-y-10 md:space-y-12 border-white/10 shadow-2xl relative">
         <div className="flex items-center gap-5 md:gap-6 text-white/50">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl"><SlidersHorizontal className="w-6 h-6 md:w-8 md:h-8" /></div>
            <div className="space-y-0.5">
               <h3 className="text-xl md:text-4xl font-black tracking-tight uppercase text-gradient">Modules</h3>
               <p className="text-[10px] md:text-sm font-black text-white/20 uppercase tracking-[0.3em]">Core Orchestrator</p>
            </div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
            {[
              { id: 'stats', label: 'Analytics', sub: 'Bio-performance mapping', icon: Zap },
              { id: 'trend', label: 'Flow Matrix', sub: 'Neural trajectory index', icon: TrendingUp },
              { id: 'priority', label: 'Urgency', sub: 'Dynamic hierarchy scale', icon: ShieldCheck },
              { id: 'focus', label: 'Assistant', sub: 'Synthesized focus aid', icon: HeartPulse },
              { id: 'zen', label: 'Void', sub: 'Zero-point interface', icon: Moon },
              { id: 'coffee', label: 'Restoration', sub: 'Molecular recovery cycles', icon: Coffee },
            ].map(w => (
              <div key={w.id} className="glass-card p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] flex items-center justify-between border-white/5 group hover:bg-white/[0.05] transition-all cursor-default">
                 <div className="flex items-center gap-4 md:gap-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5"><w.icon className="w-5 h-5 md:w-6 md:h-6 text-white/40" /></div>
                    <div className="space-y-0.5">
                       <h4 className="font-black text-lg md:text-2xl tracking-tight leading-none text-white/90">{w.label}</h4>
                       <p className="text-[8px] md:text-sm font-medium text-white/20 uppercase tracking-widest">{w.sub}</p>
                    </div>
                 </div>
                 <button onClick={() => setWidget(w.id as any, !widgets[w.id as keyof typeof widgets])} className={`w-14 md:w-16 h-7 md:h-8 rounded-full p-1 md:p-1.5 transition-all flex items-center shadow-inner ${widgets[w.id as keyof typeof widgets] ? 'bg-gradient-primary' : 'bg-white/10'}`}>
                    <div className={`w-5 h-5 rounded-full transition-all shadow-2xl ${widgets[w.id as keyof typeof widgets] ? 'translate-x-7 md:translate-x-8 bg-white' : 'translate-x-0 bg-white/20'}`} />
                 </button>
              </div>
            ))}
         </div>
      </div>

      <div className="glass-panel p-6 md:p-16 rounded-[2.5rem] md:rounded-[3rem] space-y-10 md:space-y-12 border-white/10 shadow-2xl relative">
        <div className="flex items-center gap-5 md:gap-6 text-white/50">
           <div className="w-12 h-12 md:w-14 md:h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl"><Bell className="w-6 h-6 md:w-8 md:h-8" /></div>
           <div className="space-y-0.5">
              <h3 className="text-xl md:text-4xl font-black tracking-tight uppercase text-gradient">Synapse</h3>
              <p className="text-[10px] md:text-sm font-black text-white/20 uppercase tracking-[0.3em]">External Feedback</p>
           </div>
        </div>
        <div className="space-y-4 md:space-y-6">
           <div className="glass-card p-6 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 border-white/10 shadow-2xl">
              <div className="space-y-1 md:space-y-2">
                 <h4 className="font-black text-lg md:text-3xl tracking-tight leading-none text-white/90">Global Signals</h4>
                 <p className="text-[10px] md:text-lg font-medium text-white/20 uppercase tracking-[0.2em]">Synchronize system alerts</p>
              </div>
              <button onClick={requestNotificationPermission} className="bg-white text-black px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-[10px] md:text-lg uppercase tracking-[0.25em] hover:scale-105 active:scale-95 transition-all shadow-2xl">Sync Device</button>
           </div>
           <div className="glass-card p-6 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 border-white/10 shadow-2xl">
              <div className="space-y-1 md:space-y-2">
                 <h4 className="font-black text-lg md:text-3xl tracking-tight leading-none text-white/90">Sonic Engine</h4>
                 <p className="text-[10px] md:text-lg font-medium text-white/20 uppercase tracking-[0.2em]">Atmospheric sound intensity</p>
              </div>
              <div className="flex items-center gap-6">
                 <Volume2 className="w-5 h-5 md:w-6 md:h-6 text-white/30" />
                 <div className="w-40 md:w-64 h-2 bg-white/10 rounded-full relative shadow-inner">
                    <div className="absolute left-0 top-0 bottom-0 w-3/4 bg-gradient-primary rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)]" />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;