const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');
const secureMiddleware = require('../middleware/secure.middleware');
const shopsMiddleware = require('../middleware/shops.middleware');
const uploadConfig = require('../configs/multer.config');


router.get('/', productsController.list);
router.get('/:id', productsController.get);
router.post('/', secureMiddleware.isAuthenticated, shopsMiddleware.checkUserShopNotExist, uploadConfig.single('image'), productsController.createProduct);
router.put('/:id', uploadConfig.single('image'),  shopsMiddleware.checkUserShopExist, productsController.editProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
