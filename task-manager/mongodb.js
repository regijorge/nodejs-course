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
  }, (error, result) => {
    if (error) {
      return console.log(`Unable to insert User: ${error}`)
    }

    console.log(result.ops)
  })

  db.collection('users').insertMany([
    {
      name: 'Carlucho',
      age: 35
    }, {
      name: 'Luíz Pinguço',
      age: 72
    }
  ], (error, result) => {
    if (error) {
      return console.log('Unabel to insert documents!')
    }

    console.log(result.ops)
  })

  db.collection('tasks').insertMany([
    {
      description: 'Clean the house',
      completed: false
    }, {
      description: 'Study nodejs course',
      completed: false
    }, {
      description: 'Buy food',
      completed: true
    }
  ], (error, result) => {
    if (error) {
      return console.log('Unable to insert tasks')
    }

    console.log(result.ops)
  })
})
