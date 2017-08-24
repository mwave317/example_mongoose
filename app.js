const mongoose = require('mongoose');
const Novel = require('./books.js')
mongoose.Promise = require('bluebird');
const bodyparser = require('body-parser');
const express = require('express');
const mustache = require('mustache-express');
const nodemon = require('nodemon');
const app = express();
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.use(express.static(__dirname + 'public'));
app.use(bodyparser.urlencoded({extended: false}));

mongoose.connect('mongodb://localhost:27017/novels');
app.get('/create', function (req, res){
  res.render('create');
})
app.post('/create', function (req, res) {
  Novel.create({author: req.body.author, title: req.body.title,
               publish_date: req.body.publish_date, price: req.body.price,
               book_order: req.body.book_order, series_titles: req.body.series_titles})
  .then(function(){
    console.log("The book was added");
  })
  .catch(function(err){
    console.log(err);
  });
res.render('create');
});
app.get('/edit', function (req, res){
  res.render('edit');
});
app.post('/edit', function (req,res) {
  Novel.updateOne({author: req.body.author},
  {$push: {title: req.body.title}})
  res.render('edit');
});
app.get('/novels', function (req, res){
  res.render('homes');
});
app.post('/novels', function (req, res){

Novel.findOne({author: req.body.author})
  .then(function(data) {
    res.render('homes', {
      object: data
    });
    console.log(data);
  })
  .catch(function() {
    console.log('err');
  })
});
app.get('/remove', function (req, res){
  res.render('delete');
});
app.post('/remove', function (req, res) {
  Novel.remove({author: req.body.deleteAuthor }, function (){
    console.log("Author Deleted");
  });
  res.render('delete')
});
// });

app.listen(3100, function (req, res){
  console.log("The server is running");
});
const novel = new Novel({author: 'Vince Flynn',
  title: "American Assassin",
  publish_date: 7/19/2010,
  price: 25.00,
  book_order: 1,
  series_titles:['Kill Shot', 'Transfer of Power', 'The Third Option',
   'Seperation of Power', 'Executive Power', 'Memorial Day', 'Consent to Kill',
  'Act of Treason', 'Extreme Measures', 'Pursuit of Honor', 'The Last Man',
   'The Survivor', 'Order To Kill', 'Enemy Of the State'],
  read_again: true});
