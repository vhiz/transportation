const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transportSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    state: { type: String, required: true },
    address: { type: String, required: true },
    routes: { type: [String], required: true },
    photos: { type: [String] },
    description: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5 },
    car: { type: [String] },
    cheapestPrice: { type: Number },
    feautured:{type:Boolean, default:false}
}, {timestamps:true})

module.exports= mongoose.model('Transport', transportSchema)