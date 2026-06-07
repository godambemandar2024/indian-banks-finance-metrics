import express, { Router, Request, Response } from 'express';
import { getBanks, getBankById } from '../controllers/bankController';

const router: Router = express.Router();

// Get all banks
router.get('/', getBanks);

// Get specific bank
router.get('/:id', getBankById);

export default router;
