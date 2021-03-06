// A static file server for development use.
// By Curran Kelleher 4/26/2014
//
// Run in the background with the shell command "node server.js &".
// Install express with "npm install"
var port = 8000,
    express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    app = express();

app.use('/', express.static(__dirname + '/'));

// Handle JSON post requests
// Draws from http://stackoverflow.com/questions/5710358/how-to-get-post-query-in-express-node-js
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded()); // to support URL-encoded bodies

app.post('/writeDataFlowGraph', function(req, res) {

  // Extract the serialized model state from the request body.
  var state = req.body,
      json = JSON.stringify(state, null, 2),
      filename = './dataFlowGraphs/' + state.name + '.json';

  // Close the connection.
  res.send('');

  // Write the file to disk.
  fs.writeFile(filename, json, function(err) {
    if(err) { console.log(err); }
  }); 
});

app.listen(port);
console.log('Now serving http://localhost:'+port);
