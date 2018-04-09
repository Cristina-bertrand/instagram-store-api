const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');
const uploadConfig = require('../configs/multer.config');

router.get('/', productsController.list);
router.get('/:id', productsController.get);
router.post('/', uploadConfig.single('image'), productsController.createProduct);
router.put('/:id', uploadConfig.single('image'),  productsController.editProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
