require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const cors = require('cors');
var verifyToken = require('./middlewares/verifyToken');

var usersRouter = require('./routes/users');
var farmersRouter = require('./routes/farmers');
var customerRouter = require('./routes/customer');

const port = process.env.PORT || 3000;

var app = express();

//Swagger
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Extended: https://swagger.io/specification/#infoObject

// swagger definition
const swaggerOption ={
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Farmer API",
      description: "Farmer API Information",
      contact: {
        name: "Ayush-Deepak-Navin-Simon Developer"
      },
      servers: ['http://localhost:3000'],
    }
  },
  apis: ['./routes/*.js']
};

// initialize swagger-jsdoc
const swaggerDocs = swaggerJsDoc(swaggerOption);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// serve swagger
app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

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
// app.use('/farmer', verifyToken, farmersRouter);
// app.use('/customer', verifyToken, customerRouter);

app.use('/farmer', farmersRouter);
app.use('/customer', customerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

});



module.exports = app;