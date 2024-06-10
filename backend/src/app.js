require('./db/mongoDb.js');
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index.js'); // standard router
const sessionsRouter = require('./routes/sessions.js');
const usersRouter = require('./routes/users.js');
const highscoresRouter = require('./routes/highscores.js');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Hier werden die Routen definiert und verwendet
app.use('/', indexRouter);
app.use('/sessions', sessionsRouter);
app.use('/users', usersRouter);
app.use('/highscores', highscoresRouter);

module.exports = app;