const mongoose = require('mongoose')
const Schema = mongoose.Schema

const carSchema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    maxPeople: { type: Number, require: true },
    carnumb: [{number: Number, unavailableDates:{type:[String]}}],
})



module.exports= mongoose.model('Car', carSchema)