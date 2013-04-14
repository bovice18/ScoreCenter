var express = require('express');

var app = express.createServer(express.logger());


app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
});

app.get('/', function(request, response) {


});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

//This is how we will complete assignment 5
app.post("/submit.json", function(request, response){
	//a few things go here
	response.send("Done");	
	});




/*
app.HTTP_VERB("SOME_ROUTE", function(request, response)
{

});
*/