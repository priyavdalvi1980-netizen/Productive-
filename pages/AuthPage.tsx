import React, { useState } from 'react';
import { useStore } from '../store/useStore.ts';
import { ArrowRight, Sparkles, UserCircle2, Mail, Lock, Github, Chrome, Fingerprint, ChevronRight } from 'lucide-react';

const AuthPage: React.FC = () => {
  const { login } = useStore();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'signup' && (!formData.name.trim() || !formData.email.trim())) return;
    if (activeTab === 'signin' && !formData.email.trim()) return; // allow email only login for simplicity or assume name=email part

    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      // Determine display name
      const displayName = formData.name || formData.email.split('@')[0];
      login(displayName, formData.email);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 bg-[#020410] overflow-y-auto">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow" />
         <div className="absolute top-[40%] right-[-10%] w-[60vw] h-[60vw] bg-purple-600/10 rounded-full blur-[100px] animate-pulse-slow delay-1000" />
      </div>

      <div className="w-full max-w-[1000px] min-h-[600px] glass-panel rounded-[2rem] md:rounded-[3rem] border border-white/10 shadow-2xl relative z-10 flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in-95 duration-500">
        
        {/* Left Side: Brand & Art (Hidden on mobile usually, but keeping visible for style) */}
        <div className="hidden md:flex w-1/2 bg-black/40 relative flex-col justify-between p-12 border-r border-white/5">
            <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg mb-6">
                    <span className="text-4xl text-white">∞</span>
                </div>
                <h1 className="text-5xl font-black text-white tracking-tighter leading-none mb-4">
                    Neural<br/>Workspace
                </h1>
                <p className="text-white/40 text-sm font-bold uppercase tracking-[0.2em] max-w-xs">
                    Architect your productivity with AI-driven insights.
                </p>
            </div>

            <div className="relative z-10 space-y-4">
                 <div className="flex items-center gap-3 text-white/60">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><Sparkles className="w-4 h-4" /></div>
                    <span className="text-xs font-bold uppercase tracking-widest">AI Optimization</span>
                 </div>
                 <div className="flex items-center gap-3 text-white/60">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><Fingerprint className="w-4 h-4" /></div>
                    <span className="text-xs font-bold uppercase tracking-widest">Biometric Sync</span>
                 </div>
            </div>

            {/* Abstract Decorative Elements */}
            <div className="absolute inset-0 z-0">
               <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-black/20 backdrop-blur-xl">
           
           {/* Mobile Header */}
           <div className="md:hidden text-center mb-8">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl mx-auto flex items-center justify-center mb-4">
                 <span className="text-2xl text-white">∞</span>
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">Productive</h2>
           </div>

           {/* Tabs */}
           <div className="flex p-1 bg-white/5 rounded-xl mb-8 border border-white/5 relative">
              <div 
                className={`absolute inset-y-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-lg transition-all duration-300 ease-out ${activeTab === 'signin' ? 'left-1' : 'left-[calc(50%+4px)]'}`}
              />
              <button 
                onClick={() => setActiveTab('signin')}
                className={`flex-1 py-3 text-xs font-black uppercase tracking-widest relative z-10 transition-colors ${activeTab === 'signin' ? 'text-black' : 'text-white/40 hover:text-white'}`}
              >
                Sign In
              </button>
              <button 
                onClick={() => setActiveTab('signup')}
                className={`flex-1 py-3 text-xs font-black uppercase tracking-widest relative z-10 transition-colors ${activeTab === 'signup' ? 'text-black' : 'text-white/40 hover:text-white'}`}
              >
                Sign Up
              </button>
           </div>

           <form onSubmit={handleSubmit} className="space-y-5">
              
              {activeTab === 'signup' && (
                  <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Full Name</label>
                      <div className="relative group">
                          <UserCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-white transition-colors" />
                          <input 
                              name="name"
                              type="text" 
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="John Doe"
                              className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-white font-medium focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all placeholder:text-white/10"
                          />
                      </div>
                  </div>
              )}

              <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Email Address</label>
                  <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-white transition-colors" />
                      <input 
                          name="email"
                          type="email" 
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="name@example.com"
                          className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-white font-medium focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all placeholder:text-white/10"
                      />
                  </div>
              </div>

              <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Password</label>
                  <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-white transition-colors" />
                      <input 
                          name="password"
                          type="password" 
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="••••••••"
                          className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-white font-medium focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all placeholder:text-white/10"
                      />
                  </div>
              </div>

              <div className="pt-4">
                  <button 
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-black text-sm uppercase tracking-widest text-white shadow-lg shadow-purple-900/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
                  >
                      {isLoading ? (
                          <div className="flex items-center gap-2">
                             <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                             <span>Processing...</span>
                          </div>
                      ) : (
                          <>
                             <span>{activeTab === 'signin' ? 'Access Terminal' : 'Initialize Account'}</span>
                             <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                      )}
                  </button>
              </div>

           </form>

           <div className="mt-8 relative flex items-center justify-center">
                <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
                <span className="relative bg-[#0b0c15] px-4 text-[10px] text-white/30 font-black uppercase tracking-widest">Or continue with</span>
           </div>

           <div className="grid grid-cols-2 gap-4 mt-6">
                <button className="h-12 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-3 group">
                    <Github className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                    <span className="text-xs font-bold text-white/60 group-hover:text-white">GitHub</span>
                </button>
                <button className="h-12 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-3 group">
                    <Chrome className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                    <span className="text-xs font-bold text-white/60 group-hover:text-white">Google</span>
                </button>
           </div>

        </div>
      </div>
    </div>
  );
};

export default AuthPage;