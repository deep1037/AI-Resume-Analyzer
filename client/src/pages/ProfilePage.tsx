import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { GlassCard } from '../components/GlassCard';
import { useAuth } from '../context/AuthContext';

export const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [password, setPassword] = useState('');

  const handleSave = async () => {
    try {
      await updateProfile(name, password || undefined);
      toast.success('Profile updated');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="min-h-screen p-6 text-slate-100">
      <div className="mx-auto max-w-4xl space-y-6">
        <GlassCard>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="mt-2 text-slate-300">Update your account details.</p>
        </GlassCard>
        <GlassCard>
          <div className="grid gap-4 md:grid-cols-2">
            <input
              className="rounded-2xl bg-slate-950/50 p-3 outline-none ring-1 ring-white/10"
              placeholder="Full name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <input
              className="rounded-2xl bg-slate-950/50 p-3 outline-none ring-1 ring-white/10"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button onClick={handleSave} className="mt-4 rounded-full bg-brand-500 px-5 py-3 font-semibold text-slate-950">
            Save changes
          </button>
        </GlassCard>
      </div>
    </div>
  );
};
