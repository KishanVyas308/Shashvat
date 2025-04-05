// filepath: /d:/All-Project/Freelance/Shasvat - final/backend/src/controller/authController.ts
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { prisma } from '../index';
import jwt from "jsonwebtoken"

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

const register = async (req: any, res: any) => {
  const { name, address, contactNo, whatsAppNo, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists. Please login.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
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
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
};

const login = async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'User not found. Please register.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', user, token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
};

export { register, login };