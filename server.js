var express = require('express');
var app = express();
var mongoose = require('mongoose');
// var morgan = require('morgan');
// var bodyParser = require('body-parser');
// var methodOverride = require('method-override');
var uri = 'mongodb://localhost/litterdb';
var port = 8080;

mongoose.connect(uri);

// express static?
// app.use(morgan('dev'));
// app.use(bodyParser.urlencoded({'extended': 'true'}));
// app.use(bodyParser.json());
// app.use(bodyParser.json({type: 'application/vnd.api+json'}));
// app.use(methodOverride());

require('./backend/routes.js');

app.listen(port);
console.log('Litter listening on port ' + port);
