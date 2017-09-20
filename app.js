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

 var User = mongoose.model("users", bracketSchema);
 
 
var bracketSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  Username: String,
  password: String,
  Cpassword: String
 });
 var Admin =mongoose.model("admins",bracketSchema);
 var Level1 =mongoose.model("Level1",bracketSchema);
  /*
 var Admin = mongoose.model("Admin",adminSchema);*/

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
app.get('/newadminsave',jsonParser,function(req,res,next){
  res.render('newadminsave',{title:'welcome'});
});

app.get('/about',jsonParser,function(req,res,next){
  res.render('about',{title:'about_brackets'});
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
   Cpassword: req.body.confirm

  }).save(function(err,doc){
    if(err)res.json(err)
    else res.send('You have added a user Successfully!!');
  // else res.redirect('/newadminsave');
  });
 
});

/*
app.get('/view',urlencodedParser, function(req, res){
  User.find({Score:""},function(err, teamArray){

    if(err) res.json(err);
    if (teamArray<=(0-160)){
      res.render('try', {users: teamArray})
    }
     else if(teamArray<=(80-160 ))  { res.render('try', {users: teamArray});
    }	});
});
*/

 app.get('/view',urlencodedParser, function(req, res){
  User.find({},
     function(err, docs){

		if(err) res.json(err);
 else   res.render('try', {users: docs});
   //else   res.render('work', {users: docs});
	});
});
//--------------------ranking system quering----------
/*group a condition*/

app.get('/groupa',urlencodedParser, function(req, res){
  User.find({ Score:{$gt: 0,$lt:40}},
  
     function(err, docs){

		if(err) res.json(err);
 else   res.render('groupa', {users: docs,title:"Group_A"});
	});
});

/*group b condition*/


app.get('/groupb',urlencodedParser, function(req, res){
  User.find({ Score:{$gt: 40,$lt:80}},
    
     function(err, docs){

		if(err) res.json(err);
 else   res.render('groupb', {users: docs,title:"Group_B"});
	});
});

/*group c condition*/

app.get('/groupc',urlencodedParser, function(req, res){
  User.find({ Score:{$gt: 80,$lt:120}},
    
     function(err, docs){

		if(err) res.json(err);
 else   res.render('groupc', {users: docs,title:"Group_C"});
	});
});
/*group d condition*/
app.get('/groupd',urlencodedParser, function(req, res){
  User.find({ Score:{$gt: 120,$lt:160}},
    
     function(err, docs){

		if(err) res.json(err);
 else   res.render('groupd', {users: docs,title:"Group_D"});
	});
});
/*--------copydata------------*/
/*
var level1 =mongoose.model("level1",bracketSchema);
var toArray =
User.find({ Score:{$gt: 0,$lt:160}}),toArray(function(err, data){
   level1.insert(doc); 
});
*/
//------------------------------------------------------
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