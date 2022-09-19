import express, { json } from 'express';
import chalk from 'chalk'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes/index.js'
import 'express-async-errors'
import errorHandler from './middlewares/errorHandler.js'

dotenv.config()

const server = express();

server.use(cors())
server.use(json());

server.use(router)
server.use(errorHandler);

export default server;