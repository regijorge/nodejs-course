const mongodb = require('mongodb')
require('dotenv').config()

const MongodbClient = mongodb.MongoClient

const connectionURL = process.env.MONGODB_URI

MongodbClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    console.log('Unable to connect to database')
    return
  }

  console.log('Connected to database!')

  const db = client.db()

  db.collection('users').insertOne({
    name: 'Jorge Souza',
    age: 27
  })
})
