const supertest = require('supertest')
const { setErrorResponse, customErrors } = require('../errors')

test('Custom Error Response', async () => {
    try {
        throw new Error('Catastrophic failure :)')
    } catch (error) {
        const resMock = {
            name: '',
            message: '',
            statusCode: '',
            status: function (code) {
                this.statusCode = code
                return this
            },
            json: function (response) {
                this.name = response.name
                this.message = response.message
            },
        }
        resMock.status = resMock.status.bind(resMock)
        setErrorResponse(resMock, error)
        expect(resMock.statusCode).toBe(customErrors.SystemError.statusCode)
    }
})
