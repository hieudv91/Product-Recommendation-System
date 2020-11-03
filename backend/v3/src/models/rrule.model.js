const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ModelSchema = new Schema({
    source: {
        required: true,
        type: String
    },
    target: {
        required: true,
        type: Array
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

module.exports = mongoose.model('rrule', ModelSchema);