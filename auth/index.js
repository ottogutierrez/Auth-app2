const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const userModel = require('../model/index')

// Signup strategy
passport.use('signup', new LocalStrategy({
  usernameField: "email",
  passwordField: "password"
}, async (email, password, done)=>{
  try {
    // Create user in DB
    // TODO: use userModel.exists() to see if the email exists already
    // if (userModel.exists({email: email})) {
    //   console.log('what?')
    //   return done(null, false, {message: 'User already exists'})
    // }
    const user = await userModel.create({email,password})
    done(null,user)
    
  } catch (error) {
    return done(error)
  }
}))