import request from 'postman-request'

const getWeather = (location, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=be143e13b4a972ad9bafca533a485a01&query=' + location.lat + ',' + location.long

    request({ url: url, json: true }, (err, res) => {
        if (err) {
            callback('error', undefined)
        } else if (res.body.success === false) {
            callback(res.body.error.type, undefined)
        } else {
            const data = {
                temp: res.body.current.temperature,
                desc: res.body.current.weather_descriptions,
                place: res.body.location.region
            }
            callback(undefined, data)
        }
    })
}

export { getWeather }