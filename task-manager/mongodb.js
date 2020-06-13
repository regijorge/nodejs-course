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

  // db.collection('users').findOne({ _id: new ObjectID('5ee030693cecc7097fabc4a0') }, (error, user) => {
  //   if (error) {
  //     return console.log('Unable to fetch')
  //   }

  //   console.log(user)
  // })

  // db.collection('users').find({ age: 27 }).toArray((error, users) => {
  //   console.log(users)
  // })

  // db.collection('users').find({ age: 27 }).count((error, count) => {
  //   console.log(count)
  // })

  db.collection('tasks').findOne({ _id: new ObjectID('5ee4d330d7bd1627ebe10c63') }, (error, task) => {
    console.log(task)
  })

  db.collection('tasks').find({ completed: true }).count((error, count) => {
    console.log(count)
  })
})
