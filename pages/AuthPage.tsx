import React, { useState } from 'react';
import { useStore } from '../store/useStore.ts';
import { ArrowRight, Sparkles, UserCircle2, Fingerprint } from 'lucide-react';

const AuthPage: React.FC = () => {
  const { login } = useStore();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    login(name);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/20 rounded-full blur-[100px] animate-pulse" />
         <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-orange-600/20 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <div className="glass-panel w-full max-w-md p-8 md:p-12 rounded-[2.5rem] relative z-10 animate-fade-in shadow-2xl border-white/10">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-primary rounded-3xl mx-auto flex items-center justify-center shadow-2xl mb-6 rotate-3 hover:rotate-6 transition-transform duration-500">
             <span className="text-5xl text-white drop-shadow-md">♾️</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">Productive</h1>
          <p className="text-white/40 text-xs font-bold tracking-[0.3em] uppercase">Neural Workspace</p>
        </div>

        <div className="flex gap-2 p-1 bg-white/5 rounded-xl mb-8 border border-white/5">
           <button 
             onClick={() => setIsSignUp(false)}
             className={`flex-1 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${!isSignUp ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
           >
             Sign In
           </button>
           <button 
             onClick={() => setIsSignUp(true)}
             className={`flex-1 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${isSignUp ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
           >
             Sign Up
           </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Identity Name</label>
              <div className="relative">
                 <UserCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                 <input 
                   type="text" 
                   value={name}
                   onChange={e => setName(e.target.value)}
                   placeholder="Enter your name"
                   className="w-full h-14 bg-black/40 border border-white/10 rounded-2xl pl-12 pr-4 text-white font-bold focus:outline-none focus:border-white/30 transition-all placeholder:text-white/10"
                 />
              </div>
           </div>
           
           {isSignUp && (
             <div className="space-y-2 animate-fade-in">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Access Key (Optional)</label>
                <div className="relative">
                   <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                   <input 
                     type="email" 
                     value={email}
                     onChange={e => setEmail(e.target.value)}
                     placeholder="email@example.com"
                     className="w-full h-14 bg-black/40 border border-white/10 rounded-2xl pl-12 pr-4 text-white font-bold focus:outline-none focus:border-white/30 transition-all placeholder:text-white/10"
                   />
                </div>
             </div>
           )}

           <button 
             type="submit"
             disabled={!name.trim()}
             className="w-full h-16 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:scale-100 group"
           >
             {isSignUp ? 'Initialize System' : 'Access Workspace'}
             <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;