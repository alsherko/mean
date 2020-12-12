const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const authRoute = require('./routes/auth')
const analyticsRoute = require('./routes/analytics')
const categoryRoute = require('./routes/category')
const orderRoute = require('./routes/order')
const positionRoute = require('./routes/position')
const keys = require('./config/keys')

const app = express()

mongoose.connect(keys.mongoURL)
    .then(() => console.log('Mongo connected'))
    .catch(error => console.log(error))

app.use(passport.initialize())
require('./middleware/passtort')(passport)

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

app.use('/api/auth', authRoute)
app.use('/api/analytics', analyticsRoute)
app.use('/api/category', categoryRoute)
app.use('/api/order', orderRoute)
app.use('/api/position', positionRoute)

module.exports = app