const express = require('express')

const app = express()

app.get('', (req, res) => {
  res.send('Hello express!')
})

app.get('/help', (req, res) => {
  res.send('Help page')
})

app.get('/about', (req, res) => {
  res.send('<h1>About page</h1>')
})

app.get('/weather', (req, res) => {
  res.send({
    forecast: '17',
    location: 'Brazil'
  })
})

app.listen(3000, () => {
  console.log('Server is up and running on http://localhost:3000')
})