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

    
    recipes : [
        {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            ref : 'Recipes'  // This is to establish a reference between the User model and the Recipes model.
        }
    ],

    registered_date : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('User', UserSchema);