import express from 'express';
import mongoose from 'mongoose';
import path from 'node:path';

import { router } from './routes';

mongoose.connect('mongodb://localhost:27017')
  .then(() => {
    const app = express();
    const port = 3001;

    app.use(express.json());
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(router);

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });

  })
  .catch(() => console.log('erro ao conectar com o mongo'));


