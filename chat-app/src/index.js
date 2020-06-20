const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')

const app = new express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDir = path.join(__dirname, '../public')

app.use(express.static(publicDir))

io.on('connection', socket => {
  console.log('Socket io is connected')

  socket.on('join', ({ username, room }) => {
    socket.join(room)

    socket.emit('message', generateMessage('Welcome!'))
    socket.broadcast.to(room).emit('message', generateMessage(`${username} has joined!`))
  })

  socket.on('sendMessage', (message, callback) => {
    const filter = new Filter()

    if (filter.isProfane(message)) {
      return callback('Profane is not allowed')
    }

    io.emit('message', generateMessage(message))
    callback()
  })

  socket.on('sendLocation', (location, callback) => {
    io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${location.lat},${location.long}`))
    callback()
  })

  socket.on('disconnect', () => {
    io.emit('message', generateMessage('A user has left'))
  })
})

server.listen(port, () => {
  console.log('Server is running')
})