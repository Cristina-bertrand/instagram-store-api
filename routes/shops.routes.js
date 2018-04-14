const express = require('express');
const router = express.Router();
const shopsController = require('../controllers/shops.controller');
const secureMiddleware = require('../middleware/secure.middleware');
const shopsMiddleware = require('../middleware/shops.middleware');
const uploadConfig = require('../configs/multer.config');


router.get('/', shopsController.list);
router.get('/:id', shopsMiddleware.checkValidId, shopsController.get);
router.get('/:id/products', shopsController.getShopProducts);
router.get('/like/:id', secureMiddleware.isAuthenticated,shopsController.like);
router.post('/', secureMiddleware.isAuthenticated, shopsMiddleware.checkUserShopNotExist, uploadConfig.single('image'), shopsController.create);
router.put('/:id', secureMiddleware.isAuthenticated, uploadConfig.single('image'), shopsController.edit);
router.delete('/:id', secureMiddleware.isAuthenticated, shopsMiddleware.checkValidId, shopsController.delete);

module.exports = router;
