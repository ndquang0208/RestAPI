require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 8081
const hostname = process.env.HOST_NAME
const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./routes/web.js')
const connection = require('./config/database.js')

// config req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



configViewEngine(app)
app.use('/', webRoutes)

app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})

