const express = require('express')
const Note = require('../database/models/index').Note
const { setErrorResponse } = require('../errors')
const router = express.Router()
const validator = require('../middleware/validator')
const { createNote } = require('../validators/note.validators')

router.post('/', validator(createNote), async (req, res) => {
    try {
        //@@@ TODO: Hash this password
        const note = await Note.query().insert(req.body)
        res.end()
    } catch (error) {
        return setErrorResponse(res, error)
    }
})

module.exports = router
