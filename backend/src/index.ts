import  express  from "express";
import cors from "cors";
import { PrismaClient } from '@prisma/client';

// Importing routes
import authRoute from './routes/authRoute';
import setupSwagger from "./swagger";

export const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(cors())

// Routers

//? Auth route
const api = "/api/v1";
app.use(api+'/auth', authRoute);

// Setup Swagger
setupSwagger(app);



app.listen(3000, () => {
    console.log("Server is running on port 3000");
}   )