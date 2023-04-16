const { User } = require('../database/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const registerUser = async (data) => {
    const newRecord = {
        ...data,
    }
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10)
    // now we set user password to hashed password
    const password = await bcrypt.hash(newRecord.password, salt)
    newRecord.password = password
    const user = await User.query().insert(data)
}

const loginUser = async (req, res) => {
    console.log('@@@ here', req.user)
    jwt.sign({ user: req.user }, process.env.COOKIE_SECRET, (err, token) => {
        console.log('@@@ in handler', err, token)
        if (err) return res.json(err)

        // Send Set-Cookie header
        res.cookie('jwt', token, {
            httpOnly: true,
            // sameSite: true,
            // signed: true,
            // secure: true,
        })

        // Return json web token
        return res.json({
            jwt: token,
        })
    })
}

const authenticateUser = async (email, password, done) => {
    console.log('@@@ before query', email, password)
    const user = await User.query().where('email', '=', email).first()
    console.log('@@@ After query', user)
    console.log(user)
    if (user != null) {
        console.log('@@@ password equality:', user.password === password)
        if (user.password == password) {
            return done(null, {
                id: user.id,
            })
        }
    }
}

module.exports = {
    registerUser,
    loginUser,
    authenticateUser,
}
