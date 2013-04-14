var express = require('express');
var mongo = require ("mongodb");

var app = express();

app.use(express.logger());

// Mongo initialization
var databaseUrl = process.env.MONGOHQ_URL || 'mongodb://localhost/scorecenter';
var collections = ["High_Scores"];  
var db = require("mongojs").connect(databaseUrl, collections);

//enable CORS
app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });


app.get('/', function(request, response) {
	
	/*
	response.set('Content-Type', 'text/html');
	
	db.High_Scores.find({}).limit(10).sort({game_title:1}, 
		function(err, scores){
			if(err || !High_Scores) { console.log("no scores"); }
			else { response.send(High_Scores);}			
		});
		*/
		
	response.set('Content-Type', 'text/html');
	response.send('<p>Hi!</p>');	
		
});

app.listen(process.env.PORT || 3000);
