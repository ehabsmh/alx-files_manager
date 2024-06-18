#!/usr/bin/node
import sha1 from 'sha1';
import { ObjectID } from 'mongodb';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

export default class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ error: 'Missing email' });
    if (!password) return res.status(400).json({ error: 'Missing password' });
    const user = await dbClient.client.db().collection('users').findOne({ email });
    if (user) return res.status(400).json({ error: 'Already exist' });
    const sha1Password = sha1(password);
    const newUser = await dbClient.client.db().collection('users')
      .insertOne({ email, password: sha1Password });

    return res.status(201).json({ id: newUser.insertedId, email });
  }

  static async getMe(req, res) {
    const token = req.header('X-Token');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    const key = `auth_${token}`;
    console.log(key);
    const userId = await redisClient.get(key);
    console.log(userId);
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    const objId = new ObjectID(userId);
    const user = await dbClient.client.db().collection('users')
      .findOne({ _id: objId });
    console.log(user);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    delete user.password;
    return res.status(200).json(user);
  }
}

module.exports = UsersController;
