const request = require('request');

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia21lcnkiLCJhIjoiY2p6cjR5dDllMHhlMTNvcDNqNWNqYjR6ciJ9.82pbwE6UKzawwrrF6vzaXA&limit=1';

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('No se ha encontrado el servicio de localizacion');     
        } else if (body.features.length === 0) {
            callback('No se ha encontrado el lugar buscado')
            //callback(body.error)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                place_name: body.features[0].place_name
            })
        }
    })
}


module.exports = geoCode;