var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var UserModel = require('./api/models/userModel');
var bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/User');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var routes = require('./api/routes/userRoutes');
routes(app);

app.listen(port);

app.use(function(req, res){
    res.status(404).send({url: req.originalUrl + ' not found'})
});

console.log('RESTful API Server started on : ' + port);