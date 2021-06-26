console.log(" client side js file is loaded");

// select the element from the html that we are trying to work with
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");


// name of the event and callback
weatherForm.addEventListener("submit", (event) => {
   // prevents the default behavior which is to refresh the browser;
   // instead it will do nothing, allowing us to do whatever we want by
   // allowing the function to run
   event.preventDefault()

   const location = search.value

   messageOne.textContent = "Loading...";
   messageTwo.textContent = "";

    // Fetch API is not part of javascript; it is a browser-based api.
    // But it is not accessible in Node.js

    // 'fetch' sends off an asynchronous i/o operation like calling request in 
    // node.js.  that means you don't get the data right away, you provide a 
    // function that can access the data in the future when the data is 
    // available

    // when running locally, you want to run on localhost; when running via
    // Heroku, you want to run from the url provided by Heroku
    fetch("/weather?city=" + location)
    .then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                messageTwo.textContent = "";
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        } )
    } )
    
} );
