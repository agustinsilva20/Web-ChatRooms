var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter=require('./routes/login');
var KNGapp=require('./routes/kng');
var changelog=require('./routes/changelog');
var registerRouter=require('./routes/register');
var serverCreado=require('./routes/serverCreado');
var unirse=require('./routes/unirse');
var lluviaIdeas=require('./routes/lluviaIdeas');
var anotaciones=require('./routes/anotaciones');
var tareasRealizar=require('./routes/tareasRealizar');
var tareasFinalizadas=require('./routes/tareasFinalizadas');
var linksUtiles=require('./routes/linksUtiles');
var otros=require('./routes/otros');
var offtopic=require('./routes/offtopic');

var app = express();
var cors=require ("cors");
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/KNGapp', KNGapp);
app.use('/KNGapp/changelog', changelog);
app.use('/serverCreado', serverCreado);
app.use('/unirse', unirse);
app.use('/KNGapp/lluviaIdeas', lluviaIdeas);
app.use('/KNGapp/anotaciones', anotaciones);
app.use('/KNGapp/tareasRealizar', tareasRealizar);
app.use('/KNGapp/tareasFinalizadas', tareasFinalizadas);
app.use('/KNGapp/linksUtiles', linksUtiles);
app.use('/KNGapp/otros', otros);
app.use('/KNGapp/offtopic', offtopic);
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
