const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/User')

const userOne = {
  name: 'Regi Oliveira',
  email: 'a@b.com',
  password: 'abc#123!'
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