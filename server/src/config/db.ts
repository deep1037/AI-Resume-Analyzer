import mongoose from 'mongoose';

export const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai_resume_analyzer';
  await mongoose.connect(mongoUri);
};
