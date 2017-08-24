
const mongoose = require('mongoose');
const novelSchema = new mongoose.Schema({
  author: {type: String, required: true, trim: true},
  title: {type: String, required: true, trim: true},
  publish_date: {type: Date, required: true,},
  price: {type: Number, required: true},
  book_order: {type: Number, required: true, unique: true},
  series_titles: {type: Array, unique: true},
  read_again: {type: Boolean},
})
const Novel = mongoose.model('Novel', novelSchema);
module.exports = Novel;
