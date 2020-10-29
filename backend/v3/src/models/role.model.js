const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ModelSchema = new Schema({
    rolename: {
        required: true,
        unique: true,
        type: String
    },
    description: {
        type: String,
        required: true,
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

module.exports = mongoose.model('Role', ModelSchema);