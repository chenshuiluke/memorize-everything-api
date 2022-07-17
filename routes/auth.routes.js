const express = require('express')
const { setErrorResponse } = require('../errors')
const router = express.Router()
const validator = require('../middleware/validator')
const authValidators = require('../validators/auth.validators')

const User = require('../database/models/index').User

router.post(
    '/register',
    validator(authValidators.registerUser),
    async (req, res) => {
        try {
            //@@@ TODO: Hash this password
            const user = await User.query().insert(req.body)
            res.end()
        } catch (error) {
            return setErrorResponse(res, error)
        }
    }
)

module.exports = router
