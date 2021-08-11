const express =require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const db = mongoose.connection
require('dotenv').config();


const PORT = process.env.PORT || 3003;
const MONGODB_URI = process.env.MONGODB_URI;


app.use(cors())
app.use(express.json());

const newsController = require('./controllers/news.js');
app.use('/news', newsController);

app.listen(PORT, ()=> {
  console.log('listening...');
});
mongoose.connect(
  MONGODB_URI,
  // 'mongodb://localhost:27017/newsscrud',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
)
mongoose.connection.once('open', () => {
  console.log('connected to mongod');
})
