const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')


router.post('/signup', (req,res,next)=> {
  passport.authenticate('signup', {session: false}, async(err,user,info,status)=>{
    if (user) {
      res.status(200).json({ message: 'Success, username created',
      user:{
        email: user.email,
        id: user._id
      }})
    } else {
    res.status(400).json(info)
    }
  })(req,res,next) 
})

// Sign in route
router.post('/signin', (req,res,next)=>{
  passport.authenticate('signin',{session: false}, async (err,user,info)=>{
    try {
      if (err) {
        return next(error)
      }
      if (!user) {
        return res.status(500).send(info)
      } else {
        // All is ok, user is authenticated
        req.login(user, {session: false}, (error)=>{
          // Assemble the jwt
          const body = {
            user: user.email,
            id: user._id
          }
          // The token will expire in 2 days
          const tokenExpiry = {expiresIn: "2 days"}
          const token = jwt.sign(body,process.env.JWT_SECRET,tokenExpiry)
          res.json({token})
        })
      }
      
    } catch (error) {
      return next(error)
    }
  })(req,res)
})

// Sign out route
router.get('/signout', (req,res)=>{
  res.send('Sign out route')
})


module.exports = router