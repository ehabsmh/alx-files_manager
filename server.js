#!/usr/bin/node
import express from 'express';
import indexRouter from './routes';

const app = express();
const port = process.env.PORT || 5000;

app.use(indexRouter);

app.listen(port);
