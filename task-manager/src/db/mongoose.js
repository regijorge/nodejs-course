const mongoose = require('mongoose')
require('dotenv').config()

const connectionURL = process.env.MONGODB_URI

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true
})
