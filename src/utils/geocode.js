const request = require('request')

const geocode = (location, callback) => {
    const geo_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + 
    '.json?access_token=pk.eyJ1IjoiamRpY2tzb24wMjk2IiwiYSI6ImNrYXBvaXlnNTJneGsydHMwdGo0NGd0M3AifQ.ofkIkAeruu69x0I7ssQPPQ&limit=1'

    request({url: geo_url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined) 
        }

        else if (body.features.length === 0) {
            callback('No location found', undefined)
        }

        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                place_name: body.features[0].place_name
            })
        }

    })
}

module.exports = geocode