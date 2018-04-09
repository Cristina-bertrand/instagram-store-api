const mongoose = require('mongoose');
const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The phone name is required']
    },
    image: {
        type: String,
        default: ''
    },
    specs: {
        type: [String],
        default: []
    },
    direction: {
       type: String,
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

 const Shop = mongoose.model('Shop', shopSchema);
 module.exports = Shop;
