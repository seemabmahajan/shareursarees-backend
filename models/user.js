const mongoose = require("mongoose");
const  Sari = require('./sari');

const UserSchema = mongoose.Schema({

    name : {
        type : String,
        required : [true, 'Name is required' ]
        
    },
    email : {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    phone: {
        type: String,
        required: [true, 'Phone is required']
    },
    mySaris : [ Sari.schema ],
 })

    const User = mongoose.model('User',UserSchema );
    
    module.exports = User

    








