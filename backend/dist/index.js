"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
// Importing routes
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const productRoute_1 = __importDefault(require("./routes/productRoute"));
const swagger_1 = __importDefault(require("./swagger"));
exports.prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routers
const api = '/api/v1';
app.use(api + '/auth', authRoute_1.default);
app.use(api + '/products', productRoute_1.default);
// Setup Swagger
(0, swagger_1.default)(app);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
