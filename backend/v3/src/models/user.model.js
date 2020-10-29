const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ModelSchema = new Schema({
    username: {
        required: true,
        unique: true,
        type: String
    },
    password: {
        type: String,
        required: true,
        exclude: true,
        allowOnUpdate: false
    },
    fullname: {
        type: String
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'role',
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
        delete ret.password
        delete ret._id;
        delete ret.__v;
    }
});

ModelSchema.index({ '$**': 'text' });

module.exports = mongoose.model('User', ModelSchema);