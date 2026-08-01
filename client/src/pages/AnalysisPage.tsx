import { useLocation } from 'react-router-dom';
import { GlassCard } from '../components/GlassCard';
import type { ResumeAnalysis } from '../types';

const defaultAnalysis: ResumeAnalysis = {
  summary: 'A strong candidate profile with clear product and technical strengths.',
  skills: ['React', 'TypeScript', 'Node.js'],
  missingSkills: ['System Design', 'SQL'],
  strengths: ['Clear ownership', 'Strong delivery mindset'],
  weaknesses: ['Limited leadership metrics'],
  suggestions: ['Add quantifiable outcomes'],
  atsScore: 92,
  overallFeedback: 'Strong profile with opportunities to sharpen matching keywords.',
};

export const AnalysisPage = () => {
  const location = useLocation();
  const resume = location.state?.resume as { analysis?: ResumeAnalysis } | undefined;
  const analysis: ResumeAnalysis = resume?.analysis || defaultAnalysis;

  const handleExport = () => {
    const report = [
      'AI Resume Analyzer Report',
      '',
      `ATS Score: ${analysis.atsScore}/100`,
      `Summary: ${analysis.summary}`,
      `Skills: ${analysis.skills.join(', ')}`,
      `Missing Skills: ${analysis.missingSkills.join(', ')}`,
      `Strengths: ${analysis.strengths.join(', ')}`,
      `Weaknesses: ${analysis.weaknesses.join(', ')}`,
      `Suggestions: ${analysis.suggestions.join(', ')}`,
      `Overall Feedback: ${analysis.overallFeedback}`,
    ].join('\n');

    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume-analysis-report.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen p-6 text-slate-100">
      <div className="mx-auto max-w-5xl space-y-6">
        <GlassCard>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Resume Analysis</h1>
              <p className="mt-2 text-slate-300">Summary, ATS score, strengths, and job match insights.</p>
            </div>
            <button onClick={handleExport} className="rounded-full bg-brand-500 px-5 py-3 font-semibold text-slate-950">
              Export Report
            </button>
          </div>
          <p className="mt-4 rounded-2xl bg-white/5 px-4 py-3 text-slate-200">{analysis.summary}</p>
        </GlassCard>
        <div className="grid gap-6 md:grid-cols-2">
          <GlassCard>
            <div className="text-lg font-semibold">Skills Detection</div>
            <div className="mt-3 space-y-2 text-slate-300">
              {analysis.skills.map((skill: string) => (
                <div key={skill} className="rounded-2xl bg-white/5 px-3 py-2">{skill}</div>
              ))}
            </div>
          </GlassCard>
          <GlassCard>
            <div className="text-lg font-semibold">ATS Score</div>
            <div className="mt-3 text-4xl font-black text-emerald-300">{analysis.atsScore} / 100</div>
            <div className="mt-4 text-slate-300">{analysis.overallFeedback}</div>
          </GlassCard>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <GlassCard>
            <div className="text-lg font-semibold">Strengths</div>
            <div className="mt-3 space-y-2 text-slate-300">
              {analysis.strengths.map((item: string) => (
                <div key={item} className="rounded-2xl bg-white/5 px-3 py-2">{item}</div>
              ))}
            </div>
          </GlassCard>
          <GlassCard>
            <div className="text-lg font-semibold">Missing Skills</div>
            <div className="mt-3 space-y-2 text-slate-300">
              {analysis.missingSkills.map((item: string) => (
                <div key={item} className="rounded-2xl bg-white/5 px-3 py-2">{item}</div>
              ))}
            </div>
          </GlassCard>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <GlassCard>
            <div className="text-lg font-semibold">Weaknesses</div>
            <div className="mt-3 space-y-2 text-slate-300">
              {analysis.weaknesses.map((item: string) => (
                <div key={item} className="rounded-2xl bg-white/5 px-3 py-2">{item}</div>
              ))}
            </div>
          </GlassCard>
          <GlassCard>
            <div className="text-lg font-semibold">Suggestions</div>
            <div className="mt-3 space-y-2 text-slate-300">
              {analysis.suggestions.map((item: string) => (
                <div key={item} className="rounded-2xl bg-white/5 px-3 py-2">{item}</div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
