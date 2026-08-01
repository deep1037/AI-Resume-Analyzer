import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { UploadCloud } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { resumeApi } from '../services/api';

export const UploadPage = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (nextFile: File | undefined) => {
    if (!nextFile) return;
    const isAllowed = /\.pdf$|\.docx$/i.test(nextFile.name);
    if (!isAllowed) {
      toast.error('Please upload a PDF or DOCX resume');
      return;
    }
    setFile(nextFile);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a PDF or DOCX file');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);
    setLoading(true);

    try {
      const response = await resumeApi.uploadResume(formData);
      toast.success(response.data.message);
      navigate('/analysis', { state: { resume: response.data.resume } });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 text-slate-100">
      <div className="mx-auto max-w-4xl">
        <GlassCard>
          <h1 className="text-3xl font-bold">Upload Resume</h1>
          <p className="mt-2 text-slate-300">Upload PDF or DOCX and get AI-powered analysis instantly.</p>
          <div
            className={`mt-6 flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed p-10 text-center transition ${dragActive ? 'border-brand-300 bg-brand-500/10' : 'border-white/20 bg-slate-950/40'}`}
            onClick={() => inputRef.current?.click()}
            onDragOver={(event) => {
              event.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragActive(false);
              handleFile(event.dataTransfer.files?.[0]);
            }}
          >
            <UploadCloud className="h-10 w-10 text-brand-200" />
            <div className="mt-4 text-lg font-semibold">Drag & Drop Resume Here</div>
            <div className="mt-2 text-sm text-slate-300">or click to browse your files</div>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx"
            className="hidden"
            onChange={(event) => handleFile(event.target.files?.[0])}
          />
          {file && <div className="mt-4 rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-200">Selected: {file.name}</div>}
          <button
            onClick={handleUpload}
            disabled={loading}
            className="mt-6 rounded-full bg-brand-500 px-5 py-3 font-semibold text-slate-950"
          >
            {loading ? 'Uploading...' : 'Analyze Resume'}
          </button>
        </GlassCard>
      </div>
    </div>
  );
};
