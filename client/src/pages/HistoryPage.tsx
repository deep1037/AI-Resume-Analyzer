import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { GlassCard } from '../components/GlassCard';
import { resumeApi } from '../services/api';
import type { ResumeRecord } from '../types';

export const HistoryPage = () => {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<ResumeRecord[]>([]);
  const [search, setSearch] = useState('');

  const loadHistory = async () => {
    try {
      const response = await resumeApi.history();
      setResumes(response.data.resumes);
    } catch (error) {
      toast.error('Unable to load history');
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const filtered = useMemo(() => {
    return resumes.filter((resume) => resume.fileName.toLowerCase().includes(search.toLowerCase()));
  }, [resumes, search]);

  const handleDelete = async (id: string) => {
    try {
      await resumeApi.deleteResume(id);
      toast.success('Resume deleted');
      setResumes((current) => current.filter((resume) => resume._id !== id));
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="min-h-screen p-6 text-slate-100">
      <div className="mx-auto max-w-5xl">
        <GlassCard>
          <h1 className="text-3xl font-bold">Resume History</h1>
          <p className="mt-2 text-slate-300">Browse previous uploads and re-open analysis results.</p>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search resume history"
            className="mt-4 w-full rounded-2xl bg-slate-950/50 px-4 py-3 outline-none ring-1 ring-white/10"
          />
          <div className="mt-6 space-y-3">
            {filtered.length === 0 ? (
              <div className="rounded-2xl bg-white/5 px-4 py-3 text-slate-200">No resumes uploaded yet.</div>
            ) : (
              filtered.map((resume) => (
                <div key={resume._id} className="flex flex-col gap-3 rounded-2xl bg-white/5 px-4 py-3 text-slate-200 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="font-semibold">{resume.fileName}</div>
                    <div className="text-sm text-slate-400">ATS {resume.atsScore}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => navigate('/analysis', { state: { resume } })} className="rounded-full border border-white/15 px-4 py-2 text-sm text-slate-100">
                      View
                    </button>
                    <button onClick={() => handleDelete(resume._id)} className="rounded-full border border-rose-400/40 px-4 py-2 text-sm text-rose-200">
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
