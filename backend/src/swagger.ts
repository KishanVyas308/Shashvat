import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { url } from 'inspector';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Shasvat API',
      version: '1.0.0',
      description: 'API documentation for Shasvat project',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
      },
      {
        url: 'https://api.shashvatenterprise.com/api/v1'
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controller/*.ts'], // files containing annotations as above
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;