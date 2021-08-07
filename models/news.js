const mongoose = require('mongoose');

const newsCastSchema = new mongoose.Schema( {

  author: String,
  category: String,
  publishedDate: Number,

});






const News = mongoose.model('News', newsCastSchema);

module.exports = News;
