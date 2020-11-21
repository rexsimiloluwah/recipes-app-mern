// Model for Tasks
const mongoose = require('mongoose');

const recipesSchema = mongoose.Schema({

    name : {
        type : String,
        required : true,
        trim : true
    },

    description : {
        type : String,
        required : true,
        trim : true,
        maxlength : 100
    },

    tribe : {
        type : String,
        required : true,
        trim : true
    },

    tags : {
        type : [],
        required : true,
        trim : true
    },

    content : {
        type : String,
        required : true,
        trim : true
    },

    
    creator : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'  // Establishing a connection between the user and the recipes model for the creator field.
    },

    timestamp : {
        type : Date,
        default : Date.now
    }

})

module.exports = mongoose.model('Recipes', recipesSchema)