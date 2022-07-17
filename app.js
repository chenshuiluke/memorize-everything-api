const path = require('path')

require('dotenv').config({
    path: path.relative(
        process.cwd(),
        path.join(__dirname, process.env.ENVFILE)
    ),
})

const bodyParser = require('body-parser')

const express = require('express')
const app = express()

app.use(bodyParser.json())

app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.json({
        error: err,
    })
})

const authRoutes = require('./routes/auth.routes')

app.get('/health-check', (req, res) => {
    return res.json({
        status: 'ok',
    })
})

app.use('/auth', authRoutes)
module.exports = app
