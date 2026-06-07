import { Request, Response } from 'express';
import { query } from '../database/connection';
import { scrapeMetricsForBank } from '../services/scrapingService';

export const getMetricsByBank = async (req: Request, res: Response) => {
  try {
    const { bankId } = req.params;
    
    const result = await query(`
      SELECT 
        m.*,
        b.name as bank_name
      FROM metrics m
      JOIN banks b ON m.bank_id = b.id
      WHERE m.bank_id = $1
      ORDER BY m.period_end_date DESC
    `, [bankId]);
    
    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Error fetching metrics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch metrics'
    });
  }
};

export const updateMetrics = async (req: Request, res: Response) => {
  try {
    const { bankId } = req.params;
    
    // Verify bank exists
    const bankResult = await query('SELECT * FROM banks WHERE id = $1', [bankId]);
    if (bankResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Bank not found'
      });
    }
    
    const bankName = bankResult.rows[0].name;
    
    // Start scraping in background (don't wait)
    res.json({
      success: true,
      message: `Metrics update initiated for ${bankName}`,
      bankId,
      status: 'processing'
    });
    
    // Perform scraping asynchronously
    scrapeMetricsForBank(bankId, bankName).catch(error => {
      console.error(`Error scraping metrics for bank ${bankName}:`, error);
    });
  } catch (error) {
    console.error('Error updating metrics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update metrics'
    });
  }
};
