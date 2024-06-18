#!/usr/bin/node
import express from 'express';
import { getStats, getStatus } from '../controllers/AppController';
import UsersController from '../controllers/UsersController';

const indexRouter = express.Router();

indexRouter.get('/status', getStatus);
indexRouter.get('/stats', getStats);
indexRouter.post('/users', UsersController.postNew);

export default indexRouter;
