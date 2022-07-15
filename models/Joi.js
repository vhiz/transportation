const router = require('express').Router()
const Joi = require('joi')

module.exports = Joi.object({
    username: Joi.string().required(),
    fullname: Joi.object({
        first: Joi.string().required(),
        last: Joi.string().required()
    }),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    repeat: Joi.string().valid(Joi.ref('password'))
})

