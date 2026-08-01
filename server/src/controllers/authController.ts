import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: passwordHash });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'development_secret', {
      expiresIn: '7d',
    });

    return res.status(201).json({ token, user: { id: user._id, name, email } });
  } catch (error) {
    return res.status(500).json({ message: 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'development_secret', {
      expiresIn: '7d',
    });

    return res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    return res.status(500).json({ message: 'Login failed' });
  }
};

export const getProfile = async (req: any, res: Response) => {
  const user = await User.findById(req.user.id).select('-password');
  return res.status(200).json({ user });
};

export const updateProfile = async (req: any, res: Response) => {
  const { name, password } = req.body;
  const update: any = {};

  if (name) update.name = name;
  if (password) update.password = await bcrypt.hash(password, 10);

  const user = await User.findByIdAndUpdate(req.user.id, update, { new: true }).select('-password');
  return res.status(200).json({ user });
};
