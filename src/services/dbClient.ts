import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL is not set in .env file');
}

export const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false, // Necessário para Supabase em ambientes de produção
    },
});