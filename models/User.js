const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userschema = new Schema({
    fullname: ({
        first: { type: String, required: true },
        last: {type: String, required:true}
    }),
    username: { type: String, required: true },
    email: { type: String, required: true },
    isAdmin: {type: Boolean, default: false},
    password: { type: String, required: true }
},{timestamps: true})



module.exports= mongoose.model('User', userschema)