import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import multer from 'multer';
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

//---------CONFIGURATION
dotenv.config();
const app = express();

app.use(helmet());
app.use(morgan('common'));
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

//---------CONNECTING TO DATABASE
app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'page-not-found' });
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(
    app.listen(process.env.PORT_BACKEND, () =>
      console.log(`LISTENING MONGO DB FROM PORT : ${process.env.PORT_BACKEND}`)
    )
  )
  .catch((e) => console.log(`ERROR : ${e}`));
