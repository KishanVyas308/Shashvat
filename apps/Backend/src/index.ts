import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

// Importing routes
import authRoute from './routes/authRoute';
import productRoute from './routes/productRoute';
import requirementRoute from './routes/requirementRoute';
import setupSwagger from './swagger';

export const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(cors());

// Routers
const api = '/api/v1';
app.use(api + '/auth', authRoute);
app.use(api + '/products', productRoute);
app.use(api + '/requirements', requirementRoute);

// Setup Swagger
setupSwagger(app);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});