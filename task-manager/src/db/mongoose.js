const mongoose = require('mongoose')
const validator = require('validator')
require('dotenv').config()

const connectionURL = process.env.MONGODB_URI

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password can not contain "password"')
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number')
      }
    }
  }
})

const me = new User({
  name: ' Jorge Souza ',
  email: 'JORJAO@GMAIL.COM',
  password: ' ABCdefg '
})

// me.save().then(() => {
//   console.log(me)
// }).catch(error => {
//   console.log(error)
// })

const Task = mongoose.model('Task', {
  descripton: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
})

const myTask = new Task({
  descripton: 'Clean the house',
})

myTask.save().then(() => {
  console.log(myTask)
}).catch(error => {
  console.log(error)
})