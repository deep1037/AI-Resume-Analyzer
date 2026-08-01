import { Schema, model } from 'mongoose';

export interface IResume {
  user: Schema.Types.ObjectId;
  fileName: string;
  fileUrl: string;
  parsedText: string;
  atsScore: number;
  analysis: Record<string, unknown>;
  createdAt?: Date;
}

const resumeSchema = new Schema<IResume>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    parsedText: { type: String, required: true },
    atsScore: { type: Number, default: 0 },
    analysis: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true },
);

export const Resume = model<IResume>('Resume', resumeSchema);
