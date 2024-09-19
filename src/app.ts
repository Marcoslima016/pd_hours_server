import express from 'express';
import bodyParser from 'body-parser';
import squadRoutes from './routes/squadRoutes';
import employeeRoutes from './routes/employeeRoutes';

const app = express();

app.use(bodyParser.json());

// Rotas
app.use(squadRoutes);
app.use(employeeRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});