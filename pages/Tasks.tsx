import React, { useState } from 'react';
import { useStore } from '../store/useStore.ts';
import { Plus, Trash2, CheckCircle, Circle, MoreVertical, X, Calendar, CalendarClock } from 'lucide-react';
import { TaskStatus, TaskPriority } from '../types.ts';

const Tasks: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask, moveTask } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'medium' as TaskPriority, dueDate: '' });

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;
    const taskToAdd: any = { ...newTask, status: 'todo' };
    if (newTask.dueDate) {
        taskToAdd.dueDate = new Date(newTask.dueDate + 'T12:00:00').getTime();
    }
    delete taskToAdd.dueDateString; // cleanup if needed, mostly logic separation

    addTask(taskToAdd);
    setNewTask({ title: '', description: '', priority: 'medium', dueDate: '' });
    setIsModalOpen(false);
  };

  const columns: { id: TaskStatus; label: string; color: string }[] = [
    { id: 'todo', label: 'To Do', color: 'bg-white/5' },
    { id: 'in-progress', label: 'In Progress', color: 'bg-orange-500/10' },
    { id: 'done', label: 'Completed', color: 'bg-green-500/10' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-4xl font-black">Workspace</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-white text-black px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-white/90 transition-all shadow-xl shadow-white/10"
        >
          <Plus className="w-5 h-5" /> New Task
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {columns.map(column => (
          <div key={column.id} className="flex flex-col gap-6">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${
                  column.id === 'todo' ? 'bg-white' : 
                  column.id === 'in-progress' ? 'bg-orange-500' : 'bg-green-500'
                }`} />
                <h3 className="font-bold text-lg">{column.label}</h3>
                <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-white/40">
                  {tasks.filter(t => t.status === column.id).length}
                </span>
              </div>
            </div>

            <div className={`min-h-[500px] rounded-3xl p-4 transition-colors ${column.color}`}>
              <div className="flex flex-col gap-4">
                {tasks.filter(t => t.status === column.id).map(task => (
                  <div key={task.id} className="glass-panel p-5 rounded-2xl group hover:border-white/20 transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${
                        task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                        task.priority === 'medium' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {task.priority}
                      </span>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => deleteTask(task.id)} className="p-1 hover:text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <h4 className="font-bold text-white/90 mb-2 leading-tight">{task.title}</h4>
                    <p className="text-sm text-white/40 mb-6 line-clamp-2">{task.description}</p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-1 text-[10px] text-white/30">
                        <Calendar className="w-3 h-3" />
                        {new Date(task.createdAt).toLocaleDateString()}
                      </div>
                      {task.dueDate && (
                        <div className={`flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider ${new Date(task.dueDate) < new Date() ? 'text-red-400' : 'text-emerald-400'}`}>
                           <CalendarClock className="w-3 h-3" />
                           {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2 mt-4 justify-end">
                        {column.id !== 'todo' && (
                          <button onClick={() => moveTask(task.id, 'todo')} className="text-xs text-white/20 hover:text-white">Todo</button>
                        )}
                        {column.id !== 'in-progress' && (
                          <button onClick={() => moveTask(task.id, 'in-progress')} className="text-xs text-white/20 hover:text-white">Start</button>
                        )}
                        {column.id !== 'done' && (
                          <button onClick={() => moveTask(task.id, 'done')} className="text-xs text-white/20 hover:text-white">Finish</button>
                        )}
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Task Creation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-lg rounded-3xl p-8 shadow-2xl border-white/20 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold">New Task</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase text-white/40 mb-2">Title</label>
                <input 
                  type="text" 
                  value={newTask.title}
                  onChange={e => setNewTask({...newTask, title: e.target.value})}
                  placeholder="What needs to be done?"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500/50 transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-white/40 mb-2">Due Date</label>
                    <input 
                      type="date" 
                      value={newTask.dueDate}
                      onChange={e => setNewTask({...newTask, dueDate: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500/50 transition-colors [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-40 hover:[&::-webkit-calendar-picker-indicator]:opacity-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-white/40 mb-2">Priority</label>
                    <div className="flex gap-2">
                    {(['low', 'medium', 'high'] as TaskPriority[]).map(p => (
                        <button
                        key={p}
                        onClick={() => setNewTask({...newTask, priority: p})}
                        className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase transition-all border ${
                            newTask.priority === p 
                            ? 'bg-white text-black border-white' 
                            : 'bg-white/5 text-white/40 border-white/10'
                        }`}
                        >
                        {p}
                        </button>
                    ))}
                    </div>
                  </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-white/40 mb-2">Description</label>
                <textarea 
                  value={newTask.description}
                  onChange={e => setNewTask({...newTask, description: e.target.value})}
                  rows={3}
                  placeholder="Any details..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500/50 transition-colors"
                />
              </div>
              <button 
                onClick={handleAddTask}
                className="w-full py-4 bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl font-bold text-white shadow-xl shadow-pink-500/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;