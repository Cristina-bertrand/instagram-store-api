const mongoose = require('mongoose');
const ShoppingCart = require('../models/shoppingCart.model');
const Product = require('../models/product.model');
const paypal = require('../configs/paypal.config');

module.exports.list = (req, res, next) => {
  //Aquí tenemos que trabajar con las cookies para poder pasar a la vista carrito la info de carrito de un no-logueado
    if (req.user) {
        const userEmail = req.user.email;
        ShoppingCart.findOne({ userEmail:userEmail }, (err, cart) => {
            if (err) { return next(err); }
                if (cart) {
                  res.status(201).json(cart)
                }else{
                  next(new ApiError(`shoppingCart not found`, 404));
                }
        });
    } else {
    next(new ApiError(`You have to login if you want to buy`, 404));
    }
};
