import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import dns from 'dns';
import authRoutes from './routes/authRoutes';
import resumeRoutes from './routes/resumeRoutes';

// Override Node's DNS resolver to use public DNS servers. The local router DNS
// (192.168.1.1) intermittently fails SRV lookups for MongoDB Atlas
// (_mongodb._tcp.cluster0.lrenbfc.mongodb.net), causing
// "querySrv ECONNREFUSED" at startup. This must run before mongoose.connect()
// so the mongodb+srv:// SRV resolution works reliably.
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 5000);
app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/api/health', (_req, res) => {
  res.status(200).json({ message: 'AI Resume Analyzer API running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);

app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err);
  res.status(err.statusCode || 500).json({ message: err.message || 'Internal server error' });
});

const connectDatabase = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is missing in .env");
  }

  await mongoose.connect(uri);

  console.log("✅ MongoDB Connected");
};

const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  } catch (error) {
    console.error('Server startup failed', error);
    process.exit(1);
  }
};

startServer();
