"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authTokenMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authTokenMiddleware = (req, res, next) => {
    const authToken = req.headers['x-auth-token'];
    if (authToken) {
        try {
            const decoded = jsonwebtoken_1.default.verify(authToken, process.env.JWT_SECRET);
            req.user = decoded; // Attach the decoded token payload to the request object
            next();
        }
        catch (err) {
            res.status(403).json({ message: 'Invalid or expired token' });
        }
    }
    else {
        res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
};
exports.authTokenMiddleware = authTokenMiddleware;
