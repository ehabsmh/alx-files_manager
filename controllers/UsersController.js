#!/usr/bin/node
import sha1 from 'sha1';
import dbClient from '../utils/db';

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
    const token = req.headers['X-Token'];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    const user = await dbClient.client.db().collection('users')
      .findOne({ _id: dbClient.client.getObjectId(token) });
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    delete user.password;
    return res.status(200).json(user);
  }
}

module.exports = UsersController;
