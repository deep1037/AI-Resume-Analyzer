export type User = {
  id: string;
  name: string;
  email: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type ResumeAnalysis = {
  summary: string;
  skills: string[];
  missingSkills: string[];
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  atsScore: number;
  overallFeedback: string;
};

export type JobMatchResult = {
  matchPercentage: number;
  missingKeywords: string[];
  suggestions: string[];
  improvementTips: string[];
};

export type ResumeRecord = {
  _id: string;
  fileName: string;
  fileUrl: string;
  atsScore: number;
  parsedText: string;
  analysis: ResumeAnalysis;
  createdAt: string;
};
