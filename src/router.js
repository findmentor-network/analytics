const router = require('express').Router()
const { all, get, count, add } = require('./db')
const { getHREF } = require('./utils')

router.get('/a/*', async (req, res) => {
  const data = await get(getHREF(req))
  if (!data) {
    res.status(404).json({ status: 404, message: 'This entry does not exists.' })
  }
  res.json(data)
})

router.get('/c/*', async (req, res) => {
  res.json({ count: await count(getHREF(req)) })
})

router.post('/', (req, res) => {
  add(JSON.parse(req.body))
  res.sendStatus(200)
})

router.get('/*', async (req, res) => {
  const data = await all(getHREF(req))
  res.json(data)
})

module.exports = router
