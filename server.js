// Setup empty JS object to act as endpoint for all routes
projectData = {};
const data = [];

// Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require("body-parser");

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Spin up the server
// Callback to debug
const port = 3000;
const server = app.listen(port, listening);

// Initialize all route with a callback function
function listening() {
  // console.log(server);
  console.log(`running on localhost: ${port}`);
}

// Post Route
app.post("/all", (req, res) => {
  console.log("LOG: POST received");
  data.push(req.body);
  console.log(data.length);

  projectData["Location"] = req.body.Location;
  projectData["Date"] = req.body.Date;
  projectData["Temp"] = req.body.Temp;
  projectData["Content"] = req.body.Content;

  console.log("Server Post Route - data: ", data);
  console.log("Server Post Route - ProjectData: ", projectData);

  // console.log(projectData.answer);
});

// Callback function to complete GET '/all'
app.get("/all", (req, res) => {
  // res.send(projectData);
  // res.send("Get /all Data Endpoint");
  console.log("Server side GET");
  console.log(projectData);
  res.send(projectData);
});
