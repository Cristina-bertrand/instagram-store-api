const paypal = require('paypal-rest-sdk');

module.exports.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AV447YY0-sO1dO0Bf89dY2Epx50_uc7nGhlB6mh5hKa1ZPK7uVOSCaWol8s41D2b6omr3M9JrxY0G_bd',
  'client_secret': 'EMuZkHZBRZfzcIxL2olB3W3IzV-LovcR-Ke4mepxQy44Xl1N-SWR6-fZbj72WpTEAG6XEcICRthz_H4o'
});


module.exports.createPayment = (newPurchase) => {
    return create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:3000/success",
        "cancel_url": "http://localhost:3000/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "newPurchase.name",
                "sku": "001",
                "price": "newPurchase.price",
                "currency": "newPurchase.currency",
                "quantity": "newPurchase.quantity"
            }]
        },
        "amount": {
            "currency": "newPurchase.currency",
            "total": "newPurchase.price"
        },
        "description": "Payment details"
    }]
};
