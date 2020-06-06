const request = require('postman-request')

const url = 'http://api.weatherstack.com/current?access_key=325c5804a12dd64f1f1529b092136fbb&query=40.7143528,-74.0059731'

request({url}, (error, response) => {
  const data = JSON.parse(response.body)
  console.log(data.current)
})