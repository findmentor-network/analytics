const broker = require('./broker');
const db = require('./db');

Promise.all([
  broker.connect(),
  db.connect(),
])
  .then(() => {
    broker.consume((data) => {
      // Business Logic
      console.log('Received new message', data);
      db.add(data);
    });
  });
