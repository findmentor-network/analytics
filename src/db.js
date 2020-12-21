const {fixProtocol} = require('./utils')
const MongoClient = require('mongodb').MongoClient

let client, db

// connects to db
async function connect() {
  const URI = process.env.MONGO_URI || 'mongodb://localhost:27017/analytics'
  client = await MongoClient.connect(URI, { useUnifiedTopology: true })
  db = client.db('analytics')
}

const add = async (data) => {
  const { host, pathname } = new URL(fixProtocol(data.href));

  const hosts = db.collection('hosts')
  const host_exists = await hosts.findOne({ host })

  if (host_exists)
    await hosts.updateOne({ host }, { $push: { pathname: data } })
  else
    hosts.insertOne({ host, pathname: [data] })
};

const get = async (url) => {
  const { host, pathname } = new URL(fixProtocol(url));
  const host_object = await db.collection('hosts').findOne({ host })
  return host_object ? host_object.pathname : []
};

const count = async (url) => {
  const data = await get(url)
  return data ? data.length : 0
};

const all = async () => {
  const hosts = await db.collection('hosts').find({})
  return hosts
};

module.exports = {connect, add, get, count, all}
