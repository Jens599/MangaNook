import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';

import dotenv from 'dotenv';
import User from '../model/user.model';
dotenv.config();

const createToken = (_id: ObjectId) => {
  if (!process.env.SECRET) throw new Error('Secret Not Defined');

  const token = jwt.sign({ _id }, process.env.SECRET, { expiresIn: '7d' });
  return token;
};

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.signup(name, email, password);
    const token = createToken(user._id as ObjectId);
    res.status(200).json({ email, token });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id as ObjectId);

    res.status(200).json({ email, token });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
