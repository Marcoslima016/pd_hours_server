import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

export class SupabaseClientController {

    private static instance: SupabaseClientController;

    private constructor() { }

    public static getInstance(): SupabaseClientController {
        if (!SupabaseClientController.instance) {
            SupabaseClientController.instance = new SupabaseClientController();
        }
        return SupabaseClientController.instance;
    }

    supabaseUrl: string = process.env.SUPABASE_URL || '';
    supabaseKey: string = process.env.SUPABASE_KEY || '';

    client?: any;

    async init() {
        try {
            this.client = createClient(this.supabaseUrl, this.supabaseKey);
        } catch (e) {
            console.log("FALHA AO INICIALIZAR O CLIENT SUPABASE!");
        }
    }

}

// dotenv.config();

// const supabaseUrl = process.env.SUPABASE_URL || '';
// const supabaseKey = process.env.SUPABASE_KEY || '';
// export const supabase = createClient(supabaseUrl, supabaseKey);

export const supabase = SupabaseClientController.getInstance().client!;