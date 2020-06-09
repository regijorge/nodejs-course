const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

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
  const address = req.query.address

  if (!address) {
    return res.send({
      error: 'You must provide an address!'
    })
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({error})
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({error})
      }

      res.send({
        forecast: forecastData,
        location,
        address
      })
    })
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Jorge Souza',
    errorMessage: 'Page not found'
  })
})

app.listen(3000, () => {
  console.log('Server is up and running on http://localhost:3000')
})