const express = require('express')
require('./db/mongoose')
const User = require('./models/User')
const Task = require('./models/Task')

const app = new express()
const port = process.env.PORT || 3000

app.use(express.json())


app.listen(port, () => {
  console.log(`Server is up on port: ${port}`)
})