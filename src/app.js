const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Node provides __direname and 'Path' module for working with file and 
// directory paths.  This will switch from src directory to public directory
console.log(path.join(__dirname, '../public'));

// 'express' is not an object, it is a function
// call the function to create the express application
const app = express();

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// This is what sets up handlebars for use in express to create
// dynamic templates, as well as the handlebars view and partials location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// app.use is a way to customize the server
// 'static' is only good for static web pages that do not change
app.use(express.static(publicDirectoryPath));

// Website has routes, e.g.:
// - app.com
// - app.com/help
// - app.com/about
// 'get' configures what the server should do when someone tries to access
// a resource at a url: send back json, html, etc.
// No path needed for root app.com if index.html is set up

app.get('', (request, response) => {
    // render lets you render one of your handlebar files
    response.render("index", {
           title: "Weather App",
           name: "Cynthia",
        });
});
app.get('/about', (request, response) => {
    // render lets you render one of your handlebar files
    response.render("about", {
           title: "About Me",
           name: "Cynthia",
        });
});
app.get('/help', (request, response) => {
    response.render("help", {
           title: "FAQ",
           name: "Cynthia",
           message: "This is where you get help",
        });
});
app.get('/weather', (request, response) => {
    // Make sure "city" was provided
    if (!request.query.city) {
        return response.send({
            error: "You must provide a city"
        });
    }
    geocode(request.query.city, 
           (error, { latitude, longitude, location } = {} ) => {
       if (error) {
           return response.send({ error: error + " " + location, });
       }
       forecast(latitude, longitude, (error, forecastdata) => {
           if (error) {
               return response.send({ error: error, });
           }
           // if we had named this variable in the forecast definition as
           // simply 'data', it would have hidden the 'data' from the geocode
           // definition
           response.send({
              forecast: forecastdata,
              location,
              city: request.query.city,
           });
        });
     });
});


app.get('/products', (request, response) => {
     // Make sure "search" was used
     if (!request.query.search) {
        return response.send({
           error: "You must provide a search term"
        });
     }
     console.log(request.query);
     console.log(request.query.search);
      response.send({
       products: []
     });
});

// Error handling for anything that doesn't match under the help
// to get categories such as help articles
app.get('/help/*', (request, response) => {
    response.render("404", {
           title: "Error",
           name: "Cynthia",
           errorMessage: "Help article not found.",
        });
});

// Catch-all error handling - must be last
app.get('*', (request, response) => {
    response.render("404", {
           title: "Error",
           name: "Cynthia",
           errorMessage: "Page not found.",
        });
});

// start the server; common development port is 3000; callback function is
// called when the server has started
app.listen(3000, () => {
     console.log('server is up on port 3000');
});
