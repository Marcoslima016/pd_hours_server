import { Request, Response } from 'express';
import { pool } from '../services/dbClient';

export const createEmployee = async (req: Request, res: Response) => {
    const { name, estimatedHours, squadId } = req.body;

    if (!name || !estimatedHours || !squadId) {
        return res.status(400).json({ error: 'Name, estimatedHours and squadId are required' });
    }

    // if (estimatedHours < 1 || estimatedHours > 12) {
    //     return res.status(400).json({ error: 'Estimated hours must be between 1 and 12' });
    // }

    try {
        // Verifica se o Squad existe
        const squadResult = await pool.query(
            'SELECT * FROM Squads WHERE id = $1',
            [squadId]
        );

        if (squadResult.rows.length === 0) {
            return res.status(404).json({ error: 'Squad not found' });
        }

        // Insere o Employee
        const result = await pool.query(
            'INSERT INTO Employees (name, estimatedHours, squadId) VALUES ($1, $2, $3) RETURNING *',
            [name, estimatedHours, squadId]
        );

        const employee = result.rows[0];
        res.status(201).json({ message: 'Employee created successfully', employee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create employee' });
    }
};


export const getAllEmployees = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM Employees');
        const employees = result.rows;
        res.status(200).json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve employees' });
    }
};