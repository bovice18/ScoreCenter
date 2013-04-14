var express = require('express');

var app = express();

app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.logger());
});

//enable CORS
app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

// Mongo initialization
var databaseUrl = process.env.MONGOHQ_URL || 'mongodb://localhost/scorecenter';
var collections = ["High_Scores"];  
var db = require("mongojs").connect(databaseUrl, collections);


app.get('/', function(request, response) {
	var scoreList = "";
	response.set('Content-Type', 'text/html');
	db.High_Scores.find({}).limit(10).sort({game_title:1}, function(err, scores){
		if(err || !High_Scores) console.log("no scores");
		else response.send(High_Scores);	
			} );
	} );
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