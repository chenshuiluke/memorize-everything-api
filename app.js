const path = require('path')
require('dotenv').config({
    path: path.relative(
        process.cwd(),
        path.join(__dirname, process.env.ENVFILE)
    ),
})
const express = require('express')
const app = express()

const knex = require('./database/models')

app.get('/health-check', (req, res) => {
    return res.json({
        status: 'ok',
    })
})
module.exports = app
