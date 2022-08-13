const mongoose = require('mongoose'); //mongoose
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Schema = mongoose.Schema;
//doctor schema
const DoctorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },


});

// hash the user password 
DoctorSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

//export
module.exports = mongoose.model('doctor', DoctorSchema);