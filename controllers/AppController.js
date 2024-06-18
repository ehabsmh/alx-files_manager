#!/usr/bin/node
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

export const status = (req, res) => {
  res.json({ redis: redisClient.isAlive(), db: dbClient.isAlive() });
};

export const stats = async (req, res) => {
  const usersCount = await dbClient.nbUsers();
  const filesCount = await dbClient.nbFiles();

  res.json({ users: usersCount, files: filesCount });
};
