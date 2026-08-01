import { Link } from 'react-router-dom';
import { Activity, ArrowUpRight, FileText, Sparkles } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';

const recentActivity = [
  'Uploaded Senior Product Engineer.pdf',
  'Matched against Growth Lead role',
  'Added SQL keyword recommendations',
];

export const DashboardPage = () => (
  <div className="min-h-screen p-6 text-slate-100">
    <div className="mx-auto max-w-6xl space-y-6">
      <GlassCard className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm text-brand-100">Welcome back</div>
          <h1 className="text-3xl font-bold">Your resume intelligence dashboard is ready.</h1>
          <p className="mt-2 text-slate-300">Track ATS performance, recent uploads, and job matching in one place.</p>
        </div>
        <Link to="/upload" className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-3 font-semibold text-slate-950">
          <Sparkles className="h-4 w-4" /> Upload resume
        </Link>
      </GlassCard>

      <div className="grid gap-6 md:grid-cols-3">
        <GlassCard>
          <div className="mb-4 flex items-center gap-2 text-brand-100"><Activity className="h-4 w-4" /> Resume Statistics</div>
          <div className="text-3xl font-black">12</div>
          <div className="mt-2 text-slate-300">Total analyses completed</div>
        </GlassCard>
        <GlassCard>
          <div className="mb-4 flex items-center gap-2 text-brand-100"><FileText className="h-4 w-4" /> Recent Uploads</div>
          <div className="space-y-2 text-slate-300">
            <div className="rounded-2xl bg-white/5 px-3 py-2">Senior Product Engineer.pdf</div>
            <div className="rounded-2xl bg-white/5 px-3 py-2">Full Stack Resume.docx</div>
          </div>
        </GlassCard>
        <GlassCard>
          <div className="mb-4 flex items-center gap-2 text-brand-100"><ArrowUpRight className="h-4 w-4" /> ATS Score Card</div>
          <div className="text-3xl font-black text-emerald-300">91</div>
          <div className="mt-2 text-slate-300">Average score across uploads</div>
        </GlassCard>
      </div>

      <GlassCard>
        <div className="text-lg font-semibold">Recent Activity</div>
        <div className="mt-4 space-y-2 text-slate-300">
          {recentActivity.map((item) => (
            <div key={item} className="rounded-2xl bg-white/5 px-3 py-2">{item}</div>
          ))}
        </div>
      </GlassCard>
    </div>
  </div>
);
