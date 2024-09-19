import { Request, Response } from 'express';
import { supabase } from '../services/supabaseClient';

export const createSquad = async (req: Request, res: Response) => {
    const { name } = req.body;

    console.log("CREATE SQUAD!");

    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    const { data, error } = await supabase
        .from('Squads')
        .insert([{ name }]);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(201).json({ message: 'Squad created successfully', squad: data });
};