const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The product name is required']
    },
    image: {
        type: String,
        default: ''
    },
    price: {
      type: Number,
      required: [true, `Price can't be empty`],
      min: 0
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'Shop',
      required: true
    },
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
 });

 const Product = mongoose.model('Product', productSchema);
 module.exports = Product;
