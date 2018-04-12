const express = require('express');
const router = express.Router();
const shoppingCartController = require('../controllers/shoppingCart.controller');

//ShoppingCart
router.get('/', shoppingCartController.list);
router.get('/:email/:name', shoppingCartController.removeProductFromCart);
router.post('/:name', shoppingCartController.addProductToCart);

//Paypal
router.post('/:id/pay', shoppingCartController.pay);
router.get('/success', shoppingCartController.executePayment);
router.get('/cancel', shoppingCartController.onPaypalError);

module.exports = router;
