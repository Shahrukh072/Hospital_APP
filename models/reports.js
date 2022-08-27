const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Reports schema
const reportSchema = new Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient"
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    },
    status: {
        type: String,
        required: true
    },
    date: {
        type: String
    }

}, {
    timestamps: true
});

//export
module.exports = mongoose.model('Report', reportSchema);