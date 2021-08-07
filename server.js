const express =require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();



app.use(cors())
app.use(express.json());

const carsController = require('./controllers/news.js');
app.use('/news', newsController);

app.listen(3000, ()=> {
  console.log('listening...');
});
mongoose.connect(
  'mongodb://localhost:27017/newsscrud',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
)
mongoose.connection.once('open', () => {
  console.log('connected to mongod');
})
