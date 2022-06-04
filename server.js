//import express package
const express = require('express');

//initialise express framework
const app = express();

//server static files from public folder - whats a static file..?
app.use(express.static(__dirname + '/dist'));

//serve index file for the root "/" path
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/dist/index.html')
});

//start server, listen for incoming traffic + log message to console
let server = app.listen(8888, function(){
    console.log("App server is running on port 8888"); //appears in server side
});