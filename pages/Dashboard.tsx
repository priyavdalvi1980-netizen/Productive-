import React, { useState, useEffect, useMemo } from 'react';
import { useStore } from '../store/useStore.ts';
import { getProductivityInsight } from '../services/geminiService.ts';
import { Link } from 'react-router-dom';
import { 
  Target, Zap, Clock, TrendingUp, Award, Flame, 
  ShieldCheck, HeartPulse, Sparkles, Activity, Timer,
  BarChart4, ArrowUpRight, PieChart, Layers
} from 'lucide-react';

const PromoterCard = ({ title, value, sub, icon: Icon, colorClass, gradient }: any) => (
  <div className={`glass-panel p-4 md:p-6 rounded-[2rem] relative overflow-hidden group border-white/5 transition-all hover:scale-[1.01] hover:border-white/10`}>
    <div className={`absolute top-0 right-0 w-24 h-24 ${gradient} opacity-5 blur-[40px] -mr-12 -mt-12 transition-all group-hover:opacity-20`} />
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClass} shadow-lg mb-4 transition-transform group-hover:scale-105`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
    <div className="space-y-0.5 relative z-10">
      <h3 className="text-white/30 text-[8px] font-black uppercase tracking-[0.3em]">{title}</h3>
      <div className="text-2xl md:text-3xl font-black tracking-tighter text-white/90 group-hover:text-gradient transition-all">{value}</div>
      <p className="text-[8px] text-white/20 font-black uppercase tracking-[0.15em]">{sub}</p>
    </div>
  </div>
);

const FocusDistribution = ({ tasks }: any) => {
  const distribution = useMemo(() => {
    const total = tasks.length || 1;
    return [
      { label: 'System', count: tasks.filter((t: any) => t.priority === 'high').length, color: '#F43F5E' },
      { label: 'Neural', count: tasks.filter((t: any) => t.priority === 'medium').length, color: '#F97316' },
      { label: 'Maintenance', count: tasks.filter((t: any) => t.priority === 'low').length, color: '#3B82F6' },
    ].map(d => ({ ...d, percent: (d.count / total) * 100 }));
  }, [tasks]);

  return (
    <div className="glass-panel p-8 rounded-[2.5rem] border-white/5 relative overflow-hidden h-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
          <PieChart className="w-5 h-5 text-pink-400" />
        </div>
        <div>
          <h3 className="text-sm font-black uppercase tracking-widest text-white">Load Distribution</h3>
          <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">Priority Allocation</p>
        </div>
      </div>
      
      <div className="flex flex-col gap-6">
        <div className="flex gap-2 h-4 rounded-full overflow-hidden bg-white/5">
          {distribution.map((d, i) => (
            <div key={i} style={{ width: `${d.percent}%`, background: d.color }} className="h-full transition-all duration-1000" />
          ))}
        </div>
        <div className="space-y-3">
           {distribution.map((d, i) => (
             <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">{d.label}</span>
                </div>
                <span className="text-sm font-bold text-white/80">{Math.round(d.percent)}%</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

const NeuralEnergy = () => (
    <div className="glass-panel p-8 rounded-[2.5rem] border-white/5 relative overflow-hidden h-full">
        <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                <Layers className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-white">Cognitive Heatmap</h3>
                <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">Daily Synapse Firing</p>
            </div>
        </div>
        <div className="grid grid-cols-7 gap-1 h-32">
            {Array.from({ length: 28 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`rounded-md transition-all duration-500 hover:scale-110 ${Math.random() > 0.6 ? 'bg-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.4)]' : Math.random() > 0.3 ? 'bg-emerald-500/30' : 'bg-white/5'}`}
                />
            ))}
        </div>
        <div className="flex justify-between items-center mt-4">
             <span className="text-[8px] font-black uppercase tracking-widest text-white/20">08:00</span>
             <span className="text-[8px] font-black uppercase tracking-widest text-white/20">16:00</span>
             <span className="text-[8px] font-black uppercase tracking-widest text-white/20">23:00</span>
        </div>
    </div>
);

const PerformanceMatrix = ({ tasks, focusSessions, performanceHistory }: any) => {
  const avgFocusMs = useMemo(() => 
    focusSessions.length > 0 
      ? focusSessions.reduce((acc: number, curr: any) => acc + curr.durationMs, 0) / focusSessions.length 
      : 0
  , [focusSessions]);

  const completionRate = useMemo(() => 
    tasks.length > 0 ? (tasks.filter((t: any) => t.status === 'done').length / tasks.length) * 100 : 0
  , [tasks]);

  const formatMins = (ms: number) => Math.round(ms / 60000);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-8 mt-8 md:mt-12">
      {/* Task Completion Velocity */}
      <div className="lg:col-span-8 glass-panel p-8 rounded-[2.5rem] border-white/5 space-y-8 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
              <Activity className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-white">Neural Architecture</h3>
              <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">Weekly Task Deployment Velocity</p>
            </div>
          </div>
          <div className="text-2xl font-black text-gradient">{Math.round(completionRate)}%</div>
        </div>
        
        <div className="space-y-6">
          <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2">
            <span>Cycle Start</span>
            <span>Current</span>
          </div>
          <div className="h-32 flex items-end gap-2.5">
            {performanceHistory.map((item: any, i: number) => (
              <div 
                key={i} 
                className="flex-1 bg-white/5 rounded-t-xl relative group transition-all hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]" 
                style={{ height: `${Math.max(15, (item.completedCount / 10) * 100)}%` }}
              >
                <div className="absolute inset-x-0 bottom-0 bg-gradient-primary rounded-t-xl opacity-40 group-hover:opacity-100 transition-opacity" style={{ height: '40%' }} />
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-black text-white">{item.completedCount}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-between px-1">
             {performanceHistory.map((item: any, i: number) => (
               <span key={i} className="text-[9px] font-black text-white/20 uppercase tracking-widest">{item.date}</span>
             ))}
          </div>
        </div>
      </div>

      {/* Focus session duration analysis */}
      <div className="lg:col-span-4 glass-panel p-8 rounded-[2.5rem] border-white/5 space-y-8 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
              <Timer className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-white">Focus Persistence</h3>
              <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">Attention Analytics</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
            <div className="text-5xl font-black text-gradient leading-none">{formatMins(avgFocusMs)}m</div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[70%] bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5 transition-all hover:border-white/20">
            <span className="text-[8px] font-black text-white/20 uppercase tracking-widest block mb-1">Depth</span>
            <div className="flex items-end gap-1.5">
               <span className="text-xl font-black text-white/80">0.82</span>
               <ArrowUpRight className="w-3 h-3 text-emerald-400 mb-1" />
            </div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5 transition-all hover:border-white/20">
            <span className="text-[8px] font-black text-white/20 uppercase tracking-widest block mb-1">Streak</span>
            <span className="text-xl font-black text-white/80">142m</span>
          </div>
        </div>
      </div>
      
      {/* New Graphs Row */}
      <div className="lg:col-span-4 h-full">
         <FocusDistribution tasks={tasks} />
      </div>
      <div className="lg:col-span-8 h-full">
         <NeuralEnergy />
      </div>

    </div>
  );
};

const Dashboard: React.FC = () => {
  const store = useStore();
  const { tasks, focusSessions, performanceHistory, stopwatchMs, widgets } = store;
  const [insight, setInsight] = useState<string>("Initializing neural engine...");
  
  useEffect(() => {
    const fetchInsight = async () => {
      try {
        const res = await getProductivityInsight(tasks);
        setInsight(res || "Focus on your high-priority targets to maximize output synchronization today.");
      } catch (e) {
        setInsight("System analysis complete: Prioritize deployment tasks for peak velocity.");
      }
    };
    fetchInsight();
  }, [tasks]);
  
  const completed = tasks.filter(t => t.status === 'done').length;
  const total = tasks.length;
  const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  const formatTime = (ms: number) => {
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    return `${h}h ${m}m`;
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 md:space-y-10 animate-fade-in pb-20 w-full px-4 pt-4 md:pt-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-5xl font-black tracking-tighter leading-none text-gradient uppercase">Operational Summary</h1>
          <div className="flex items-center gap-3 text-white/30 pt-2">
            <div className="flex items-center gap-1.5 text-[8px] md:text-[9px] font-black uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>System Status: Optimal</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <div className="flex items-center gap-1.5 text-[8px] md:text-[9px] font-black uppercase tracking-widest">
              <HeartPulse className="w-3.5 h-3.5" />
              <span>Sync Rate: 100%</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="hidden md:flex flex-col items-end">
             <span className="text-2xl font-black font-mono-nums leading-none text-white">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
             <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</span>
           </div>
        </div>
      </div>

      {/* AI Insight Banner */}
      <div className="glass-panel p-6 md:p-8 rounded-[2rem] border-white/10 shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="absolute top-0 right-0 p-8 opacity-20">
            <Sparkles className="w-24 h-24 text-white rotate-12" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row gap-6 md:items-start">
            <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-lg shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="space-y-2">
                <div className="flex items-center gap-3">
                    <h3 className="text-sm font-black uppercase tracking-widest text-white">Neural Insight</h3>
                    <span className="text-[8px] px-2 py-0.5 rounded-full bg-white/10 text-white/60 font-black uppercase tracking-wider">Daily Analysis</span>
                </div>
                <p className="text-lg md:text-2xl font-bold text-white/90 leading-tight max-w-4xl">
                    "{insight}"
                </p>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <PromoterCard 
            title="Active Tasks" 
            value={tasks.filter(t => t.status !== 'done').length} 
            sub="Pending Actions" 
            icon={Target} 
            colorClass="bg-blue-500"
            gradient="bg-blue-500"
        />
        <PromoterCard 
            title="Completion" 
            value={`${rate}%`} 
            sub="Efficiency Rate" 
            icon={Award} 
            colorClass="bg-emerald-500"
            gradient="bg-emerald-500"
        />
        <PromoterCard 
            title="Focus Time" 
            value={formatTime(store.focusSessions.reduce((acc, s) => acc + s.durationMs, 0) + stopwatchMs)} 
            sub="Total Immersion" 
            icon={Flame} 
            colorClass="bg-orange-500"
            gradient="bg-orange-500"
        />
        <PromoterCard 
            title="Current Streak" 
            value="4 Days" 
            sub="Consistency" 
            icon={Zap} 
            colorClass="bg-purple-500"
            gradient="bg-purple-500"
        />
      </div>

      <PerformanceMatrix 
        tasks={tasks} 
        focusSessions={focusSessions} 
        performanceHistory={performanceHistory} 
      />
    </div>
  );
};

export default Dashboard;