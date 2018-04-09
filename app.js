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
const paypal = require('paypal-rest-sdk');

require('./configs/db.config');
require('./configs/passport.config').setup(passport);
require('./configs/paypal.config');

const usersRoutes = require('./routes/users.routes');
const sessionRoutes = require('./routes/sessions.routes');
const shopRoutes = require('./routes/shops.routes');
const productRoutes = require('./routes/products.routes');
const shoppingCartRoutes = require('./routes/shoppingCart.routes');

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
app.use('/shoppingCart', shoppingCartRoutes);

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AV447YY0-sO1dO0Bf89dY2Epx50_uc7nGhlB6mh5hKa1ZPK7uVOSCaWol8s41D2b6omr3M9JrxY0G_bd',
    'client_secret': 'EMuZkHZBRZfzcIxL2olB3W3IzV-LovcR-Ke4mepxQy44Xl1N-SWR6-fZbj72WpTEAG6XEcICRthz_H4o'
    // 'client_id': process.env.PAYPAL_CLIENT_ID,
    // 'client_secret': process.env.PAYPAL_CLIENT_SECRET
});

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
