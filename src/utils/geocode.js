const request = require('request');

const geocode = (address, callback) => {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiY2ZyZWVkbWFuIiwiYSI6ImNrcTEyeXVuMzBhdnIycHFibm02cWhhY3IifQ.2oEdHp6bmrNg1aGR-POuNg&limit=1";

    request({url, json:true, }, (error, { body }) => {
        if (error) {
            // 'undefined' is optional since it's at the end
            callback("Unable to connect to geocoding service", undefined);
        } else if (body.features.length === 0) {
            callback("Unable to find location", undefined);
        } else {
            const location = body.features[0];
            callback(undefined, {
                latitude: location.center[1],
                longitude: location.center[0],
                location: location.place_name,
              } );
        }
     } );
};

module.exports = geocode;
