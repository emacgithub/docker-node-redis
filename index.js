const express = require("express"); // imports express node server
const redis = require("redis"); // imports in redis client in order to talk to the redis server
const process = require("process");  // Used to simulate a container crash.  

const app = express(); // Create a new instance of an express application

// Set up a connection to our redis server
const client = redis.createClient({ // Varible client is the connection to the redis server 
  host: "redis-server", // redis-server defined in the docker-compose.yml file
  port: 6379 // Default port that redis server uses
});

client.set("visits", 0); // Initialize `visits` to be zero on startup

// A route handler for our root route i.e. the "/" i.e. localhost:8081
// Anytime someone comes to our root route call the callback function (req, res)
app.get("/", (req, res) => {
  //process.exit(0) // uncomment this line to simulate a container failure so docker-compose.yml's restart: on-failure flag kicks in
  
  // Call the redis server to get the the number of 'visits'.  
  // Redis server will pass back the 'visits' as a string in the callback function (err, visits)
  client.get("visits", (err, visits) => {
    res.send("Number of visits " + visits); // Send the response back to whoever has made the call
    client.set("visits", parseInt(visits) + 1); // Turn the `visits` string into an int add 1 and set in in redis server
  });
});

// Listen for requests on port 8081
app.listen(8081, () => {
  console.log("listening on port 8081");
});
