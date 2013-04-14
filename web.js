var express = require('express');

var app = express.createServer(express.logger());


app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
});


// Mongo initialization
var databaseUrl = process.env.MONGOHQ_URL || 'mongodb://localhost/scorecenter';
var scores = ["High_Scores"];  
var db = require("mongojs").connect(databaseUrl, scores);


app.get('/', function(request, response) {
	response.send("Done");

});

app.get('/highscores.json', function(request, response) {

	db.High_Scores.find({game_title: "frogger"}, function(err, users) {
  	if( err || !users) console.log("No female users found");
  	else High_Scores.forEach( function(score) {
    	response.send(score);
  	} );
});
});

//This is how we will complete assignment 5
app.post("/submit.json", function(request, response){
	//a few things go here
	response.send("Done");	
	});

app.listen(process.env.PORT || 3000);