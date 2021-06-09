const router = require('express').Router()
const mongoose = require('mongoose')
const {UserController}=require('./../controllers/UsersController')
// const isAuthMiddelware = require('./../middelware/isAuth')


router.post('/user/login',UserController.login)
router.post('/user/register',UserController.register)


module.exports=router
