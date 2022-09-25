import request from 'postman-request'

const getCoordinates = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=1d400e8b77ddd0aeba449044b4ff7ab5&query=' + address + '&limit=1'

    request({ url: url, json: true }, (err, res) => {
        if (err) {
            callback('Error!', undefined)
        } else if (!res.body.data) {
            callback('Not a valid location!', undefined)
        } else {
            const { latitude:lat, longitude:long, label:place } = res.body.data[0] // destructuring
            callback(undefined, { lat, long, place })
        }
    })
}

export { getCoordinates }