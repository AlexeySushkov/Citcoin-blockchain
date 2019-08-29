const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')
// const fs = require('fs')
const path = require('path')
const rfs = require('rotating-file-stream')

const app = express()
app.use(morgan('combined'))
// create a write stream (in append mode)
// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// create a rotating write stream
var accessLogStream = rfs('access.log', { interval: '1d', path: path.join(__dirname, 'log') })
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

app.use(bodyParser.json())
app.use(cors())

require('./routes')(app)

app.listen(config.port)
console.log('Server started on port:', config.port)
