const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const {getHREF} = require('./utils')
const {all, get, count, add} = require('./db')
const cors = require("cors");
app.use(cors());
app.use(express.json())
app.use(express.static("docs"));

app.get("/", async(req, res) => res.json(await all()));

app.get("/a/*", async (req, res) => {
  const data = await get(getHREF(req));
  if (!data) {
    res.status(404).json({status: 404, message: 'This entry does not exists.'})
  }
  res.json(data);
});

app.get("/c/*", async (req, res) => res.json({count: await count(getHREF(req))}));

app.post('/', async (req, res) => {
  // req.body must be includes {href: 'http://localhost:3000'} like object.
  await add(req.body);
  res.sendStatus(200)
})

app.listen(port, _ => console.log(`Example app listening at http://localhost:${port}`))