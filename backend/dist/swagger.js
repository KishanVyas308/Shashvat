"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
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
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const setupSwagger = (app) => {
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
};
exports.default = setupSwagger;
