const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ModelSchema = new Schema({
    productid: {
        required: true,
        unique: true,
        type: String
    },
    productname: {
        required: true,
        unique: true,
        type: String
    },
    description: {
        type: String,
        required: true,
    },
    shop: {
        type: Schema.Types.ObjectId,
        ref: 'shop',
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    active: {
        type: Boolean,
        default: true,
    }

});
ModelSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

ModelSchema.index({ '$**': 'text' });

module.exports = mongoose.model('Product', ModelSchema);