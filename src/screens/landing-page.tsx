import { FileText, Linkedin, MessageSquare, PlayCircle, ShieldCheck, Twitter, Zap } from 'lucide-react';
import { FeatureCard } from '../components/feature-card';
import { PlaceholderButton } from '../components/placeholder-button';
import { APP_NAME } from '../constants/app';

export function LandingPage({
  onGetStarted,
  onOpenSignup,
}: {
  onGetStarted: () => void;
  onOpenSignup: () => void;
}) {
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
              <a href="#features" className="text-sm font-medium hover:text-[#0d33f2] transition-colors">
                Features
              </a>
              <PlaceholderButton className="text-sm font-medium hover:text-[#0d33f2] transition-colors">
                Pricing
              </PlaceholderButton>
              <PlaceholderButton className="text-sm font-medium hover:text-[#0d33f2] transition-colors">
                Security
              </PlaceholderButton>
              <PlaceholderButton className="text-sm font-medium hover:text-[#0d33f2] transition-colors">
                Resources
              </PlaceholderButton>
            </nav>
            <div className="flex items-center gap-4">
              <button onClick={onGetStarted} className="hidden sm:block text-sm font-medium hover:text-[#0d33f2]" type="button">
                Sign In
              </button>
              <button
                onClick={onOpenSignup}
                className="bg-[#0d33f2] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-[#0d33f2]/90 transition-all shadow-lg shadow-[#0d33f2]/20"
                type="button"
              >
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
                  <button
                    onClick={onOpenSignup}
                    className="bg-[#0d33f2] text-white px-8 py-4 rounded-xl text-lg font-bold hover:scale-[1.02] transition-transform shadow-xl shadow-[#0d33f2]/25"
                    type="button"
                  >
                    Get Started for Free
                  </button>
                  <span className="flex items-center justify-center gap-2 bg-white border border-slate-200 px-8 py-4 rounded-xl text-lg font-bold text-slate-400">
                    <PlayCircle size={24} />
                    Demo Preview Coming Soon
                  </span>
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
            <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-widest mb-10">
              Trusted by world-class engineering teams
            </p>
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
              <h3 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">Redefining PDF Productivity</h3>
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
                  <button
                    onClick={onOpenSignup}
                    className="bg-white text-[#0d33f2] px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-100 transition-colors shadow-xl"
                    type="button"
                  >
                    Get Started for Free
                  </button>
                  <span className="bg-[#0d33f2]/20 backdrop-blur-sm border border-white/30 text-white/70 px-8 py-4 rounded-xl text-lg font-bold">
                    Demo Scheduling Coming Soon
                  </span>
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
                <PlaceholderButton className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-[#0d33f2]/10 hover:text-[#0d33f2] transition-all">
                  <Twitter size={20} />
                </PlaceholderButton>
                <PlaceholderButton className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-[#0d33f2]/10 hover:text-[#0d33f2] transition-all">
                  <Linkedin size={20} />
                </PlaceholderButton>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <h5 className="font-bold text-slate-900">Product</h5>
              <ul className="flex flex-col gap-4 text-sm text-slate-500">
                <li><PlaceholderButton className="hover:text-[#0d33f2] transition-colors">Features</PlaceholderButton></li>
                <li><PlaceholderButton className="hover:text-[#0d33f2] transition-colors">Integrations</PlaceholderButton></li>
                <li><PlaceholderButton className="hover:text-[#0d33f2] transition-colors">Pricing</PlaceholderButton></li>
                <li><PlaceholderButton className="hover:text-[#0d33f2] transition-colors">Changelog</PlaceholderButton></li>
              </ul>
            </div>
            <div className="flex flex-col gap-6">
              <h5 className="font-bold text-slate-900">Resources</h5>
              <ul className="flex flex-col gap-4 text-sm text-slate-500">
                <li><PlaceholderButton className="hover:text-[#0d33f2] transition-colors">Documentation</PlaceholderButton></li>
                <li><PlaceholderButton className="hover:text-[#0d33f2] transition-colors">Guides</PlaceholderButton></li>
                <li><PlaceholderButton className="hover:text-[#0d33f2] transition-colors">Support</PlaceholderButton></li>
                <li><PlaceholderButton className="hover:text-[#0d33f2] transition-colors">API Reference</PlaceholderButton></li>
              </ul>
            </div>
            <div className="flex flex-col gap-6">
              <h5 className="font-bold text-slate-900">Legal</h5>
              <ul className="flex flex-col gap-4 text-sm text-slate-500">
                <li><PlaceholderButton className="hover:text-[#0d33f2] transition-colors">Privacy Policy</PlaceholderButton></li>
                <li><PlaceholderButton className="hover:text-[#0d33f2] transition-colors">Terms of Service</PlaceholderButton></li>
                <li><PlaceholderButton className="hover:text-[#0d33f2] transition-colors">Security</PlaceholderButton></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-slate-100 gap-4">
            <p className="text-sm text-slate-500">© 2024 {APP_NAME}. All rights reserved. Built for speed and accuracy.</p>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              MVP Services Operational
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
