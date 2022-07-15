const router = require('express').Router()
const { verifiedToken, verifiedAuth, verifiedAdmin } = require('./verify')
const User = require('../models/User')

router.put('/:id',verifiedAuth ,async(req, res)=>{
    if(req.body.password){
        try{
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }catch(err){
            return res.status(400).send(err)
        }
    }
    try {
        const updatedUser = await Users.findByIdAndUpdate(req.params.id,{
            $set:req.body
        })
        return res.status(200).send(updatedUser);
    } catch (error) {
       return res.status(400).send(error)
    }
})

//

router.delete('/:id', verifiedAuth, async(req, res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).send('user has been deleted')
    }catch(err){
        res.status(500).json(err)
    }
})

//admin
router.get('/get/:id', verifiedAdmin, async(req, res)=>{
    try{
        const user = await User.findById(req.params.id)
        res.status(200).send(user)
    }catch(err){
        res.status(500).json(err)
    }
})

router.get('/all', verifiedAdmin, async(req, res)=>{
    const query = req.query.new;
    try{
        const users = query
        ? await User.find().sort({_id:-1}).limit(5)
        : await User.find();
        res.status(200).send(users)
    }catch(err){
        res.status(500).json(err)
    }
})



module.exports= router