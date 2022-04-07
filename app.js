const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 3000;
const mongoose = require('mongoose');
let dev_db_url = 'mongodb+srv://Ravaiz:ravaizww123@cluster0.bcudu.mongodb.net/DevCamper_db?retryWrites=true&w=majority';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  console.log('Request Type:', req.method)
  next();
});

const bootcamp = require('./routes/bootcamp');
app.use('/api/bootcamp', bootcamp);


const user = require('./routes/user');
app.use('/api',user);

const auth = require('./routes/auth');
app.use('/api',auth);

app.use('*', (req, res, next) => {
  Promise.resolve().then(() => {
      return next(err);
  }).catch(next) 
})



app.use(function (err, req, res, next) {

  if (err.name == "CastError" ) {
    console.log("Error: 404 ObjectNotFound")
    return res.status(404).send('Error: 404 ObjectNotFound');
  }
 if(err.name == "JsonWebTokenError"){
   return res.status(401).send("Forbidden")
  }
  else {
    console.log('Something broke!');
    return res.status(500).send('Something went wrong!');
  }
  
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
