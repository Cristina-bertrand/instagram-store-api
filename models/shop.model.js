const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The shop name is required']
    },
    image: {
        type: String,
        default: ''
    },
    specs: {
        type: [String],
        default: []
    },
    description: {
       type: String,
   },
    direction: {
       type: String,
   },
   list: {
     type: String,
     enum: ['Shop', 'Brand'],
     required: true
   },
   products: [
   {
     type: Schema.Types.ObjectId,
     ref: 'Product'
   }
 ],
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

 const Shop = mongoose.model('Shop', shopSchema);
 module.exports = Shop;
