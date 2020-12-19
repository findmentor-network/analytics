// This file is wrap for future DB connections
const {fixProtocol} = require('./utils')
const MongoClient = require('mongodb').MongoClient

// config
const URI = 'mongo_uri_here'

// connects to db
async function connect() {
  const client = await MongoClient.connect(URI, { useUnifiedTopology: true })
  return client.db('find-mentor')
}

const add = async (data) => {
  const { host, pathname } = new URL(fixProtocol(data.href));

  const db = await connect()
  const hosts = db.collection('hosts')
  const host_exists = await hosts.findOne({ host })

  if (host_exists)
    await hosts.updateOne({ host }, { $push: { pathname: data } })
  else
    hosts.insertOne({ host, pathname: [data] })
};

const get = async (url) => {
  const { host, pathname } = new URL(fixProtocol(url));

  const db = await connect()
  const host_object = await db.collection('hosts').findOne({ host })

  return host_object ? host_object.pathname : []
};

const count = async (url) => {
  const data = await get(url)
  console.log(data)
  return data ? data.length : 0
};

const all = async () => {
  const db = await connect()
  const hosts = await db.collection('hosts').find({})
  return hosts
};

module.exports = {add, get, count, all}
