// environment variable config
require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const LISTEN_PORT = process.env.PORT
var db = require('./model/Database')  
var adminRoutes = require('./routes/admin')
const searchRoute = require('./routes/search')
const proceduresRoute = require('./routes/procedures')
const hospitalsRoute = require('./routes/hospitals')
const cors = require('cors')

app.use(cors())

app.use(bodyParser.json())
app.use('/admin', adminRoutes)
app.use('/search', searchRoute)
app.use('/procedures', proceduresRoute)
app.use('/hospitals', hospitalsRoute)

app.get('/', (req, res) => { 
    res.send('liform api 1.0 (hackrice)')
})



app.listen(LISTEN_PORT, () => console.log(`Example app listening on port ${LISTEN_PORT}!`))