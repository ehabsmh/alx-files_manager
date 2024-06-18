#!/usr/bin/node
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController {
  static getStatus(req, res) {
    res.json({ redis: redisClient.isAlive(), db: dbClient.isAlive() });
  }

  static async getStats(req, res) {
    const usersCount = await dbClient.nbUsers();
    const filesCount = await dbClient.nbFiles();

    res.json({ users: usersCount, files: filesCount });
  }
}

module.exports = AppController;
