#!/usr/bin/node
import express from 'express';
import { getStats, getStatus } from '../controllers/AppController';

const indexRouter = express.Router();

indexRouter.get('/status', getStatus);
indexRouter.get('/stats', getStats);

export default indexRouter;
