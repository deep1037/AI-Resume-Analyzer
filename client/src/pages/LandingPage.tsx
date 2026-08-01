import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Moon, Sparkles, Star, SunMedium } from 'lucide-react';

const features = [
  'ATS scoring and AI feedback',
  'Job description comparison',
  'Skill gap and keyword insights',
  'Resume history and downloadable reports',
];

const pricing = [
  { name: 'Starter', price: '$0', note: 'Free trial' },
  { name: 'Pro', price: '$19', note: 'Best for candidates' },
  { name: 'Scale', price: '$49', note: 'Team analytics' },
];

export const LandingPage = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    document.body.classList.toggle('light', theme === 'light');
  }, [theme]);

  return (
    <div className="min-h-screen text-slate-100">
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <nav className="glass flex items-center justify-between rounded-2xl px-5 py-4 shadow-soft">
          <div className="text-xl font-bold">AI Resume Analyzer</div>
          <div className="flex items-center gap-3 text-sm">
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="rounded-full border border-white/10 px-3 py-2">
              {theme === 'dark' ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <a href="/login" className="rounded-full border border-white/10 px-4 py-2">Login</a>
            <a href="/register" className="rounded-full bg-brand-500 px-4 py-2 font-semibold text-slate-950">Get Started</a>
          </div>
        </nav>

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-brand-100 ring-1 ring-white/10">
              <Sparkles className="h-4 w-4" /> AI-powered hiring insights
            </div>
            <h1 className="text-5xl font-black leading-tight sm:text-6xl">Analyze Your Resume with AI</h1>
            <p className="max-w-xl text-lg text-slate-300">
              Get ATS Score, Resume Feedback and Job Match instantly.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="/register" className="rounded-full bg-brand-500 px-6 py-3 font-semibold text-slate-950">Get Started</a>
              <a href="/dashboard" className="rounded-full border border-white/10 px-6 py-3 font-semibold">Live Demo</a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-3xl p-6 shadow-soft">
            <div className="rounded-2xl bg-gradient-to-br from-brand-500/30 to-violet-500/20 p-5">
              <div className="mb-4 flex items-center justify-between text-sm text-slate-200">
                <span>ATS Score</span>
                <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-emerald-300">92/100</span>
              </div>
              <div className="space-y-3">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 rounded-2xl bg-slate-950/40 px-3 py-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {['Features', 'How It Works', 'Testimonials'].map((section, idx) => (
            <div key={section} className="glass rounded-3xl p-6 shadow-soft">
              <div className="mb-2 text-brand-100">0{idx + 1}</div>
              <h3 className="text-xl font-semibold">{section}</h3>
              <p className="mt-2 text-slate-300">
                A polished SaaS section designed for quick comprehension, trust, and conversion.
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {pricing.map((plan) => (
            <div key={plan.name} className="glass rounded-3xl p-6 shadow-soft">
              <div className="text-sm text-brand-100">{plan.name}</div>
              <div className="mt-3 text-4xl font-black">{plan.price}</div>
              <div className="mt-2 text-slate-300">{plan.note}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4 text-sm text-slate-300">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2">
              <Star className="h-4 w-4 text-yellow-300" /> 4.9 rating
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center text-sm text-slate-300">
          <a href="/register" className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-3 font-semibold text-slate-950">
            Start your free analysis <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <footer className="mt-14 border-t border-white/10 px-6 py-8 text-center text-slate-400">
        © 2026 AI Resume Analyzer · Premium ATS analytics for modern hiring teams.
      </footer>
    </div>
  );
};
