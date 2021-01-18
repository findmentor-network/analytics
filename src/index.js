const express = require('express');
const { connect } = require('./broker');
const db = require('./db');

const app = express();
const routes = require('./router');

const port = process.env.PORT || 5000;
const host = process.env.HOST || '0.0.0.0';

app.use(require('cors')());

app.use(express.text());
app.use(routes);

db.connect().then((_) => {
  console.log('DB opened');
});

connect().then(() => {
  app.listen(port, host, () => {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify({ message: `Analytx server started at ${host}:${port}` }));
  });
});
