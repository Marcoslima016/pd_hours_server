import express from 'express';
import { createSquad } from '../controllers/squadController';

const router = express.Router();

router.post('/squad', createSquad);

export default router;