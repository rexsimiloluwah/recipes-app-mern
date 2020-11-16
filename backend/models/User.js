const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

    username : {
        type : String,
        required : true,
        trim : true
    },

    email : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },

    password : {
        type : String,
        required : true
    },

    registered_date : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('User', UserSchema);