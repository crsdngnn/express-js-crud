import express from 'express';
import bodyParser from 'body-parser';
import { mongoose } from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import { MONGO_URI } from '../src/configs/config.js';

const app = express();
const apiRouter = express.Router();

app.use(express.json());
app.use(bodyParser.json());

apiRouter.use('/users', userRoutes);

app.use('/api', apiRouter);

mongoose.connect(MONGO_URI);

export default app;
