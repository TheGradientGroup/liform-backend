var express = require('express')
var app = express.Router()
var codeRoutes = require('./coderoutes')
var userDataRoutes = require('./submissions')

app.use('/code', codeRoutes)
app.use('/submissions', userDataRoutes)

module.exports = app
