const router = require('express').Router()
const Car = require('../models/Car')
const Transport = require('../models/Transport')
const { verifiedAuth } = require('./verify')

router.post('/createcar/:transportid', verifiedAuth,async (req, res) => {
    const transportId = req.params.transportid
    const newCar = new Car(req.body)
    try {
        const savedcar = await newCar.save()
        try {
            await Transport.findByIdAndUpdate(transportId, {$push: {car: savedcar._id}})
        } catch (error) {
            return res.status(400).send(error)
        }
        return res.status(200).send(savedcar)
    } catch (error) {
        return res.status(400).send(error)
    }
})


router.put('/:id',verifiedAuth ,async(req, res)=>{
    
    try {
        const updatedcar = await Car.findByIdAndUpdate(req.params.id,{
            $set:req.body
        })
        return res.status(200).send(updatedcar);
    } catch (error) {
       return res.status(400).send(error)
    }
})

//

router.delete('/:id/:transportid', verifiedAuth, async (req, res) => {
    const transportId = req.params.transportid
    try {
        await Car.findByIdAndDelete(req.params.id)
        try {
            await Transport.findByIdAndUpdate(transportId, {
                $pull:{car:req.params.id}
            })
            console.log('transport car has been deleted')
        } catch (error) {
            res.status(400).send(error)
        }
        res.status(200).send('car has been deleted')
    } catch (error) {
        res.status(400).send(error)
    }
})

//admin
router.get('/get/:id', verifiedAuth, async(req, res)=>{
    try{
        const user = await Car.findById(req.params.id)
        res.status(200).send(user)
    }catch(err){
        res.status(500).json(err)
    }
})

router.get('/all', verifiedAuth, async(req, res)=>{
    try{
        const users= await Car.find();
        res.status(200).send(users)
    }catch(err){
        res.status(500).json(err)
    }
})



module.exports=router