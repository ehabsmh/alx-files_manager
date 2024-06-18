#!/usr/bin/node
import express from 'express';
import UsersController from '../controllers/UsersController';
import AppController from '../controllers/AppController';

const indexRouter = express.Router();

indexRouter.get('/status', AppController.getStatus);
indexRouter.get('/stats', AppController.getStats);
indexRouter.post('/users', UsersController.postNew);

export default indexRouter;
