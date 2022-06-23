const express = require('express')
const router = express.Router()
const validator = require('../middleware/validator')
const authValidators = require('../validators/auth.validators')

const User = require('../database/models/user')
require('../database/models/index')
router.post(
    '/register',
    validator(authValidators.registerUser),
    async (req, res) => {
        //@@@ TODO: Hash this password
        const user = await User.query().insert(req.body)
        res.end()
    }
)

module.exports = router
