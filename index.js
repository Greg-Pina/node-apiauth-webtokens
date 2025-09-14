const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/config.env' })

// Connect to DB
connectDB()

// Import Routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')

// Middleware
app.use(express.json())

// Route Middleware
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)

app.listen(3000, () => console.log('Server is up and running'))
