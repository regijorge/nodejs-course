const path = require('path')
const express = require('express')

const app = new express()
const publicDir = path.join(__dirname, '../public')

app.use(express.static(publicDir))

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3000, () => {
  console.log('Server is running')
})