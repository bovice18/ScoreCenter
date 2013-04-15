var express = require('express');
var mongo = require ("mongodb");

var app = express();

app.use(express.logger());
app.use(express.bodyParser());
app.use(express.methodOverride());


// Mongo initialization
var databaseUrl = process.env.MONGOHQ_URL || 'mongodb://localhost/scorecenter';
var collections = ["scores"];  
var db = require("mongojs").connect(databaseUrl, collections);

//enable CORS
var CORS = function(request, response, next){
	response.header('Access-Control-Allow-Origin', '*');
	response.header('Access-Control-Allow-Methods', 'GET,PUSH,POST,DELETE');
	response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	if('OPTIONS' == request.method){
		response.send(200);
		}
	else next();
}
app.use(CORS);


//Index Page - displays all scores in the database
app.get('/', function(request, response) {
	response.set('Content-Type', 'text/html');
	var result = [];
	var formattedHTML = "<!DOCTYPE HTML> <html><head><title>HOME</title></head><body>";
	
	db.scores.find().forEach(function(err, scores){
	 if(err)
	 {
	 	response.send("Error: " + err);
	 }
	 if(!scores)
	 {
	 	for(var i = 0; i < result.length; i++)
	 	{
	 		formattedHTML += ("<p>Game Title: " + result[i].game_title + " - " + "Score: " + result[i].score + "</p>");
	 	}
	 	formattedHTML += "</body></html>";
	 	response.send(formattedHTML);
	 }
	 else
	 {
	 	result.push(scores);
	 }	 
			
	});		
});


//HighScores Page - Displays all the scores for the specific game_title
app.get('/highscores.json', function(request, response) {
	response.set('Content-Type', 'text/html');
	var gameTitle = request.query["game_title"]; //query game_title in URL ?game_title = attr
	db.scores.find({game_title: gameTitle}).limit(10).sort({score:-1}, 
		function(err, scores){
			if(err || !scores) { console.log("game title not found"); }
			else { response.send(scores);}			
		});
		
});

app.get('/usersearch', function(request, response) {
	
	response.set('Content-Type', 'text/html');
	var title = request.query["game_title"]; //query game_title in URL ?game_title = attr
	db.scores.find({game_title: title}, {score: 1}).limit(10).sort({score:-1}, 
		function(err, scores){
			if(err || !scores) { console.log("no scores found"); }
			else { response.send(scores);}			
		});
		
});
app.get('/results', function(request, response, next){
	var name = request.query['input'];
	response.set('Content-Type', 'text/html');
	db.scores.find({username: name}, {score: 1, username: 1}).limit(10, function(err, scores){
		if(err || !scores)
		{
			response.send("Error: " + err);
		}
		else
		{
			response.send(scores);
		}

});

app.get('/submit.json', function(request, response) {
	response.set('Content-Type', 'text/json');
	response.send('{"status":"good"}');
});
app.listen(process.env.PORT || 3000);
