const mongoose = require('mongoose')
require('dotenv').config()

const connectionURL = process.env.MONGODB_URI

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true
})

const User = mongoose.model('User', {
  name: {
    type: String
  },
  age: {
    type: Number
  }
})

const me = new User({
  name: 'Jorge Souza',
  age: 27
})

// me.save().then(() => {
//   console.log(me)
// }).catch(error => {
//   console.log(error)
// })

const Task = mongoose.model('Task', {
  descripton: {
    type: String
  },
  completed: {
    type: Boolean
  }
})

const myTask = new Task({
  descripton: 'Clean the house',
  completed: false
})

// myTask.save().then(() => {
//   console.log(myTask)
// }).catch(error => {
//   console.log(error)
// })