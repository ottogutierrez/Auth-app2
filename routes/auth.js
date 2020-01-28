const express = require('express')
const router = express.Router()

// Sign up route
router.get('/signup',(req,res)=>{
  res.send('Sign up route')
})

// Sign in route
router.get('/signin',(req,res)=>{
  res.send('Sign in route')
})

// Log in route
router.get('/login', (req,res)=>{
  res.send('Log in route')
})


module.exports = router