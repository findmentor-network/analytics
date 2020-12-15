// This file is wrap for future DB connections
const {fixProtocol} = require('./utils')

class DB {
  constructor(db) {
    this.db = db;
  }

  add = (data) => {
    // mongodb add
    const { host, pathname } = new URL(fixProtocol(data.href));
    if (this.db[host]) {
      if (this.db[host][pathname]) {
        this.db[host][pathname].push(data);
      } else {
        this.db[host][pathname] = [];
        this.db[host][pathname].push(data);
      }
    } else {
      this.db[host] = {};
      this.db[host][pathname] = [];
      this.db[host][pathname].push(data);
    }
  };

  get = (url) => {
    // mongodb get
    const { host, pathname } = new URL(fixProtocol(url)); 
    return this.db[host]?.[pathname];
  };

  count = (url) => {
    return this.get(url).length
  }

  all = () => this.db
}


module.exports = DB