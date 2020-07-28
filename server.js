// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express=require('express');
// Start up an instance of app
const app=express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors=require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Setup Server
const port=8000;
const server=app.listen(port, listening)
function listening (){
    console.log(server);
    console.log(`running on local host: ${port}`);
}
//get function
app.get('/allData', sendData)
function sendData (req, res){
    //send project data to the client
    res.send(projectData);
    projectData={};//empties the new project data
}
//post function
app.post('/addData', addData)
function addData (req, res){
    let data=req.body;
    console.log('server side data ', data);
    let newEntry={
       date: req.body.date,
       temp: req.body.temp,
       content: req.body.content
   }
   projectData = newEntry
    res.send(projectData);
}
