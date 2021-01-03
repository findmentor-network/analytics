const { MongoClient } = require('mongodb');
const { fixProtocol } = require('./utils');

let client; let
  db;

// connects to db
async function connect() {
  const URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
  client = await MongoClient.connect(URI, { useUnifiedTopology: true });
  db = client.db('analytics');
}

const add = (data) => {
  const { host, pathname } = new URL(fixProtocol(data.href));

  const hosts = db.collection(host);
  hosts.insertOne({
    pathname,
    ...data,
  });
};

const count = (url) => {
  const { host, pathname } = new URL(fixProtocol(url));
  return db.collection(host).find({ pathname }).count();
};

const total = (url) => {
  const { host } = new URL(fixProtocol(url));
  return db.collection(host).find({ }).count();
};

module.exports = {
  connect, add, count, total,
};
