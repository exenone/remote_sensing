const express=require('express');
const app=express();
var mongoose = require("mongoose");
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')
var logger = require('express-logger');
var pug = require('pug');
//var jadebootstrap=require('jade-bootstrap');


mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/64_bracket");


var http = require('http');
var hostname = 'localhost';
app.set('port', process.env.PORT || 3000);

app.set('view engine', 'jade');
app.set('views', __dirname + '/src/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src/views')));
app.use(bodyParser.json());
app.use(logger({path: "/path/to/logfile.txt"}));

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//-----------------------------------------------------------------------------------------
/*app.use("/", (req, res) => {
  res.sendFile(__dirname + "./src/views/fixture.html");
 });*/

 var bracketSchema = new mongoose.Schema({
  team_name: String,
  Score: Number
 });

 var User = mongoose.model("User", bracketSchema);

 app.post("/addname",urlencodedParser,function(req,res){
   new User({
    team_name: req.body.team_name,
    Score: req.body.score

   }).save(function(err,doc){
     if(err)res.json(err)
      //else res.send('Success!!');
     else res.redirect('/view');
   });
  
 });


 app.get('/view',urlencodedParser, function(req, res){
	User.find({Score: "20"}, function(err, docs){
   
		if(err) res.json(err);
 //else   res.render('results', {users: docs});
   else   res.render('work', {users: docs});
	});
});



//---------------------------------------------------------------------------------------

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});