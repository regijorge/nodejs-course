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

  db.collection('users').deleteMany({
    age: 27
  }).then(result => {
    console.log(`${result.result.n} found and ${result.deletedCount} removed.`)
  }).catch(error => {
    console.log(error)
  })

  db.collection('tasks').deleteOne({
    _id: ObjectID("5ee4d330d7bd1627ebe10c63")
  }).then(result => {
    console.log(`${result.result.n} found and ${result.deletedCount} removed.`)
  }).catch(error => {
    console.log(error)
  })

})
