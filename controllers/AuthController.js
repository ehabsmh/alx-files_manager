#!/usr/bin/node
import sha1 from 'sha1';
import { v4 as uuidv4 } from 'uuid';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

export default class AuthController {
  static async getConnect(req, res) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });
    const b64String = authHeader.split(' ')[1];
    const decoded = Buffer.from(b64String, 'base64').toString();
    const [email, password] = decoded.split(':');
    const sha1Password = sha1(password);
    const user = await dbClient.client.db().collection('users')
      .findOne({ email, sha1Password });
    console.log(user);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    const token = uuidv4();
    console.log(token);
    const key = `auth_${token}`;
    const oneDay = 60 * 60 * 24;
    redisClient.set(key, user._id.toString('utf-8'), oneDay);
    return res.status(200).json({ token });
  }

  static async getDisconnect(req, res) {
    const token = req.headers['X-Token'];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    await redisClient.del(`auth_${token}`);
    return res.status(204).end();
  }
}
