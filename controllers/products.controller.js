const mongoose = require('mongoose');
const Shop = require('../models/shop.model');
const ApiError = require('../models/api-error.model');
const Product = require('../models/product.model');

module.exports.index = (req, res, next) => {
  Product.find()
    .then(products => {
      res.json(products)
    })
    .catch(error => next(error))
};

module.exports.list = (req, res, next) => {
  Product.find()
    .then(product => res.status(200).json(product))
    .catch(error => next(error));
}

module.exports.get = (req, res, next) => {
  const id = req.params.id;
  Product.findById(id)
    .then(product => {
      if (product) {
        res.json(product)
      } else {
        next(new ApiError(`Product not found`, 404));
      }
    }).catch(error => next(error));
}



module.exports.createProduct = (req, res, next) => {
  const newproduct = new Product(req.body);
  const ownerId = req.user.shop[0];
  console.log(req.body);
  const product = new Product(req.body);
  if (req.file) {
    shop.image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  }
  product.save()
  .then(productSaved => {
  console.log(productSaved);
  Shop.findById(ownerId)
  .then(shop => {
    shop.products.push(product.id);
    shop.save()
    .then(() => {
      res.json(product);
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        next(new ApiError(error.errors));
      } else {
        next(new ApiError(error.message, 500));
      }
    })
  })
      .catch(error => next(new ApiError('Shop not found', 400)))
    })
    .catch(error => next(new ApiError('Couldn\'t save product', 400)))
  }

  // module.exports.createProduct = (req, res, next) => {
  //   const newproduct = new Product(req.body);
  //
  //   if (req.file) {
  //     newproduct.image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  //   }
  //   newproduct.save()
  //     .then(product => {
  //       return  Shop.findByIdAndUpdate(req.user.shop[0], { $push: { product: shop.product } })
  //         .then(shop => {
  //           return res.status(204).json({message: 'success'})
  //         })
  //     })
  //     .catch(error => {
  //       if (error instanceof mongoose.Error.ValidationError) {
  //         next(new ApiError(error.errors));
  //       } else {
  //         next(new ApiError(error.message, 500));
  //       }
  //     })
  // }


module.exports.editProduct = (req, res, next) => {
  const id = req.params.id;
  if (req.file) {
    body.image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  }
  Product.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then(product => {
      if (product) {
        res.json(product)
      } else {
        next(new ApiError(`Product not found`, 404));
      }
    }).catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        next(new ApiError(error.message, 400, error.errors));
      } else {
        next(new ApiError(error.message, 500));
      }
    });
}



module.exports.deleteProduct = (req, res, next) => {
  const id = req.params.id;
  Product.findByIdAndRemove(id)
    .then(product => {
      if (product) {
        res.status(204).json()
      } else {
        next(new ApiError(`Product not found`, 404));
      }
    }).catch(error => next(error));
}
