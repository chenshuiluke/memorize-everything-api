const express = require('express')
const { setErrorResponse } = require('../errors')
const router = express.Router()
const validator = require('../middleware/validator')
const authValidators = require('../validators/auth.validators')

const User = require('../database/models/index').User
const bcrypt = require('bcrypt')
const { registerUser, loginUser } = require('../services/user.service')
const passport = require('../passport')
const { isLoggedIn } = require('../middleware/auth')
router.post(
    '/register',
    validator(authValidators.registerUser),
    async (req, res) => {
        try {
            await registerUser(req.body)
            res.end()
        } catch (error) {
            return setErrorResponse(res, error)
        }
    }
)

router.post('/login', passport.authenticate('local'), loginUser)

router.get('/current', isLoggedIn, (req, res) => {
    console.log('@@@ req', req.user)
    return res.json(req.user)
})

module.exports = router
