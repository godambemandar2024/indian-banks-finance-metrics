import { Request, Response } from 'express';
import { query } from '../database/connection';

export const getBanks = async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM banks ORDER BY name');
    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Error fetching banks:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch banks'
    });
  }
};

export const getBankById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM banks WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Bank not found'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching bank:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch bank'
    });
  }
};
