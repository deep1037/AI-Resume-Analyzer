import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Resume } from '../models/Resume';
import { extractTextFromFile } from '../utils/fileParser';
import { getAiSummary, matchJobDescription } from '../services/aiService';

const upload = multer({
  dest: path.join(__dirname, '../../uploads'),
});

export const uploadResume = [upload.single('resume'), async (req: any, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Resume file is required' });
    }

    const text = await extractTextFromFile(req.file.path, req.file.mimetype);
    const analysis = await getAiSummary(text);

    const resume = await Resume.create({
      user: req.user?.id,
      fileName: req.file.originalname,
      fileUrl: `/uploads/${req.file.filename}`,
      parsedText: text,
      atsScore: analysis.atsScore,
      analysis,
    });

    return res.status(201).json({ message: 'Resume uploaded', resume });
  } catch (error) {
    return res.status(500).json({ message: 'Resume upload failed' });
  }
}];

export const analyzeResume = async (req: Request, res: Response) => {
  try {
    const { parsedText } = req.body;
    const analysis = await getAiSummary(parsedText || '');
    return res.status(200).json({ analysis });
  } catch (error) {
    return res.status(500).json({ message: 'Analysis failed' });
  }
};

export const matchJob = async (req: Request, res: Response) => {
  try {
    const { parsedText, jobDescription } = req.body;
    const result = await matchJobDescription(parsedText || '', jobDescription || '');
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ message: 'Job matching failed' });
  }
};

export const getHistory = async (req: any, res: Response) => {
  const resumes = await Resume.find({ user: req.user.id }).sort({ createdAt: -1 });
  return res.status(200).json({ resumes });
};

export const deleteResume = async (req: any, res: Response) => {
  const resume = await Resume.findOne({ _id: req.params.id, user: req.user.id });
  if (!resume) {
    return res.status(404).json({ message: 'Resume not found' });
  }

  if (fs.existsSync(path.join(__dirname, '../../uploads', path.basename(resume.fileUrl)))) {
    fs.unlinkSync(path.join(__dirname, '../../uploads', path.basename(resume.fileUrl)));
  }

  await resume.deleteOne();
  return res.status(200).json({ message: 'Resume deleted' });
};
