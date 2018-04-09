const express = require('express');
const router = express.Router();
const shoppingCartController = require('../controllers/shoppingCart.controller');

router.get('/', shoppingCartController.list);
// router.post('/:id/pay', shoppingCartController.pay);
// router.get('/success', shoppingCartController.executePayment);
// router.get('/cancel', shoppingCartController.onPaypalError);

module.exports = router;
