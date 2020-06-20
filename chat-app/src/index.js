const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = new express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDir = path.join(__dirname, '../public')

app.use(express.static(publicDir))

app.get('/', (req, res) => {
  res.send('Hello World')
})

io.on('connection', () => {
  console.log('Socket io is connected')
})

server.listen(port, () => {
  console.log('Server is running')
})