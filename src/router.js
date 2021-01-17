const router = require('express').Router();
const {
  count, add, total,
} = require('./db');
const { getHREF } = require('./utils');

router.get('/c/*', async (req, res) => {
  console.log(req.headers);
  console.log(req.rawListeners);
  res.json({ count: await count(getHREF(req)) });
});

router.get('/total/*', async (req, res) => {
  res.json({ count: await total(getHREF(req)) });
});

router.post('/', (req, res) => {
  const userAgent = req.headers['user-agent'];
  const country = req.headers['cf-ipcountry'];
  const ip = req.headers['cf-connecting-ip'];

  const body = JSON.parse(req.body);

  body.ip = ip;
  body.userAgent = userAgent;
  body.country = country;

  add(body);
  res.sendStatus(200);
});

module.exports = router;
