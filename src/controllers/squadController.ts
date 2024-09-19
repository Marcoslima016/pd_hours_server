import { Request, Response } from 'express';
import { pool } from '../services/dbClient';

export const createSquad = async (req: Request, res: Response) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO Squads (name) VALUES ($1) RETURNING *',
            [name]
        );

        const squad = result.rows[0];
        res.status(201).json({ message: 'Squad created successfully', squad });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create squad' });
    }
};