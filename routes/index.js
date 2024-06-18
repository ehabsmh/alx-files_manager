#!/usr/bin/node
import express from 'express';
import { stats, status } from '../controllers/AppController';

const indexRouter = express.Router();

indexRouter.get('/status', status);
indexRouter.get('/stats', stats);

export default indexRouter;
