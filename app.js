const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const authRoute = require('./routes/auth')
const analyticsRoute = require('./routes/analytics')
const categoryRoute = require('./routes/category')
const orderRoute = require('./routes/order')
const positionRoute = require('./routes/position')

const app = express()

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