const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    gender : String,
    status : String
})

// mongoose will add 's' to make the db name a plural form (i.e. userdbs)
const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;