import express, { Router, Request, Response } from 'express';
import { getMetricsByBank, updateMetrics } from '../controllers/metricsController';

const router: Router = express.Router();

// Get metrics for a specific bank
router.get('/bank/:bankId', getMetricsByBank);

// Trigger metrics update (manual update)
router.post('/update/:bankId', updateMetrics);

export default router;
