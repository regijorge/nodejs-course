const { MongoClient, ObjectID } = require('mongodb')
require('dotenv').config()

const connectionURL = process.env.MONGODB_URI

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    console.log('Unable to connect to database')
    return
  }

  console.log('Connected to database!')

  const db = client.db()

  db.collection('users').updateOne({
    _id: new ObjectID("5ee030693cecc7097fabc4a0")
  }, {
    $set: {
      name: 'Regi Oliveira'
    },
    $inc: {
      age: 1
    }
  }).then(result => {
    console.log(result)
  }).catch(error => {
    console.log(error)
  })

  db.collection('tasks').updateMany({
    completed: false
  }, {
    $set: {
      completed: true
    }
  }).then(result => {
    console.log(result)
  }).catch(error => {
    console.log(error)
  })

})
