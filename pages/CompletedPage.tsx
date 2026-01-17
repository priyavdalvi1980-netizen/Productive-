import React from 'react';
import { useStore } from '../store/useStore.ts';
import { Archive, Trash2, RotateCcw, Calendar, CheckCircle2 } from 'lucide-react';

const CompletedPage: React.FC = () => {
  const { tasks, toggleTaskCompletion, deleteTask } = useStore();
  const completedTasks = tasks.filter(t => t.status === 'done').sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="w-full max-w-[1400px] mx-auto pb-10 pt-2 md:pt-0 animate-fade-in">
       <div className="p-6 md:p-12 border-b border-white/5 mb-8">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-gradient leading-none uppercase break-words max-w-full">Archives</h2>
            <p className="text-white/30 text-[10px] md:text-base font-black uppercase tracking-[0.5em] mt-2">Completed Objectives</p>
       </div>

       <div className="px-4 md:px-10 space-y-4">
          {completedTasks.length === 0 ? (
             <div className="py-24 flex flex-col items-center justify-center gap-6 opacity-20">
                <Archive className="w-16 h-16 md:w-20 md:h-20" />
                <span className="text-base font-black uppercase tracking-[0.6em] text-center">No Archives Found</span>
             </div>
          ) : (
             completedTasks.map(task => (
               <div key={task.id} className="glass-card-solid p-4 md:p-5 rounded-2xl md:rounded-[1.5rem] flex items-center justify-between group border-white/5 hover:border-white/20 transition-all duration-500 w-full shadow-lg">
                  <div className="flex items-center gap-4 md:gap-8 flex-1 min-w-0">
                     <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-emerald-500/20 flex items-center justify-center bg-emerald-500/10 shrink-0">
                       <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                     </div>
                     <div className="space-y-0.5 min-w-0 flex-1">
                        <h4 className="font-bold text-base md:text-lg tracking-tight leading-tight text-white/50 line-through decoration-white/20 truncate pr-4">{task.title}</h4>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-white/20"><Calendar className="w-3.5 h-3.5 opacity-40" /> {new Date(task.createdAt).toLocaleDateString()}</div>
                        </div>
                     </div>
                  </div>
                  <div className="flex items-center gap-2 md:gap-4 shrink-0">
                    <button onClick={() => toggleTaskCompletion(task.id)} className="p-2 md:px-4 md:py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all flex items-center gap-2 group/restore">
                        <RotateCcw className="w-4 h-4 group-hover/restore:-rotate-180 transition-transform duration-500" />
                        <span className="hidden md:inline text-[10px] font-black uppercase tracking-widest">Restore</span>
                    </button>
                    <button onClick={() => deleteTask(task.id)} className="p-2 md:px-4 md:py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500/40 hover:text-red-500 transition-all flex items-center gap-2">
                        <Trash2 className="w-4 h-4" />
                        <span className="hidden md:inline text-[10px] font-black uppercase tracking-widest">Purge</span>
                    </button>
                  </div>
               </div>
             ))
          )}
       </div>
    </div>
  );
};

export default CompletedPage;