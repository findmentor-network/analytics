const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const {getHREF} = require('./utils')
const {all, get, count, add} = require('./db')
const cors = require("cors");
app.use(cors());
app.use(express.json())
app.use(express.static("docs"));

app.get("/", (req, res) => res.json(all()));

app.get("/a/*", (req, res) => {
  const data = get(getHREF(req));
  if (!data) {
    res.status(404).json({status: 404, message: 'This entry does not exists.'})
  }
  res.json(data);
});

app.get("/c/*", (req, res) => res.json({count: count(getHREF(req))}));

app.post('/', (req, res) => {
  // req.body must be includes {href: 'http://localhost:3000'} like object.
  add(req.body);
  res.sendStatus(200)
})

app.listen(port, _ => console.log(`Example app listening at http://localhost:${port}`))