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
  const response = await request(app).post('/users').send({
    name: 'Jorge Souza',
    email: 'test@test.com',
    password: 'ABC123def#'
  }).expect(201)

  const user = await User.findById(response.body.user._id)

  expect(response.body).toMatchObject({
    user: {
      name: 'Jorge Souza',
      email: 'test@test.com'
    },
    token: user.tokens[0].token
  })
  expect(user).not.toBeNull()
  expect(user.password).not.toBe('ABC123def#s')
})

test('Should login exising user', async () => {
  const response = await request(app).post('/users/login').send({
    email: userOne.email,
    password: userOne.password
  }).expect(200)

  const user = await User.findById(userOneId)
  expect(response.body.token).toBe(user.tokens[1].token)
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

test('Should upload user avatar', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/picture.jpg')
    .expect(200)

  const user = await User.findById(userOneId)
  expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: 'Regi Jorge'
    })
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Regi Jorge')
})

test('Should not update invalid user fields', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      country: 'Brazil'
    })
    .expect(400)
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

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete account for non authorized user', async () => {
  await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})