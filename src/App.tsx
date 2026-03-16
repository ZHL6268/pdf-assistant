import React, { useEffect } from 'react';
import {
  FileText,
  LayoutDashboard,
  Settings,
  FolderOpen,
  Search,
  Bell,
  CloudUpload,
  Download,
  Share2,
  Sparkles,
  MessageSquare,
  Send,
  FileSearch,
  TrendingUp,
  Wallet,
  Cloud,
  AlertTriangle,
  LogOut,
  Eye,
  ArrowRight,
  PlayCircle,
  ShieldCheck,
  Zap,
  Twitter,
  Linkedin,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { appRoutes } from './config/routes';
import { APP_NAME, MAX_UPLOAD_SIZE_MB } from './constants/app';
import { useAppScreen } from './hooks/use-app-screen';
import { useAuthSession } from './hooks/use-auth-session';
import type { LoginInput } from './types/auth';

const LandingPage = ({ onGetStarted }: { onGetStarted: () => void }) => {
  return (
    <div className="min-h-screen bg-[#f5f6f8] text-slate-900 font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-[#f5f6f8]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="text-[#0d33f2]">
                <Zap size={28} fill="currentColor" />
              </div>
              <span className="text-xl font-extrabold tracking-tight">{APP_NAME}</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium hover:text-[#0d33f2] transition-colors">Features</a>
              <a href="#" className="text-sm font-medium hover:text-[#0d33f2] transition-colors">Pricing</a>
              <a href="#" className="text-sm font-medium hover:text-[#0d33f2] transition-colors">Security</a>
              <a href="#" className="text-sm font-medium hover:text-[#0d33f2] transition-colors">Resources</a>
            </nav>
            <div className="flex items-center gap-4">
              <button onClick={onGetStarted} className="hidden sm:block text-sm font-medium hover:text-[#0d33f2]">Sign In</button>
              <button onClick={onGetStarted} className="bg-[#0d33f2] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-[#0d33f2]/90 transition-all shadow-lg shadow-[#0d33f2]/20">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col gap-8 text-left max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d33f2]/10 text-[#0d33f2] text-xs font-bold uppercase tracking-wider w-fit">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0d33f2] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0d33f2]"></span>
                  </span>
                  New: GPT-4o Powered Analysis
                </div>
                <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight text-slate-900">
                  Your Documents, Now with <span className="text-[#0d33f2]">Superpowers</span>
                </h1>
                <p className="text-lg lg:text-xl text-slate-600 leading-relaxed">
                  Experience the future of document management. Generate instant summaries and chat directly with your PDFs using advanced AI. Stop reading, start understanding.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={onGetStarted} className="bg-[#0d33f2] text-white px-8 py-4 rounded-xl text-lg font-bold hover:scale-[1.02] transition-transform shadow-xl shadow-[#0d33f2]/25">
                    Get Started for Free
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-50 transition-all">
                    <PlayCircle size={24} />
                    See how it works
                  </button>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white overflow-hidden">
                        <img src={`https://picsum.photos/seed/user${i}/32/32`} alt="User" referrerPolicy="no-referrer" />
                      </div>
                    ))}
                  </div>
                  <span>Joined by 10,000+ professionals this month</span>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#0d33f2]/20 to-purple-500/20 blur-2xl rounded-3xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                <div className="relative bg-white p-2 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                  <div className="aspect-[4/3] w-full bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center border border-slate-100">
                    <img src="https://picsum.photos/seed/dashboard/800/600" alt="Dashboard Preview" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FileText size={64} className="text-slate-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-widest mb-10">Trusted by world-class engineering teams</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex justify-center h-8 bg-center bg-contain bg-no-repeat">
                  <span className="font-black text-slate-400 text-xl italic">COMPANY {i}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 lg:py-32" id="features">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 mb-16 text-center max-w-3xl mx-auto">
              <h2 className="text-[#0d33f2] font-bold text-lg tracking-wide uppercase">Core Features</h2>
              <h3 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                Redefining PDF Productivity
              </h3>
              <p className="text-lg text-slate-600">
                Our suite of AI tools helps you digest information faster and manage workflows securely. Spend less time reading and more time doing.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Zap size={32} />}
                title="Instant Summaries"
                description="Condense 100-page documents into digestible key insights in seconds. Perfect for research papers and long contracts."
              />
              <FeatureCard
                icon={<MessageSquare size={32} />}
                title="Contextual Chat"
                description="Ask questions and get instant answers based solely on the specific content of your files. No more manual searching."
              />
              <FeatureCard
                icon={<ShieldCheck size={32} />}
                title="Secure Management"
                description="Bank-grade encryption ensures your sensitive data stays private. Your documents are never used to train global AI models."
              />
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative bg-[#0d33f2] rounded-[2.5rem] p-10 lg:p-20 overflow-hidden text-center text-white">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-black/20 rounded-full blur-3xl"></div>
              <div className="relative z-10 flex flex-col items-center gap-8 max-w-2xl mx-auto">
                <h2 className="text-4xl lg:text-6xl font-black tracking-tight">Ready to upgrade your document workflow?</h2>
                <p className="text-lg lg:text-xl text-blue-100/80 leading-relaxed">
                  Join thousands of students, researchers, and professionals who are saving hours every week.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <button onClick={onGetStarted} className="bg-white text-[#0d33f2] px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-100 transition-colors shadow-xl">
                    Get Started for Free
                  </button>
                  <button className="bg-[#0d33f2]/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-white/10 transition-colors">
                    Schedule a Demo
                  </button>
                </div>
                <p className="text-sm text-white/60">No credit card required. Cancel anytime.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
            <div className="col-span-2 lg:col-span-2 flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <Zap size={32} className="text-[#0d33f2]" fill="currentColor" />
                <span className="text-xl font-extrabold tracking-tight">{APP_NAME}</span>
              </div>
              <p className="text-slate-500 max-w-xs leading-relaxed">
                Empowering professionals and students with advanced AI document processing tools since 2024.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-[#0d33f2]/10 hover:text-[#0d33f2] transition-all">
                  <Twitter size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-[#0d33f2]/10 hover:text-[#0d33f2] transition-all">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <h5 className="font-bold text-slate-900">Product</h5>
              <ul className="flex flex-col gap-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-[#0d33f2] transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-[#0d33f2] transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-[#0d33f2] transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-[#0d33f2] transition-colors">Changelog</a></li>
              </ul>
            </div>
            <div className="flex flex-col gap-6">
              <h5 className="font-bold text-slate-900">Resources</h5>
              <ul className="flex flex-col gap-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-[#0d33f2] transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-[#0d33f2] transition-colors">Guides</a></li>
                <li><a href="#" className="hover:text-[#0d33f2] transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-[#0d33f2] transition-colors">API Reference</a></li>
              </ul>
            </div>
            <div className="flex flex-col gap-6">
              <h5 className="font-bold text-slate-900">Legal</h5>
              <ul className="flex flex-col gap-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-[#0d33f2] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#0d33f2] transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[#0d33f2] transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-slate-100 gap-4">
            <p className="text-sm text-slate-500">
              © 2024 {APP_NAME}. All rights reserved. Built for speed and accuracy.
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Systems Operational
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="group flex flex-col gap-6 p-8 rounded-2xl border border-slate-200 bg-white hover:shadow-2xl hover:shadow-[#0d33f2]/5 transition-all hover:-translate-y-1">
    <div className="w-14 h-14 rounded-xl bg-[#0d33f2]/10 text-[#0d33f2] flex items-center justify-center group-hover:bg-[#0d33f2] group-hover:text-white transition-colors duration-300">
      {icon}
    </div>
    <div className="flex flex-col gap-3">
      <h4 className="text-xl font-bold text-slate-900 leading-tight">{title}</h4>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
    <div className="mt-auto pt-4">
      <a href="#" className="text-[#0d33f2] font-bold text-sm inline-flex items-center gap-1 group/link">
        Learn more
        <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
      </a>
    </div>
  </div>
);

const LoginPage = ({ onLogin }: { onLogin: (input: LoginInput) => void }) => {
  return (
    <div className="min-h-screen bg-[#f5f6f8] text-slate-900 font-sans flex flex-col">
      <header className="flex items-center justify-between border-b border-slate-200 px-6 lg:px-10 py-3 bg-white">
        <div className="flex items-center gap-3 text-[#0d33f2]">
          <FileText size={32} />
          <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight">{APP_NAME}</h2>
        </div>
        <button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-[#0d33f2]/10 text-[#0d33f2] text-sm font-bold hover:bg-[#0d33f2]/20 transition-colors">
          <span>Help</span>
        </button>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[480px] space-y-8 bg-white p-8 rounded-xl shadow-sm border border-slate-200"
        >
          <div className="text-center space-y-2">
            <h1 className="text-slate-900 text-3xl font-bold tracking-tight">Welcome Back</h1>
            <p className="text-slate-500 text-base">Log in to manage your smart documents</p>
          </div>

          <div className="space-y-4">
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-300 rounded-lg bg-white hover:bg-slate-50 transition-all">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              <span className="text-slate-700 font-medium">Sign in with Google</span>
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-500">Or continue with</span>
              </div>
            </div>

            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                onLogin({
                  email: String(formData.get('email') ?? ''),
                  password: String(formData.get('password') ?? ''),
                });
              }}
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Email address</label>
                <input className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-[#0d33f2]/20 focus:border-[#0d33f2] transition-all outline-none" placeholder="name@company.com" type="email" name="email" defaultValue="alex@company.com" required />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700">Password</label>
                  <a className="text-xs font-semibold text-[#0d33f2] hover:underline" href="#">Forgot password?</a>
                </div>
                <div className="relative">
                  <input className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-[#0d33f2]/20 focus:border-[#0d33f2] transition-all outline-none" placeholder="Enter your password" type="password" name="password" defaultValue="demo-password" required />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" type="button">
                    <Eye size={20} />
                  </button>
                </div>
              </div>
              <button className="w-full py-3 px-4 bg-[#0d33f2] text-white rounded-lg font-bold text-sm tracking-wide hover:bg-[#0d33f2]/90 transition-all shadow-lg shadow-[#0d33f2]/20" type="submit">
                Log In
              </button>
            </form>
          </div>

          <div className="pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-600">
              Don't have an account?
              <a className="text-[#0d33f2] font-bold hover:underline ml-1" href="#">Create an account</a>
            </p>
          </div>
        </motion.div>
      </main>

      <footer className="py-6 px-10 text-center">
        <p className="text-slate-400 text-xs">
          © 2024 {APP_NAME}. All rights reserved.
          <span className="mx-2">|</span>
          <a className="hover:text-[#0d33f2] transition-colors" href="#">Privacy Policy</a>
          <span className="mx-2">|</span>
          <a className="hover:text-[#0d33f2] transition-colors" href="#">Terms of Service</a>
        </p>
      </footer>
    </div>
  );
};

const Dashboard = ({
  onSelectDoc,
  onLogout,
  userName,
}: {
  onSelectDoc: () => void;
  onLogout: () => void;
  userName: string;
}) => {
  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f6f8] text-slate-900 font-sans">
      <aside className="w-64 flex-shrink-0 border-r border-slate-200 bg-white hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="size-8 bg-[#0d33f2] rounded-lg flex items-center justify-center text-white">
            <FileText size={20} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">AI PDF</h1>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          <a className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg bg-[#0d33f2] text-white" href="#">
            <LayoutDashboard size={20} />
            Dashboard
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-100 transition-colors" href="#">
            <FolderOpen size={20} />
            My Documents
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-100 transition-colors" href="#">
            <Settings size={20} />
            Settings
          </a>
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 transition-colors mt-4">
            <LogOut size={20} />
            Logout
          </button>
        </nav>
        <div className="p-4 mt-auto">
          <div className="bg-[#0d33f2]/5 rounded-xl p-4 border border-[#0d33f2]/20">
            <p className="text-xs font-semibold text-[#0d33f2] uppercase tracking-wider mb-2">Storage</p>
            <div className="w-full bg-slate-200 h-1.5 rounded-full mb-2">
              <div className="bg-[#0d33f2] h-1.5 rounded-full w-3/4"></div>
            </div>
            <p className="text-xs text-slate-500">1.2 GB of 2 GB used</p>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 flex items-center justify-between px-8 bg-white border-b border-slate-200 flex-shrink-0">
          <div className="flex items-center flex-1 max-w-md">
            <div className="relative w-full">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input className="w-full bg-slate-100 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#0d33f2]" placeholder="Search documents..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-900 leading-none">{userName}</p>
                <p className="text-xs text-slate-500 mt-1">Premium Plan</p>
              </div>
              <div className="size-10 rounded-full bg-[#0d33f2]/20 flex items-center justify-center overflow-hidden border-2 border-[#0d33f2]/10 group-hover:border-[#0d33f2]/40 transition-all">
                <img className="w-full h-full object-cover" src="https://picsum.photos/seed/alex/100/100" alt="User" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard</h2>
              <p className="text-slate-500 mt-1">Good morning, Alex. Here's what's happening with your documents.</p>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0d33f2] to-blue-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl bg-white p-12 transition-all hover:border-[#0d33f2]/50">
                <div className="size-16 rounded-full bg-[#0d33f2]/10 flex items-center justify-center text-[#0d33f2] mb-4">
                  <CloudUpload size={36} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Upload New PDF</h3>
                <p className="text-slate-500 mt-1 mb-6">Drag and drop your file here, or click to browse files</p>
                <button className="bg-[#0d33f2] hover:bg-[#0d33f2]/90 text-white font-bold py-2.5 px-8 rounded-lg transition-all shadow-lg shadow-[#0d33f2]/20">
                  Select File
                </button>
                <p className="text-xs text-slate-400 mt-4">Supports PDF up to {MAX_UPLOAD_SIZE_MB}MB</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <h3 className="font-bold text-slate-900">Recent Documents</h3>
                <button className="text-sm font-semibold text-[#0d33f2] hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Name</th>
                      <th className="px-6 py-4 font-semibold">Upload Date</th>
                      <th className="px-6 py-4 font-semibold">Summary Status</th>
                      <th className="px-6 py-4 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <DocRow name="Quarterly_Report_Q3.pdf" date="Oct 24, 2023" status="Complete" onOpen={onSelectDoc} />
                    <DocRow name="Product_Roadmap_2024.pdf" date="Oct 23, 2023" status="Pending" onOpen={onSelectDoc} />
                    <DocRow name="Legal_Contract_V2.pdf" date="Oct 21, 2023" status="Complete" onOpen={onSelectDoc} />
                    <DocRow name="Market_Analysis_Global.pdf" date="Oct 19, 2023" status="Complete" onOpen={onSelectDoc} />
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 text-center">
                <p className="text-sm text-slate-500">Showing 4 of 28 documents</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const DocRow = ({ name, date, status, onOpen }: { name: string, date: string, status: 'Complete' | 'Pending', onOpen: () => void }) => (
  <tr className="hover:bg-slate-50 transition-colors">
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <FileText size={20} className="text-red-500" />
        <span className="font-medium text-slate-900">{name}</span>
      </div>
    </td>
    <td className="px-6 py-4 text-sm text-slate-500">{date}</td>
    <td className="px-6 py-4">
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
        status === 'Complete' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
      }`}>
        <span className={`size-1.5 rounded-full ${status === 'Complete' ? 'bg-green-500' : 'bg-amber-500 animate-pulse'}`}></span>
        {status}
      </span>
    </td>
    <td className="px-6 py-4 text-right">
      <button
        onClick={status === 'Complete' ? onOpen : undefined}
        className={`${status === 'Complete' ? 'text-[#0d33f2] hover:bg-[#0d33f2]/10' : 'text-slate-400 cursor-not-allowed'} px-4 py-1.5 rounded-lg text-sm font-bold transition-colors`}
      >
        Open
      </button>
    </td>
  </tr>
);

const DocumentDetail = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-[#f5f6f8] text-slate-900 font-sans">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3 z-10">
        <div className="flex items-center gap-4 text-[#0d33f2]">
          <div className="size-8 flex items-center justify-center bg-[#0d33f2]/10 rounded-lg">
            <Zap size={20} />
          </div>
          <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight">{APP_NAME}</h2>
        </div>
        <div className="flex flex-1 justify-end gap-3 items-center">
          <div className="flex gap-2">
            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
              <Download size={20} />
            </button>
            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
              <Share2 size={20} />
            </button>
            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
              <Settings size={20} />
            </button>
          </div>
          <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
          <div className="size-10 rounded-full bg-slate-200 border border-slate-200 overflow-hidden">
            <img src="https://picsum.photos/seed/alex/100/100" alt="User" referrerPolicy="no-referrer" />
          </div>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col overflow-y-auto p-6 gap-6">
          <nav className="flex items-center gap-2 text-sm">
            <button onClick={onBack} className="text-slate-500 hover:text-[#0d33f2] flex items-center gap-1 transition-colors">
              <LayoutDashboard size={14} />
              Dashboard
            </button>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 font-medium">Q4 Strategic Growth Plan.pdf</span>
          </nav>

          <div className="flex border-b border-slate-200">
            <button className="px-6 py-3 text-sm font-semibold border-b-2 border-[#0d33f2] text-[#0d33f2] flex items-center gap-2">
              <FileSearch size={16} />
              Key Insights
            </button>
            <button className="px-6 py-3 text-sm font-medium text-slate-500 hover:text-slate-700 flex items-center gap-2 transition-colors">
              <Eye size={16} />
              PDF Preview
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <FileText size={24} className="text-[#0d33f2]" />
                <h3 className="text-lg font-bold text-slate-900">Overall Summary</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                This document outlines the strategic initiatives for Q4 2024, focusing on aggressive AI integration across all product lines and expanding cloud scalability. It details the budget allocations of $2.4M and defines key performance indicators (KPIs) for evaluating the return on investment (ROI) of these upcoming technological pivots.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InsightItem icon={<TrendingUp size={20} />} color="blue" title="Growth Targets" desc="Projected 15% increase in user acquisition through AI-driven personalization features." />
              <InsightItem icon={<Wallet size={20} />} color="purple" title="Budget Allocation" desc="$1.2M earmarked for infrastructure, $800k for talent acquisition, and $400k for marketing." />
              <InsightItem icon={<Cloud size={20} />} color="green" title="Cloud Scalability" desc="Migration to serverless architecture expected to reduce operational costs by 22% annually." />
              <InsightItem icon={<AlertTriangle size={20} />} color="amber" title="Risk Factors" desc="Potential delays in GPU procurement and regulatory compliance shifts in the EU market." />
            </div>

            <div className="relative bg-slate-200 rounded-xl h-[400px] overflow-hidden flex items-center justify-center group border border-slate-300">
              <div className="absolute inset-0 opacity-10 bg-center bg-cover" style={{ backgroundImage: "url('https://picsum.photos/seed/pdf-bg/1200/800')" }}></div>
              <div className="relative z-10 flex flex-col items-center gap-4">
                <FileText size={64} className="text-slate-400" />
                <button className="bg-white text-slate-900 px-6 py-2.5 rounded-lg font-bold text-sm shadow-xl hover:scale-105 transition-transform">
                  Open Full Preview
                </button>
              </div>
            </div>
          </div>
        </div>

        <aside className="w-[400px] border-l border-slate-200 bg-white flex flex-col">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare size={20} className="text-[#0d33f2]" />
              <h3 className="font-bold text-slate-900">Chat Assistant</h3>
            </div>
            <button className="text-xs font-bold text-[#0d33f2] bg-[#0d33f2]/10 px-3 py-1 rounded-full hover:bg-[#0d33f2]/20 transition-colors">
              Clear Chat
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <ChatMessage isAi text="Hello! I've analyzed your document. How can I help you today?" time="Just now" />
            <ChatMessage text="What is the total budget for Q4 initiatives?" time="2 min ago" />
            <ChatMessage isAi text={<span>The total budget allocation for Q4 is <strong className="text-[#0d33f2]">$2.4 million</strong>. This is split into infrastructure ($1.2M), talent ($800k), and marketing ($400k).</span>} time="1 min ago" />

            <div className="pt-4 flex flex-wrap gap-2">
              {['Summarize findings', 'List all KPIs', 'Extract contact info'].map((s) => (
                <button key={s} className="text-xs border border-slate-200 px-3 py-1.5 rounded-full text-slate-600 hover:bg-slate-50 transition-colors">{s}</button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-200">
            <div className="flex flex-col gap-3">
              <div className="relative">
                <textarea className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#0d33f2] focus:border-transparent outline-none resize-none placeholder:text-slate-400" placeholder="Ask a question about this document..." rows={3}></textarea>
                <button className="absolute bottom-3 right-3 bg-[#0d33f2] text-white p-2 rounded-lg hover:bg-[#0d33f2]/90 transition-colors flex items-center justify-center">
                  <Send size={16} />
                </button>
              </div>
              <button className="w-full bg-slate-900 text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                <FileSearch size={16} />
                Generate Detailed Report
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

const InsightItem = ({ icon, color, title, desc }: { icon: React.ReactNode, color: string, title: string, desc: string }) => {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    green: 'bg-green-50 text-green-600',
    amber: 'bg-amber-50 text-amber-600',
  };
  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 hover:border-[#0d33f2]/30 transition-colors">
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
        <div>
          <h4 className="font-bold text-slate-900 mb-1">{title}</h4>
          <p className="text-sm text-slate-600">{desc}</p>
        </div>
      </div>
    </div>
  );
};

const ChatMessage = ({ isAi, text, time }: { isAi?: boolean, text: React.ReactNode, time: string }) => (
  <div className={`flex flex-col gap-2 max-w-[85%] ${isAi ? '' : 'ml-auto items-end'}`}>
    <div className={`p-3 rounded-xl ${isAi ? 'bg-slate-100 rounded-tl-none text-slate-800' : 'bg-[#0d33f2] text-white rounded-tr-none'}`}>
      <div className="text-sm leading-relaxed">{text}</div>
    </div>
    <span className="text-[10px] text-slate-400">{isAi ? 'AI Assistant' : 'You'} • {time}</span>
  </div>
);

export default function App() {
  const { screen, setScreen } = useAppScreen();
  const { isAuthenticated, user, login, logout } = useAuthSession();

  useEffect(() => {
    if (!isAuthenticated && appRoutes[screen].isProtected) {
      setScreen('login');
    }
  }, [isAuthenticated, screen, setScreen]);

  useEffect(() => {
    if (isAuthenticated && (screen === 'landing' || screen === 'login')) {
      setScreen('dashboard');
    }
  }, [isAuthenticated, screen, setScreen]);

  return (
    <AnimatePresence mode="wait">
      {screen === 'landing' && (
        <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <LandingPage onGetStarted={() => setScreen('login')} />
        </motion.div>
      )}
      {screen === 'login' && (
        <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <LoginPage
            onLogin={(input) => {
              login(input);
              setScreen('dashboard');
            }}
          />
        </motion.div>
      )}
      {screen === 'dashboard' && (
        <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Dashboard
            onSelectDoc={() => setScreen('detail')}
            onLogout={() => {
              logout();
              setScreen('landing');
            }}
            userName={user?.fullName || 'Workspace User'}
          />
        </motion.div>
      )}
      {screen === 'detail' && (
        <motion.div key="detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <DocumentDetail onBack={() => setScreen('dashboard')} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
