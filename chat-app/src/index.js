const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')

const app = new express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDir = path.join(__dirname, '../public')

app.use(express.static(publicDir))

app.get('/', (req, res) => {
  res.send('Hello World')
})

io.on('connection', socket => {
  console.log('Socket io is connected')

  socket.emit('message', 'Welcome to the jango!')
  socket.broadcast.emit('message', 'A new user has joined!')

  socket.on('sendMessage', (message, callback) => {
    const filter = new Filter()

    if (filter.isProfane(message)) {
      return callback('Profane is not allowed')
    }

    io.emit('message', message)
    callback()
  })

  socket.on('sendLocation', (location, callback) => {
    io.emit('message', `Location: https://google.com/maps?q=${location.lat},${location.long}`)
    callback()
  })

  socket.on('disconnect', () => {
    io.emit('message', 'A user has left')
  })
})

server.listen(port, () => {
  console.log('Server is running')
})