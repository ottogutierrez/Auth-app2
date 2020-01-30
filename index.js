const express = require('express')
const volleyball = require('volleyball')
const mongoose = require('mongoose')
require('dotenv').config()

require('./auth/index')

const app = express()
app.use(express.urlencoded({extended:true}))

app.use(volleyball)

// Create port
const port = process.env.PORT || 5000

// Connect to mongoDB
mongoose.connect('mongodb://authapp2:authapp22@ds257054.mlab.com:57054/auth-app2',{
  useNewUrlParser:true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
// call back for errors
mongoose.connection.on('error', error => console.log(error))

// Middleware
const auth = require('./routes/auth-routes')
app.use('/auth',auth)


// Create server
app.listen(port, ()=> console.log(`Server listening on port ${port}`))