import express from 'express';
import { createEmployee, getAllEmployees } from '../controllers/employeeController';

const router = express.Router();

router.post('/employee', createEmployee);

router.get('/employees', getAllEmployees);

export default router;