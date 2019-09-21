var express = require('express')
var app = express.Router()
var codeRoutes = require('./coderoutes')

app.use('/code', codeRoutes)

module.exports = app
