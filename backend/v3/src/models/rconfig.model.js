const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ModelSchema = new Schema({
    type: {
        required: true,
        type: String
    },
    shop: {
        type: Schema.Types.ObjectId,
        ref: 'shop',
        required: true
    },
    code: {
        required: true,
        type: String
    },
    reco_url: {
        type: String
    },
    status: {
        type: String,
        default: 'NOT_YET'
    },
    active: {
        type: Boolean,
        default: true,
    },
    min_support: {
        type: Number,
        default: 50,
    },
    min_confident: {
        type: Number,
        default: 50,
    },
});
ModelSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

ModelSchema.index({ '$**': 'text' });

module.exports = mongoose.model('rconfig', ModelSchema);