const request = require('request'); 

const forecast = (latitude, longitude, callback) => {

    const url = "http://api.weatherstack.com/current?access_key=df0f654002d63210012ad3c7803f1525&query=" + latitude + "," + longitude + "&units=f";

    request({url, json:true, }, (error, { body }) => {
        if (error) {
            // 'undefined' is optional since it's at the end
            callback("Unable to connect to forecast service", undefined);
        } else if (body.error) {
            callback("Unable to find forecast", undefined);
        } else {
            const weather = body.current;
            callback(undefined, "In " + body.location.name +
               " it is currently " + weather.temperature + 
               " degrees out.  It feels like " + weather.feelslike + 
               " degrees.  There is a " + weather.precip + 
               "% chance of rain.  The humidity is " +
               weather.humidity + "%. "); 
         } 
     } );
};

module.exports = forecast;
