const express = require('express')
const volleyball = require('volleyball')
require('dotenv').config()

const app = express()

app.use(volleyball)

// Create port
const port = process.env.PORT || 5000

// Middleware
const auth = require('./routes/auth')
app.use('/auth',auth)


// Create server
app.listen(port, ()=> console.log(`Server listening on port ${port}`))