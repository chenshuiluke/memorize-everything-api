const Yup = require('yup')

module.exports = {
    registerUser: Yup.object({
        body: Yup.object()
            .shape({
                email: Yup.string().max(255).min(1).email().required(),
                username: Yup.string().max(255).min(1).required(),
            })
            .noUnknown()
            .required(),
    }),
}
