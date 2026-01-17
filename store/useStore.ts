import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, TaskStatus, TaskPriority } from '../types.ts';

interface Alarm {
  id: string;
  time: string;
  active: boolean;
  lastTriggeredDate?: string; 
}

interface FocusSession {
  id: string;
  durationMs: number;
  timestamp: number;
}

interface PerformanceData {
  date: string;
  completedCount: number;
}

interface ProductivityState {
  tasks: Task[];
  focusSessions: FocusSession[];
  performanceHistory: PerformanceData[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'description'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  moveTask: (id: string, status: TaskStatus) => void;
  
  // Stopwatch State
  stopwatchMs: number;
  isStopwatchRunning: boolean;
  setStopwatchMs: (ms: number) => void;
  setIsStopwatchRunning: (running: boolean) => void;
  completeFocusSession: () => void;
  
  // Timer State (Pomodoro)
  timerSeconds: number;
  isTimerRunning: boolean;
  setTimerSeconds: (s: number) => void;
  setIsTimerRunning: (running: boolean) => void;
  
  // Alarms
  alarms: Alarm[];
  addAlarm: (time: string) => void;
  deleteAlarm: (id: string) => void;
  markAlarmTriggered: (id: string) => void;

  // Settings
  theme: 'obsidian' | 'royal' | 'auto';
  brandColors: string[];
  widgets: {
    stats: boolean;
    trend: boolean;
    priority: boolean;
    focus: boolean;
    zen: boolean;
    coffee: boolean;
  };
  setTheme: (theme: 'obsidian' | 'royal' | 'auto') => void;
  setBrandColors: (colors: string[]) => void;
  setWidget: (widget: keyof ProductivityState['widgets'], value: boolean) => void;

  // UI State
  editingTaskId: string | null;
  setEditingTaskId: (id: string | null) => void;

  // User Auth
  userName: string | null;
  userEmail: string | null;
  isAuthenticated: boolean;
  login: (name: string, email?: string) => void;
  logout: () => void;
}

export const useStore = create<ProductivityState>()(
  persist(
    (set, get) => ({
      tasks: [
        { id: '1', title: 'Architect System Core', description: '', status: 'done', priority: 'high', createdAt: Date.now() - 86400000 * 5 },
        { id: '2', title: 'Optimize Neural Pathing', description: '', status: 'todo', priority: 'medium', createdAt: Date.now() - 86400000 * 2, dueDate: Date.now() + 86400000 * 2 },
        { id: '3', title: 'Deployment Sync', description: '', status: 'done', priority: 'low', createdAt: Date.now() - 86400000 * 1 },
        { id: '4', title: 'UI Refinement', description: '', status: 'done', priority: 'high', createdAt: Date.now() - 86400000 * 4 },
        { id: '5', title: 'Security Protocol Audit', description: '', status: 'in-progress', priority: 'high', createdAt: Date.now() },
        { id: '6', title: 'Database Optimization', description: '', status: 'done', priority: 'medium', createdAt: Date.now() - 86400000 * 3 },
      ],
      focusSessions: [
        { id: 's1', durationMs: 2700000, timestamp: Date.now() - 86400000 * 3 },
        { id: 's2', durationMs: 1800000, timestamp: Date.now() - 86400000 * 2 },
        { id: 's3', durationMs: 4500000, timestamp: Date.now() - 86400000 * 1 },
        { id: 's4', durationMs: 3600000, timestamp: Date.now() - 86400000 * 4 },
      ],
      performanceHistory: [
        { date: 'Mon', completedCount: 3 },
        { date: 'Tue', completedCount: 5 },
        { date: 'Wed', completedCount: 2 },
        { date: 'Thu', completedCount: 8 },
        { date: 'Fri', completedCount: 4 },
        { date: 'Sat', completedCount: 6 },
        { date: 'Sun', completedCount: 1 },
      ],
      addTask: (task) => set((state) => ({
        tasks: [...state.tasks, { ...task, description: task.description || '', id: Math.random().toString(36).substr(2, 9), createdAt: Date.now() }]
      })),
      updateTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t))
      })),
      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id)
      })),
      toggleTaskCompletion: (id) => set((state) => {
        const task = state.tasks.find(t => t.id === id);
        const newStatus = task?.status === 'done' ? 'todo' : 'done';
        
        // If finishing a task, increment today's history
        const newHistory = [...state.performanceHistory];
        if (newStatus === 'done') {
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const today = days[new Date().getDay()];
            const idx = newHistory.findIndex(h => h.date === today);
            if (idx !== -1) {
                newHistory[idx] = { ...newHistory[idx], completedCount: newHistory[idx].completedCount + 1 };
            }
        }

        return {
            tasks: state.tasks.map((t) => (t.id === id ? { ...t, status: newStatus } : t)),
            performanceHistory: newHistory
        };
      }),
      moveTask: (id, status) => set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? { ...t, status } : t))
      })),
      
      stopwatchMs: 0,
      isStopwatchRunning: false,
      setStopwatchMs: (ms) => set({ stopwatchMs: ms }),
      setIsStopwatchRunning: (running) => set({ isStopwatchRunning: running }),
      completeFocusSession: () => {
        const { stopwatchMs } = get();
        if (stopwatchMs > 1000) { 
          set((state) => ({
            focusSessions: [...state.focusSessions, { id: Math.random().toString(36), durationMs: stopwatchMs, timestamp: Date.now() }],
            stopwatchMs: 0,
            isStopwatchRunning: false
          }));
        }
      },

      timerSeconds: 1500,
      isTimerRunning: false,
      setTimerSeconds: (timerSeconds) => set({ timerSeconds }),
      setIsTimerRunning: (isTimerRunning) => set({ isTimerRunning }),

      alarms: [],
      addAlarm: (time) => set((state) => ({ 
        alarms: [...state.alarms, { id: Math.random().toString(36), time, active: true }]
      })),
      deleteAlarm: (id) => set((state) => ({
        alarms: state.alarms.filter(a => a.id !== id)
      })),
      markAlarmTriggered: (id) => set((state) => {
        const now = new Date();
        const dateStr = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}`;
        return {
          alarms: state.alarms.map(a => a.id === id ? { ...a, lastTriggeredDate: dateStr } : a)
        };
      }),

      theme: 'obsidian',
      brandColors: ['#FF8C42', '#F04393', '#8D46E7'], // Solar Preset Default
      widgets: {
        stats: true,
        trend: true,
        priority: true,
        focus: true,
        zen: true,
        coffee: false
      },
      setTheme: (theme) => set({ theme }),
      setBrandColors: (brandColors) => set({ brandColors }),
      setWidget: (widget, value) => set((state) => ({
        widgets: { ...state.widgets, [widget]: value }
      })),

      editingTaskId: null,
      setEditingTaskId: (id) => set({ editingTaskId: id }),

      userName: null,
      userEmail: null,
      isAuthenticated: false,
      login: (name, email) => set({ userName: name, userEmail: email, isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false }),
    }),
    { name: 'productive-v7-storage' }
  )
);