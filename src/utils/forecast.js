const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/7a0f5300466c00d6681d13312bbac1b8/' + lat + ',' + long + '?units=si&lang=es';

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the weather service');        
        } else if (body.error) {
            callback(body.error);
        } else {
            callback(undefined, (body.currently.summary + '. Actualmente la temperatura es de ' + body.currently.temperature + '°. La máxima es de ' + body.daily.data[0].temperatureHigh + '° la mínima es de ' + body.daily.data[0].temperatureLow + '°.La probabilidad de lluvia es de ' + body.currently.precipProbability + '%. El porcentaje de humedad es de ' + body.currently.humidity + '%'))
        }
    })
}


module.exports = forecast