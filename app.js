//import modules
var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes");
//express instance
var app = express();
//asign port
app.listen(4242,function(){
	console.log("Listening port 4242");
});

//asign bodyparser's route
app.use(bodyParser.urlencoded({extend: true}));
//invoque route in every url
app.use('/',routes);
