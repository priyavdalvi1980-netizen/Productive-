import React, { useState, useMemo } from 'react';
import { useStore } from '../store/useStore.ts';
import { 
  Plus, Check, Clock, Calendar, 
  Trash2, Zap, CalendarClock
} from 'lucide-react';
import { TaskPriority } from '../types.ts';

const TasksPage: React.FC = () => {
  const store = useStore();
  const { 
    tasks, toggleTaskCompletion, addTask, deleteTask
  } = store;
  
  const [taskInput, setTaskInput] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<TaskPriority>('medium');
  const [selectedDueDate, setSelectedDueDate] = useState('');
  const [filter, setFilter] = useState('All');

  const handleAddTask = () => {
    if (!taskInput.trim()) return;
    const newTask: any = { title: taskInput, priority: selectedPriority, status: 'todo' };
    if (selectedDueDate) {
        // Create date at noon to avoid timezone shift issues with simple YYYY-MM-DD strings
        newTask.dueDate = new Date(selectedDueDate + 'T12:00:00').getTime();
    }
    addTask(newTask);
    setTaskInput('');
    setSelectedDueDate('');
  };

  const activeTasks = useMemo(() => 
    tasks.filter(t => t.status !== 'done' && (filter === 'All' || t.priority === filter.toLowerCase())),
    [tasks, filter]
  );

  const completionRate = useMemo(() => 
    tasks.length > 0 ? Math.round((tasks.filter(t => t.status === 'done').length / tasks.length) * 100) : 0,
    [tasks]
  );

  return (
    <div className="w-full max-w-[1400px] mx-auto pb-10 pt-2 md:pt-0">
      
      <div className="glass-panel rounded-[2rem] md:rounded-[3rem] border-white/10 shadow-2xl relative overflow-hidden flex flex-col mb-12">
        <div className="p-6 md:p-12 space-y-10 border-b border-white/5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-2 min-w-0">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-gradient leading-none uppercase break-words max-w-full">Workspace</h2>
              <p className="text-white/30 text-[10px] md:text-base font-black uppercase tracking-[0.5em]">Executive Deployment</p>
            </div>
            
            <div className="flex flex-col gap-2.5 w-full md:w-auto md:min-w-[260px] max-w-full">
                <div className="flex justify-between items-center px-1">
                  <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.4em]">Efficiency</span>
                  <span className="text-white font-black text-xs">{completionRate}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                   <div className="h-full bg-gradient-primary transition-all duration-1000 shadow-[0_0_20px_rgba(255,255,255,0.2)]" style={{ width: `${completionRate}%` }} />
                </div>
                
                {/* HIGH YIELD / EFFICIENCY SECTION */}
                <div 
                  className="glass-panel bg-white/5 p-3 md:p-5 rounded-[1.5rem] md:rounded-[2rem] border border-white/10 flex items-center gap-4 shadow-2xl mt-1 overflow-hidden transition-all group relative"
                >
                   <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 pointer-events-none" />
                   <div className="flex-1 text-right min-w-0">
                      <div className="text-base md:text-3xl font-black tracking-tighter text-gradient font-mono-nums leading-none tabular-nums truncate group-hover:opacity-80 transition-opacity">High Yield</div>
                   </div>
                   <div className="w-8 h-8 md:w-14 md:h-14 rounded-xl md:rounded-2xl border border-white/10 flex items-center justify-center shadow-2xl bg-black/40 flex-shrink-0 group-hover:border-white/30 transition-colors">
                      <Zap className="w-4 h-4 md:w-7 md:h-7 text-white/80 group-hover:text-white group-hover:scale-110 transition-all" />
                   </div>
                </div>
            </div>
          </div>
          <div className="space-y-8">
            <div className="relative flex items-center gap-4">
               <input value={taskInput} onChange={e => setTaskInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddTask()} placeholder="Identify objective..." className="flex-1 h-14 md:h-20 bg-black/60 px-6 md:px-10 rounded-xl md:rounded-[1.5rem] focus:outline-none transition-all font-bold text-lg md:text-2xl border border-white/5 focus:border-white/20 placeholder-white/5 shadow-inner" />
               <button onClick={handleAddTask} className="w-14 h-14 md:w-20 md:h-20 bg-gradient-primary rounded-xl md:rounded-[1.5rem] flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all shrink-0"><Plus className="w-8 h-8 text-white" /></button>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-center gap-5 flex-wrap">
                <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">Rank:</span>
                <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                  {['Low', 'Med', 'High'].map(p => (
                    <button key={p} onClick={() => setSelectedPriority(p.toLowerCase().replace('med', 'medium') as TaskPriority)} className={`px-5 md:px-7 py-2.5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase transition-all whitespace-nowrap ${selectedPriority === p.toLowerCase().replace('med', 'medium') ? 'bg-gradient-primary text-white scale-105 shadow-xl' : 'bg-white/5 text-white/40 border border-white/10 hover:bg-white/10'}`}>{p}</button>
                  ))}
                </div>
                
                <div className="w-px h-8 bg-white/10 hidden md:block" />
                
                <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                     <CalendarClock className="w-4 h-4 text-white/40" />
                     <input
                        type="date"
                        value={selectedDueDate}
                        onChange={(e) => setSelectedDueDate(e.target.value)}
                        className="bg-transparent text-[10px] font-black text-white uppercase tracking-wider focus:outline-none [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-40 hover:[&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                     />
                </div>
              </div>
              <div className="flex items-center p-1.5 bg-black/50 rounded-full border border-white/5 shadow-inner self-start lg:self-auto overflow-x-auto no-scrollbar">
                {['All', 'Low', 'Medium', 'High'].map(f => (
                  <button key={f} onClick={() => setFilter(f)} className={`px-5 md:px-7 py-2 rounded-full text-[10px] font-black tracking-[0.2em] uppercase transition-all whitespace-nowrap ${filter === f ? 'bg-white/15 text-white shadow-xl' : 'text-white/20 hover:text-white/50'}`}>{f}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 md:p-10 space-y-4 md:space-y-5">
           {activeTasks.length === 0 ? (
             <div className="py-24 flex flex-col items-center justify-center gap-6 opacity-10">
                <Clock className="w-16 h-16 md:w-20 md:h-20" />
                <span className="text-base font-black uppercase tracking-[0.6em] text-center">Neural void detected</span>
             </div>
           ) : (
             activeTasks.map(task => (
               <div key={task.id} className="glass-card p-4 md:p-5 rounded-2xl md:rounded-[1.5rem] flex items-center justify-between group border-white/5 hover:border-white/20 transition-all duration-500 w-full shadow-lg">
                  <div className="flex items-center gap-4 md:gap-8 flex-1 min-w-0">
                     <button onClick={() => toggleTaskCompletion(task.id)} className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-white/10 flex items-center justify-center hover:border-white transition-all shrink-0 bg-black/40 group/check">
                       <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-transparent group-hover/check:text-white transition-all" />
                     </button>
                     <div className="space-y-0.5 min-w-0 flex-1">
                        <h4 className="font-bold text-base md:text-lg tracking-tight leading-tight text-white group-hover:text-gradient transition-all truncate pr-4">{task.title}</h4>
                        <div className="flex items-center gap-4 flex-wrap">
                          <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-white/30"><Calendar className="w-3.5 h-3.5 opacity-40" /> {new Date(task.createdAt).toLocaleDateString()}</div>
                          
                          {task.dueDate && (
                              <div className={`flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest ${new Date(task.dueDate) < new Date() ? 'text-red-400' : 'text-emerald-400'}`}>
                                <CalendarClock className="w-3.5 h-3.5" />
                                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                              </div>
                          )}

                          <div className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${task.priority === 'high' ? 'bg-red-500' : task.priority === 'medium' ? 'bg-orange-500' : 'bg-blue-400'}`} />
                            <span className={`text-[9px] font-black uppercase tracking-widest ${task.priority === 'high' ? 'text-red-500' : task.priority === 'medium' ? 'text-orange-500' : 'text-blue-400'}`}>{task.priority}</span>
                          </div>
                        </div>
                     </div>
                  </div>
                  <div className="flex items-center gap-4 md:gap-6 shrink-0">
                    <button onClick={() => deleteTask(task.id)} className="p-2 opacity-0 group-hover:opacity-100 text-red-500/40 hover:text-red-500 hover:scale-110 transition-all"><Trash2 className="w-5 h-5 md:w-6 md:h-6" /></button>
                    <div className={`w-1 h-10 md:h-12 rounded-full ${task.priority === 'high' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]' : task.priority === 'medium' ? 'bg-orange-500 shadow-[0_0_10px_rgba(245,158,11,0.4)]' : 'bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.4)]'}`} />
                  </div>
               </div>
             ))
           )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-primary opacity-20" />
      </div>
    </div>
  );
};

export default TasksPage;