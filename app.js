const express=require('express');
const app=express();
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/mydb");






const http = require('http');

const hostname = 'localhost';
const port = 3000;

app.use(express.static('public'));
app.use(express.static('src/views'));

//-----------------------------------------------------------------------------------------
app.use("/", (req, res) => {
  res.sendFile(__dirname + "./src/views/fixture.html");
 });

 var nameSchema = new mongoose.Schema({
  firstName: String,
  lastNameName: String
 });

 var User = mongoose.model("User", nameSchema);

 app.post("/addname", (req, res) => {
  
 });


 app.post("/addname", (req, res) => {
  var myData = new User(req.body);
  console.log(req.body);
  myData.save()
  .then(item => {
  res.send("item saved to database");
  })
  .catch(err => {
  res.status(400).send("unable to save to database");
  });
 });


  // ---------------------------------------
app.get('/',function(req,res){
    res.send('welcome!');
  
  });
  
  app.get('/routing',function(req,res){
    res.send('welcome!its routing');
  
  });

  app.all('/secret', function (req, res, next) {
    console.log('Accessing the secret section ...')
    next() 
  });

  app.listen(port, hostname, (err) => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });

  