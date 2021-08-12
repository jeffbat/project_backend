const mongoose = require('mongoose');
const newsCastSchema = new mongoose.Schema( {

  title: String,
  author: String,
  body: String,
  category: String,
  publishedDate: String,
  image: String

});






const News = mongoose.model('News', newsCastSchema);

module.exports = News;
