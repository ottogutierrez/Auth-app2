const mongoose = require('mongoose')
const schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new schema({
  email: {
    type: String,
    unique: true,
    index: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: false
  }
})

userSchema.pre('save', async function(){
  // Get the user and hash the password before saving
  const user = this
  const hash = await bcrypt.hash(user.password,10)
  user.password = hash
})

// Validation of password
userSchema.methods.validatePassword = async function(password){
  const user = this
  const isValid = await bcrypt.compare(password,user.password)
  return isValid
}

const userModel = mongoose.model('user',userSchema)

module.exports = userModel