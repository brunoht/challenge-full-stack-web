const mongoose = require('mongoose');

const student = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    ra: {
        type: String,
        required: true,
        unique: true
    },
    cpf: {
        type: String,
        required: true
    },
},{
    timestamps: true
});

module.exports = mongoose.model('Student', student);