const request = require('request')

const forecast = (latitude,longitude,  callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8cbc93ad37db0f6fcdb0632f5eec9e29&query='+ latitude +','+ longitude +'&units=f'
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback("unable to connect to the server", undefined)
        } else if (body.error) {
            callback("unable to find location. Try another time!", undefined)
        } else {
            callback(undefined, 
                "The weather is "+ body.current.weather_descriptions[0] +" and the temperature is " + body.current.temperature + " but it feels like " + body.current.feelslike)    
        }
    })
}
module.exports = forecast