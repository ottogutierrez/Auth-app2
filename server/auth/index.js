const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const userModel = require('../model/index')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

// Signup strategy
// TODO: create some validation to restrict the password to certain characters and length 
passport.use('signup', new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true
}, async (req,email, password, done)=>{
  try {
    // Create user in DB
    const userExists = await userModel.exists({email: email})
    if (userExists) {
      // User already exists, cannot create it
      return done(null, false, {message: 'Username already exists'})
    }
    // User does not exist, create the new user
    const user = await userModel.create({email,password,bio:req.body.bio})
    done(null,user)
    
  } catch (error) {
    return done(error)
  }
}))


// Signin strategy

passport.use('signin', new LocalStrategy({
  usernameField: "email",
  passwordField: "password"
}, async (email,password, done)=>{
  try {
    // Find the username (email)
    const user = await userModel.findOne({email:email})
    if (!user) {
      // user does not exist
      return done(null,false,{message: 'User does not exist'})
    }
    // Validate password
    const passwordIsValid = await user.validatePassword(password)
    if (!passwordIsValid) {
      return done(null,false,{message: "Password is incorrect"})
    }
    // User is validated
    done(null,user)

  } catch (error) {
    done(error)
  }
}))

// Protected Route strategy
var opts = {}
opts.secretOrKey = process.env.JWT_SECRET
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()

passport.use('jwt', new JwtStrategy(opts, async (jwt_payload, done)=>{
  try {
    const username = jwt_payload.user
    done(null,username)
  } catch (error) {
    done(error)
  }
}))