var express = require('express')
var app = express.Router()
var codeRoutes = require('./coderoutes')
var userDataRoutes = require('./submissions')
var importerRoutes = require('./importer')

app.use('/code', codeRoutes)
app.use('/submissions', userDataRoutes)
app.use('/importer', importerRoutes)

module.exports = app