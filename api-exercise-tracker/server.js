const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const cors = require('cors');

const router = require('./routes/exercise');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/exercise-track',{ useNewUrlParser: true }, (err, database) => {
    if (err) return console.log(err);
    const listener = app.listen(process.env.PORT || 3000, () => {
        console.log('Your app is listening on port ' + listener.address().port)
    })
});

mongoose.Promise = require('bluebird');

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.use('/api/exercise/', router);

// Not found middleware
app.use((req, res, next) => {
  return next({status: 404, message: 'not found'})
})

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage

  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt')
    .send(errMessage)
})

async function shutdown(e) {
    let err = e;
  
    console.log('Shutting down');
    console.log('Exiting process');
   
    if (err) {
      process.exit(1); // Non-zero failure code
    } else {
      process.exit(0);
    }
}
   
process.on('SIGTERM', () => {
    console.log('Received SIGTERM');
    shutdown();
});
 
process.on('SIGINT', () => {
    console.log('Received SIGINT');
    shutdown();
});
 
process.on('uncaughtException', err => {
    console.log('Uncaught exception');
    console.error(err);
    shutdown(err);
}); 
///api/exercise/new-user


