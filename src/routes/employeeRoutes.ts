import express from 'express';
import { createEmployee } from '../controllers/employeeController';

const router = express.Router();

router.post('/employee', createEmployee);

export default router;