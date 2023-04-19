import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import path from 'path';
import { Server } from 'socket.io';

import { router } from './routes';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const server = http.createServer(app);
export const io = new Server(server);


const mongoUrl = process.env.MONGO_URI || 'mongodb://api-db:27017/myapp';
console.log(mongoUrl);
mongoose.connect(mongoUrl)
  .then(() => {
    const port = 5000;

    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');
      next();
    });
    app.use(express.json());
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(router);

    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });

  })
  .catch(() => console.log('erro ao conectar com o mongo', process.env.MONGO_URI));


