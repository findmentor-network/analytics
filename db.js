// This file is wrap for future DB connections
const {fixProtocol} = require('./utils')

const db = {}

const add = (data) => {
  // mongodb add
  const { host, pathname } = new URL(fixProtocol(data.href));
  
  if (db[host]) {
    if (db[host][pathname]) {
      db[host][pathname].push(data);
    } else {
      db[host][pathname] = [];
      db[host][pathname].push(data);
    }
  } else {
    db[host] = {};
    db[host][pathname] = [];
    db[host][pathname].push(data);
  }
};

const get = (url) => {
  // mongodb get
  const { host, pathname } = new URL(fixProtocol(url));
  if (db[host] && db[host][pathname]) {
    return db[host][pathname];
  } else {
    return;
  }
};

const count = (url) => {
  return get(url) ? get(url).length : 0;
};

const all = () => db;

module.exports = {add, get, count, all}