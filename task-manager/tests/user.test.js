const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/User')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
  _id: userOneId,
  name: 'Regi Oliveira',
  email: 'a@b.com',
  password: 'abc#123!',
  tokens: [{
    token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
  }]
}

beforeEach(async () => {
  await User.deleteMany()
  await new User(userOne).save()
})

test('Should sign up a new user', async () => {
  await request(app).post('/users').send({
    name: 'Jorge Souza',
    email: 'test@test.com',
    password: 'ABC123def#'
  }).expect(201)
})

test('Should login exising user', async () => {
  await request(app).post('/users/login').send({
    email: userOne.email,
    password: userOne.password
  }).expect(200)
})

test('Should not login unexising user', async () => {
  await request(app).post('/users/login').send({
    email: 'anyemail@test.com',
    password: 'fowifjwofjwojf'
  }).expect(400)
})

test('Should get user profile', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should not get non logged in user profile', async () => {
  await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

test('Should delete account for user', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should not delete account for non authorized user', async () => {
  await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})