const path = require('path')
console.log(
    '@@@ path',
    path.relative(process.cwd(), path.join(__dirname, process.env.ENVFILE))
)
require('dotenv').config({
    path: path.relative(
        process.cwd(),
        path.join(__dirname, process.env.ENVFILE)
    ),
})

const session = require('express-session')
const bodyParser = require('body-parser')

const express = require('express')
const app = express()
const passport = require('./passport')

app.use(bodyParser.json())

app.use(
    session({
        secret: process.env.COOKIE_SECRET,
    })
)

app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.json({
        error: err,
    })
})

const authRoutes = require('./routes/auth.routes')
const noteRoutes = require('./routes/note.routes')
const { isLoggedIn } = require('./middleware/auth')

app.get('/health-check', (req, res) => {
    return res.json({
        status: 'ok',
    })
})
app.use(passport.session())
app.use('/auth', authRoutes)
app.use('/note', isLoggedIn, noteRoutes)
module.exports = app
