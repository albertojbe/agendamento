require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var userRouter = require('./routes/userRouter');
var authRouter = require('./routes/authRouter');
var roomRouter = require('./routes/roomRouter');
var eventRouter = require('./routes/eventRouter');
var resourceRouter = require('./routes/resourceRouter');

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

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use('/status', indexRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/rooms', roomRouter);
app.use('/events', eventRouter);
app.use('/resources', resourceRouter);

module.exports = app;
