const express=require('express');
const app=express();
var mongoose = require("mongoose");
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')
var logger = require('express-logger');
//var pug = require('pug');
//var fn = pug.compile('string of pug');

//var fn = require('fn');
//var jadebootstrap=require('jade-bootstrap');
//var html = fn(locals);


mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/64_bracket");
//var fn = pug.compile('string of pug', options);
//var html = pug.render('string of pug', merge(options, locals));
//var html = pug.renderFile('filename.pug', merge(options, locals));

var http = require('http');
var hostname = 'localhost';
app.set('port', process.env.PORT || 3030);



var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var bracketSchema = new mongoose.Schema({
  team_name: String,
  Score: Number
 });

 var User = mongoose.model("User", bracketSchema);
 
 var adminSchema = new mongoose.Schema({
  inputEmail: String,
  inputPassword: String
 });
 var Admin = mongoose.model("Admin",adminSchema);

//---------------------------variables ends here-----------------------------------------

 app.set('view engine', 'jade');
 app.set('views', __dirname + '/src/views');
 app.use(express.static(path.join(__dirname, 'public')));
 app.use(express.static(path.join(__dirname, 'src/views')));
 app.use(express.static(path.join(__dirname, 'bower_components')));
 app.use(bodyParser.json());
 app.use(logger({path: "/path/to/logfile.txt"}));

//-----------------------------------------------------------------------------------------
/*app.use("/", (req, res) => {
  res.sendFile(__dirname + "/src/views/index.pug");
 });*/



 //-------------render jade file--------------
app.get('/admin',jsonParser,function(req,res,next){
  res.render('admin',{title:'login for admin'});
});
app.get('/',jsonParser,function(req,res,next){
  res.render('index',{title:'welcome'});
});


/*app.use('index',jsonParser,function(req,res){
	User.find({Score: "50"}, function(err, docs){
		if(err) res.json(err);
   else   res.render('index', {users: docs});
  });
});*/




 //---------------render ends--------------------------




 app.post("/addname",urlencodedParser,function(req,res){
   new User({
    team_name: req.body.team_name,
    Score: req.body.score

   }).save(function(err,doc){
     if(err)res.json(err)
      else res.send('You have added a team Successfully!!');
    //else res.redirect('/view');
   });
  
 });
//---------------this is for new admin form--------------------------------

 app.post("/newadminsave",urlencodedParser,function(req,res){
  new Admin({
   Name: req.body.name,
   Email: req.body.email,
   Username: req.body.username,
   password: req.body.password,
   Cpassword: req.body.confirm,

  }).save(function(err,doc){
    if(err)res.json(err)
     else res.send('You have added a team Successfully!!');
   //else res.redirect('/view');
  });
 
});


 app.get('/view',urlencodedParser, function(req, res){
	User.find({Score: "50"}, function(err, docs){
   
		if(err) res.json(err);
 //else   res.render('results', {users: docs});
   else   res.render('work', {users: docs});
	});
});

app.post('/newadmin',urlencodedParser, function(req, res,next){
	
    res.render('newadmin', {});
  });

app.post('/login',urlencodedParser, function(req, res,next){
    
      res.render('login', {});
    });
  

//---------------------------------------------------------------------------------------

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});