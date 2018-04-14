const mongoose = require('mongoose');
const ApiError = require('../models/api-error.model');

module.exports.checkValidId = (req, res, next) => {
    const id = req.params.id;
    if (mongoose.Types.ObjectId.isValid(id)) {
        next();
    } else {
        next(new ApiError(`Invalid shop id: ${id}`));
    }
}

module.exports.checkUserShopExist = (req, res, next) => {
  if (req.user.shop && req.user.shop.length > 0) {
    next();
  } else {
      next(new ApiError('You already have a shop', 201));
  }
}

module.exports.checkUserShopNotExist = (req, res, next) => {
  if (req.user.shop && req.user.shop.length != 0) {
      next();
  } else {
      next(new ApiError('You need to manage a shop to register a product', 404));
  }
}
