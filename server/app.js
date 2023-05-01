const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const debug = require('debug')('quizzer:app');
const session = require('express-session')
const RedisStore = require("connect-redis")(session)
const { createClient } = require("redis")

const indexRouter = require('./routes/index');
const quizzesRouter = require('./routes/quizzes');
const usersRouter = require('./routes/users');

const app = express();
let redisClient = createClient({ legacyMode: true })
redisClient.connect().catch(console.error)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    cookie: { maxAge: 86400000 },
    store: new RedisStore({ client: redisClient }),
    resave: false,
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false
}))

app.use('/', indexRouter);
app.use('/quizzes', quizzesRouter);
app.use('/users', usersRouter);

module.exports = app;
