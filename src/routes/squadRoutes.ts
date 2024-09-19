import express from 'express';
import { createSquad, getAllSquads } from '../controllers/squadController';

const router = express.Router();

router.post('/squad', createSquad);

router.get('/squads', getAllSquads);

export default router;