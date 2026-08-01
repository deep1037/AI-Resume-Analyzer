import { GlassCard } from '../components/GlassCard';

export const SettingsPage = () => (
  <div className="min-h-screen p-6 text-slate-100">
    <div className="mx-auto max-w-4xl space-y-6">
      <GlassCard>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-2 text-slate-300">Manage account preferences and automation settings.</p>
      </GlassCard>
      <GlassCard>
        <div className="space-y-3 text-slate-200">
          <div className="rounded-2xl bg-white/5 px-4 py-3">AI provider: Gemini</div>
          <div className="rounded-2xl bg-white/5 px-4 py-3">Theme: Dark mode with glassmorphism</div>
          <div className="rounded-2xl bg-white/5 px-4 py-3">Notifications: Enabled</div>
        </div>
      </GlassCard>
    </div>
  </div>
);
