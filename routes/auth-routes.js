const express = require('express')
const router = express.Router()
const passport = require('passport')

// Sign up route
router.post('/signup',
  passport.authenticate('signup',{session:false}),
  (req,res,next) =>{
    res.status(200).json({message:'success',
    user:{
      email:req.user.email,
      id: req.user._id
    }})
  }
)

// Sign in route
router.get('/signin',(req,res)=>{
  res.send('Sign in route')
})

// Sign out route
router.get('/signout', (req,res)=>{
  res.send('Sign out route')
})


module.exports = router