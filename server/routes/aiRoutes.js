import express from 'express';
import {
  summarizeProject,
  askQuestion
} from '../controllers/aiController.js';

const router = express.Router();

// AI routes
router.post('/summarize', summarizeProject);
router.post('/ask', askQuestion);

export default router;
