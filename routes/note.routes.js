const express = require('express')
const Note = require('../database/models/index').Note
const { setErrorResponse } = require('../errors')
const router = express.Router()
const validator = require('../middleware/validator')
const { createNote } = require('../validators/note.validators')
const { isLoggedIn } = require('../middleware/auth')

router.post('/', isLoggedIn, validator(createNote), async (req, res) => {
    try {
        const data = {
            ...req.body,
            user_id: req.user.id,
        }
        const note = await Note.query().insert(data)
        res.json(note)
    } catch (error) {
        return setErrorResponse(res, error)
    }
})

module.exports = router
