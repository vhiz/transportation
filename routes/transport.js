const router = require('express').Router()
const Transport = require('../models/Transport')
const bcrypt = require('bcrypt')
const {verifiedToken, verifiedAuth, verifiedAdmin} = require('./verify')
const { Promise } = require('mongoose')


router.post('/create/transport', verifiedAuth,async (req, res) => {

    const transportexist = await Transport.findOne({ name: req.body.name })
    if (transportexist) return res.status(400).send('This company already exist in our database')
    

    const newTransport = new Transport(req.body)
    try {
        const savedTransport = await newTransport.save()
        res.status(200).send(savedTransport)
        console.log(savedTransport)
    } catch (error) {
        res.status(400).send(error)
    }
})


router.put('/find/:id', verifiedAuth, async (req, res) => {
    
    try {
        const updatedTransport = await Transport.findByIdAndUpdate(req.params.id, {
            $set:req.body
        },{new:true})
        res.status(200).send(updatedTransport)
    } catch (error) {
        res.status(400).send(error)
    }
})


router.delete('/find/:id', verifiedAuth,async (req, res) => {

    const accountexist = await Transport.findById(req.params.id)
    if (!accountexist) return res.status(400).send('This page dosent exist')
    
    try {
        const deletedTransport = await Transport.findOneAndDelete(req.params.id)
        res.status(200).send('this Transport is deleted')
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/get/:id', async (req, res) => {
    try {
        const accountexist = await Transport.findOne({ _id:req.params.id })
        if (accountexist) return res.status(200).send(accountexist)
    } catch (error) {
        res.status(400).send('user dose not exist')
    }
})

router.get('/all', async (req, res) => {
    const { max, min, ...others } = req.query
    try {
        const transports= await Transport.find({ ...others,$gt: min | 1, $lt: max || 999 }).limit(req.query.limit)
        return res.status(200).send(transports)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/countbystates', async (req, res) => {
    const states = req.query.states.split(",")
    try {
        const list = await Promise.all(states.map(state => {
            return Transport.countDocuments({state:state})
        }))   
        res.status(200).send(list)
    } catch (error) {
        res.status(400).send(error)
    }
})




module.exports= router