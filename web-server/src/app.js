const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const publicDirPath = path.join(__dirname, '../public')
const viewsDirPath = path.join(__dirname, '../templates/views')
const partialsDIrPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsDirPath)
hbs.registerPartials(partialsDIrPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Homepage',
    name: 'Jorge Souza'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
      title: 'About Me',
      name: 'Jorge Souza'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
      helpText: 'This is some helpful text.',
      title: 'Help',
      name: 'Jorge Souza'
  })
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