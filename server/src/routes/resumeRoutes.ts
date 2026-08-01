import { Router } from 'express';
import { uploadResume, analyzeResume, matchJob, getHistory, deleteResume } from '../controllers/resumeController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/upload', protect, uploadResume);
router.post('/analyze', protect, analyzeResume);
router.post('/job-match', protect, matchJob);
router.get('/history', protect, getHistory);
router.delete('/:id', protect, deleteResume);

export default router;
