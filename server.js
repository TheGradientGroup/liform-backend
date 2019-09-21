// environment variable config
require('dotenv').config()

const express = require('express')
const app = express()
const LISTEN_PORT = 3000

app.get('/', (req, res) => { 
    res.send('liform api 1.0 (hackrice)')
})



app.listen(LISTEN_PORT, () => console.log(`Example app listening on port ${LISTEN_PORT}!`))