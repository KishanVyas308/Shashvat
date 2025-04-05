"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
// filepath: /d:/All-Project/Freelance/Shasvat - final/backend/src/controller/authController.ts
const bcrypt_1 = __importDefault(require("bcrypt"));
const index_1 = require("../index");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         isAdmin:
 *           type: boolean
 *         address:
 *           type: string
 *         contactNo:
 *           type: string
 *         whatsAppNo:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, address, contactNo, whatsAppNo, email, password } = req.body;
    try {
        const existingUser = yield index_1.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists. Please login.' });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield index_1.prisma.user.create({
            data: {
                name,
                address,
                contactNo,
                whatsAppNo,
                email,
                password: hashedPassword,
                isAdmin: email === 'kishanvyas308@gmail.com',
            },
        });
        res.status(201).json({ message: 'User created successfully', user });
    }
    catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Something went wrong. Please try again.' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield index_1.prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'User not found. Please register.' });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password.' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', user, token });
    }
    catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Something went wrong. Please try again.' });
    }
});
exports.login = login;
