#!/usr/bin/node

const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    const dbUrl = `mongodb://${host}:${port}/${this.database}`;
    this.connected = false;
    this.client = new MongoClient(dbUrl, { useUnifiedTopology: true });
    this.client.connect().then(() => {
      this.connected = true;
    }).catch((err) => console.log(err.message));
  }

  isAlive() {
    return this.connected;
  }

  async nbUsers() {
    const countUsers = await this.client.db(this.database)
      .collection('users')
      .countDocuments();

    return countUsers;
  }

  async nbFiles() {
    const countFiles = await this.client.db(this.database)
      .collection('files')
      .countDocuments();

    return countFiles;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
