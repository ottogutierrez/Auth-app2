const express = require('express')
const router = express.Router()
const passport = require('passport')


router.get('/profile', passport.authenticate('jwt', {session:false}) ,(req,res,next)=>{
  res.status(200).send("hello for now")
})



module.exports = router