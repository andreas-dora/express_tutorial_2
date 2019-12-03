const express = require('express');

// Path ist ein Core Modul
const path = require('path');

// Init App
const app = express();

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home Route
app.get('/', function(req,res){
  // var article = [
  //   id:1,
  //   article,
  // ]
  res.render('index', {
    titel: 'Article'
  });
});

// Add Route
app.get('/articles/add', function(req,res){
  res.render('add_article', {
    titel: 'Add Article'
  });
});

// Start Server
app.listen(3000, function(){
  console.log('The Machine listens');
})