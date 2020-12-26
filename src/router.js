const router = require('express').Router()
const { all, get, count, add } = require('./db')
const { getHREF } = require('./utils')

router.get('/', async (req, res) => {
  res.json(await all())
})

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

router.post('/', async (req, res) => {
  // req.body must be includes {href: 'http://localhost:3000'} like object.
  add(req.body)
  res.sendStatus(200)
})

module.exports = router
