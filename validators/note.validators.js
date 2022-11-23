const Yup = require('yup')

module.exports = {
    createNote: Yup.object({
        body: Yup.object()
            .shape({
                content: Yup.string().max(255).min(1),
            })
            .noUnknown()
            .required(),
    }),
}
