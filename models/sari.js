const mongoose = require('mongoose')


const SariSchema = mongoose.Schema({
    num: Number,
    catagory : String,
    image: String,
    description : String,
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'User'
    },   
}, {timestamps: true})

const  Sari = mongoose.model('Sari',SariSchema);

module.exports = Sari;