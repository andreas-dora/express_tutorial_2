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
  let articles =[
    {
      id: 1,
      titel: 'Geschichte eins',
      author: 'Andy Ding',
      body: 'Hier steht der Anfang der Geschichte'
    },
    {
      id:2,
      titel: 'Zweites Kapitel',
      author: 'Bing Bong',
      body: 'Hier steht der Hauptteil der Geschichte'
    },
    {
      id:3,
      titel: 'Drittes Kapitel',
      author: 'Andy Ding',
      body: 'Hier steht das Ende der Geschichte'
    }
  ];

  res.render('index', {
    titel: 'Articles',
    articles: articles
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