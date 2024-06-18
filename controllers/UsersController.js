#!/usr/bin/node
import sha1 from 'sha1';
import dbClient from '../utils/db';

export default class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ error: 'Missing email' });
    if (!password) return res.status(400).json({ error: 'Missing password' });
    const { database } = dbClient;
    const user = await dbClient.client.db(database).collection('users').findOne({ email });
    if (user) return res.status(400).json({ error: 'Already exist' });
    const sha1Password = sha1(password);
    const newUser = await dbClient.client.db().collection('users')
      .insertOne({ email, password: sha1Password });

    return res.status(201).json({ id: newUser.insertedId, email });
  }
}
