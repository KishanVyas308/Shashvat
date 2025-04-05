import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import path from 'path';

// Importing routes
import authRoute from './routes/authRoute';
import productRoute from './routes/productRoute';
import requirementRoute from './routes/requirementRoute';
import reviewRoute from './routes/reviewRoute';
import setupSwagger from './swagger';

export const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(cors());

// Serve static files for uploaded images
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routers
const api = '/api/v1';
app.use(api + '/auth', authRoute);
app.use(api + '/products', productRoute);
app.use(api + '/requirements', requirementRoute);
app.use(api + '/reviews', reviewRoute); 

// Setup Swagger
setupSwagger(app);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});