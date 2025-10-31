require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/userRouter');

(() => {
    const db = require('./config/db')
    db.sync();
})();

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/status', indexRouter);
app.use('/users', userRouter);
app.use('/auth', require('./routes/authRouter'));

module.exports = app;
