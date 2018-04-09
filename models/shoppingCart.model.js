const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({

    productsArray: {
        type: Array,
        default: [],
        items: {
            type: Object
        }
    },

    totalCartPrice: {
        type: Number,
        default: 0
    },

    userEmail: {
        type: String
    }

}, { timestamps: true });


const Cart = mongoose.model('Cart', cartSchema);  
module.exports = Cart;
