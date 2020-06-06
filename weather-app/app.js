const request = require('postman-request')

const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoiam9yZ2Vzb3V6YSIsImEiOiJja2I0MnI3dHkwamx5MnlwaGlia3MxcDFkIn0.nsbaIKgkZNkkiKyPScG9bA'

request({url: geocodeUrl, json: true}, (error, response) => {
  if (error) {
    console.log('Unable to connect to the service')
  } else if (response.body.error) {
    console.log('Something wrong happened')
  } else {
    const latitude = response.body.features[0].center[1]
    const longtude = response.body.features[0].center[0]
  }
})


const url = 'http://api.weatherstack.com/current?access_key=325c5804a12dd64f1f1529b092136fbb&query=40.7143528,-74.0059731'

request({url, json: true}, (error, response) => {
  if (error) {
    console.log('Unable to connect to the service')
  } else if (response.body.error) {
    console.log('Something wrong happened')
  } else {
    console.log(`Temperature: ${response.body.current.temperature}`)
    console.log(`Feels like: ${response.body.current.feelslike}`)
  }
})