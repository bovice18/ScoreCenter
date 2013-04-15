var express = require('express');
var mongo = require ("mongodb");

var app = express();

app.use(express.logger());


// Mongo initialization
var databaseUrl = process.env.MONGOHQ_URL || 'mongodb://localhost/scorecenter';
var collections = ["scores"];  
var db = require("mongojs").connect(databaseUrl, collections);


//enable CORS
app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });


app.get('/', function(request, response) {
	
	response.set('Content-Type', 'text/html');
	
	db.scores.find({}).limit(10).sort({game_title:1}, 
		function(err, scores){
			if(err || !scores) { console.log("no scores found"); }
			else { response.send(scores);}			
		});		
});

app.get('/highscores.json', function(request, response) {
	
	response.set('Content-Type', 'text/html');
	var title = request.query["game_title"]; //query game_title in URL ?game_title = attr
	db.scores.find({game_title: title}, {score: 1}).limit(10).sort({score:-1}, 
		function(err, scores){
			if(err || !scores) { console.log("no scores found"); }
			else { response.send(scores);}			
		});
		
});


app.get('/data.json', function(request, response) {
	response.set('Content-Type', 'text/json');
	response.send('{"status":"good"}');
});
app.listen(process.env.PORT || 3000);
