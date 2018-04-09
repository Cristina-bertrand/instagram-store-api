const mongoose = require('mongoose');
const Shop = require('../models/shop.model');
const ApiError = require('../models/api-error.model');
const User = require('../models/user.model')

module.exports.list = (req, res, next) => {
  Shop.find()
    .then(shops => res.status(200).json(shops))
    .catch(error => next(error));
}

module.exports.get = (req, res, next) => {
  const id = req.params.id;
  Shop.findById(id)
    .then(shop => {
      if (shop) {
        res.json(shop)
      } else {
        next(new ApiError(`Shop not found`, 404));
      }
    }).catch(error => next(error));
}

module.exports.create = (req, res, next) => {
  const shop = new Shop(req.body);
  if (req.file) {
    shop.image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  }
  shop.save()
    .then(() => {
      res.status(201).json(shop);
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        next(new ApiError(error.errors));
      } else {
        next(new ApiError(error.message, 500));
      }
    })
}

module.exports.edit = (req, res, next) => {
  const id = req.params.id;
  if (req.file) {
    body.image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  }

  Shop.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then(shop => {
      if (shop) {
        res.json(shop)
      } else {
        next(new ApiError(`Shop not found`, 404));
      }
    }).catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        next(new ApiError(error.message, 400, error.errors));
      } else {
        next(new ApiError(error.message, 500));
      }
    });
}

module.exports.delete = (req, res, next) => {
  const id = req.params.id;
  Shop.findByIdAndRemove(id)
    .then(shop => {
      if (shop) {
        res.status(204).json()
      } else {
        next(new ApiError(`Shop not found`, 404));
      }
    }).catch(error => next(error));
}

module.exports.like = (req, res, next) => {
  const shopId = req.params.id;
  User.findByIdAndUpdate(req.user._id, { $push: { favourite: shopId } })
    .then(user => {
      res.status(204).json()
    })
    .catch(error => next(error));
}
