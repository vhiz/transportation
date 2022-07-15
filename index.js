const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv/config')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const transportRoute = require('./routes/transport')
const carsRoute = require('./routes/cars')





mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true },() => {
    console.log('connected to mongoose')
})


app.use(express.json())
app.use(morgan('common'))


app.get('/', (req, res) => {
    res.send('welcome to Transportation')
})

app.use('/', authRoute)
app.use('/', userRoute)
app.use('/car', transportRoute)
app.use('/cars', carsRoute)


var Port = process.env.PORT || 3676
app.listen(Port, () => {
    console.log(`app is up and running ${Port}`)
})