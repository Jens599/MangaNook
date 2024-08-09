import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();

app.use(express.json());

import mongoose, { Error } from 'mongoose';

import userRoutes from '../src/routes/user.routes';

if (!process.env.MONGODBSERVERURI)
  throw new Error('MONGODBSERVERURI environment variable is not set.');

mongoose
  .connect(process.env.MONGODBSERVERURI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`App Listening on PORT:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Failed to Connect to DataBase: ${err}`);
    process.exit(1);
  });

app.use('/user', userRoutes);
