const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const userModel = require('../model/index')

// Signup strategy
passport.use('signup', new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true
}, async (req,email, password, done)=>{
  try {
    // Create user in DB
    // TODO: use userModel.exists() to see if the email exists already
    const userExists = await userModel.exists({email: email})
    if (userExists) {
      // User already exists, cannot create it
      return done(null, false, {message: 'Username already exists'})
    }
    // User does not exist, create the new user
    const user = await userModel.create({email,password})
    done(null,user)
    
  } catch (error) {
    return done(error)
  }
}))


