const router = require('express').Router()
const { error } = require('../models/Joi')
const joiuserSchema = require('../models/Joi')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')


router.post('/register', async (req, res) => {
    const { error } = joiuserSchema.validate(req.body, { abortEarly: false })
    if (error) return res.status(400).send(error.details[0].message)
    
    const usernameExist = await User.findOne({ username: req.body.username })
    if (usernameExist) return res.status(400).send('username already exist')
    
     const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).send('username already exist')
    
    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(req.body.password, salt)

    const newUser = new User({
        username: req.body.username,
        fullname: req.body.fullname,
        password: hashedpassword,
        email: req.body.email
    })
    
    try {
        const savedUser = await newUser.save()
        res.status(200).send(savedUser)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('email is not valid')
    
    const validpass = await bcrypt.compare(req.body.password, user.password)
    if (!validpass) return res.status(400).send('password is not correct')

    const { password, isAdmin,...others } = user._doc

    const token = jwt.sign({id:user._id, isAdmin: user.isAdmin}, process.env.TOKEN,{expiresIn: '24h'})
    res.status(200).send({ ...others, token })
})



module.exports= router