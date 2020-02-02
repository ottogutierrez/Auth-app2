const express = require('express')
const router = express.Router()
const passport = require('passport')


router.post('/signup', (req,res,next)=> {
  passport.authenticate('signup', {session: false},(err,user,info,status)=>{
    if (user) {
      res.status(200).json({ message: 'Success, username created',
      user:{
        email: user.email,
        id: user._id
      }})
    } else {
    res.status(400).json({info: info,
    error: err})
    }
  })(req,res,next) 
})

// Sign in route
router.get('/signin',(req,res)=>{
  res.send('Sign in route')
})

// Sign out route
router.get('/signout', (req,res)=>{
  res.send('Sign out route')
})


module.exports = router