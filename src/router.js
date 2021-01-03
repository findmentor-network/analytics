const router = require('express').Router();
const {
  count, add, total,
} = require('./db');
const { getHREF } = require('./utils');

router.get('/c/*', async (req, res) => {
  res.json({ count: await count(getHREF(req)) });
});

router.get('/total/*', async (req, res) => {
  res.json({ count: await total(getHREF(req)) });
});

router.post('/', (req, res) => {
  add(JSON.parse(req.body));
  res.sendStatus(200);
});

module.exports = router;
