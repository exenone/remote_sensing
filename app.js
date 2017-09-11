const express=require('express');
const app=express();
var MongoClient = require('mongodb').MongoClient;
var db = "mongodb://localhost:27017/mydb";
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); 


const http = require('http');

const hostname = 'localhost';
const port = 3000;

app.use(express.static('public'));
app.use(express.static('src/views'));

//-----------------------------------------------------------------------------------------

app.get('/', function(req,res){
    res.render('fixture');
})
 
app.post('/insert', function (req, res) {

MongoClient.connect(db, function(err, db) {
    if (err) throw err;
    
    db.collection('students', function(err, collection) {
        doc = {
              "tree" : req.body.tree,
              "xxx" : req.body.xxx
        };
        collection.insert(doc, function() {
            res.send('Inserted Successfully!');
            db.close();
        });
    });
});

  
});
   

  // --http://www.wesohaex.com/nodejs/insert-data-mongodb-using-nodejs.html-------------------------------------
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

  