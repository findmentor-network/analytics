const { fixProtocol } = require('./utils')
const MongoClient = require('mongodb').MongoClient

let client, db

// connects to db
async function connect () {
  const URI = process.env.MONGO_URI || 'mongodb://localhost:27017'
  client = await MongoClient.connect(URI, { useUnifiedTopology: true })
  db = client.db('analytics')
}

const add = (data) => {
  const { host, pathname } = new URL(fixProtocol(data.href))

  const hosts = db.collection(host)
  hosts.insertOne({
    pathname,
    ...data
  })
}

const get = async (url) => {
  const { host, pathname } = new URL(fixProtocol(url))
  return db.collection(host).find({ pathname }).toArray()
}

const count = async (url) => {
  const { host, pathname } = new URL(fixProtocol(url))
  return db.collection(host).find({ pathname }).count()
}

const all = async (url) => {
  const { host } = new URL(fixProtocol(url))
  return db.collection(host).find({ }).toArray()
}

module.exports = { connect, add, get, count, all }
