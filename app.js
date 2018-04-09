const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const corsConfig = require('./configs/cors.config');
const passport = require('passport');
const session = require('express-session');

require('./configs/db.config');
require('./configs/passport.config').setup(passport);


const usersRoutes = require('./routes/users.routes');
const sessionRoutes = require('./routes/sessions.routes');
const shopRoutes = require('./routes/shops.routes');
const productRoutes = require('./routes/products.routes');

const app = express();

app.use(cors(corsConfig));


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'Super Secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 2419200000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.session = req.user || {};
  next();
});

app.use('/users', usersRoutes);
app.use('/session', sessionRoutes);
app.use('/shops', shopRoutes);
app.use('/products', productRoutes);

// catch 404 and forward to error handler
app.use((req, res, next)  => {
  const error = new Error('Not Found');

  error.status = 404;
  next(error);
});

// error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ message: error.message || '' });
});

module.exports = app;
