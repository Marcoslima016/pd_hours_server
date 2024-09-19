import { Request, Response } from 'express';
import { supabase } from '../services/supabaseClient';

export const createEmployee = async (req: Request, res: Response) => {
    const { name, estimatedHours, squadId } = req.body;

    if (!name || !estimatedHours || !squadId) {
        return res.status(400).json({ error: 'Name, estimatedHours and squadId are required' });
    }

    if (estimatedHours < 1 || estimatedHours > 12) {
        return res.status(400).json({ error: 'Estimated hours must be between 1 and 12' });
    }

    const { data: squad, error: squadError } = await supabase
        .from('Squads')
        .select('*')
        .eq('id', squadId)
        .single();

    if (squadError) {
        return res.status(404).json({ error: 'Squad not found' });
    }

    const { data, error } = await supabase
        .from('Employees')
        .insert([{ name, estimatedHours, squadId }]);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(201).json({ message: 'Employee created successfully', employee: data });
};