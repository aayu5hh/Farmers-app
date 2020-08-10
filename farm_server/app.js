require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const cors = require('cors');

var usersRouter = require('./routes/users');
var farmersRouter = require('./routes/farmers');

mongoose.connect('mongodb+srv://user:123@mwaprojectcluster.16aa0.mongodb.net/FarmersDb?retryWrites=true&w=majority', (err)=>{
  if(!err)
    console.log('MongoDb connection succeeded...');
  else
  console.log('Error in DB connection: '+JSON.stringify(err, undefined, 2));
});

var app = express();


// app.listen(3000, ()=> console.log('Server started at port: 3000'))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

mongoose.connect(process.env.MONGO_URL);



app.use(bodyParser.json());

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', usersRouter);
app.use('/', farmersRouter);
// app.use('/customers', customerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
