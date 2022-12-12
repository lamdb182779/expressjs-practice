const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = 3000
const route = require('./routes/route.js')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
route(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})