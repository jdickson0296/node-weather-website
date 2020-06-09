const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e2c27d6c4ca0ec3a70e4e8df328483fb&query=' + 
    latitude + ',' + longitude + '&units=f'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        }

        else if (body.error) {
            callback('Unable to find location', undefined)
        }

        else {
            callback(undefined, body.current.weather_descriptions[0] + ' with a humidity of ' + body.current.humidity + '. It is currently ' + 
            body.current.temperature + ' degrees out. ' + 'It feels like ' + body.current.feelslike)
        }
    })

}

module.exports = forecast