const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//patientSchema
const patientSchema = new Schema({
    number: {
        type: Number,
        unique: true,
        required: true,
    },

}, {
    timestamps: true
});

//export
module.exports = mongoose.model('Patient', patientSchema);