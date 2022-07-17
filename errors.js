const customErrors = {
    SystemError: {
        message: 'An unexpected error occured. Please try again!',
        statusCode: 500,
    },
}
const buildErrorResponse = (error) => {
    const errorNames = Object.keys(customErrors)
    const response = {}
    if (!errorNames.includes(error.name)) {
        response.name = customErrors.SystemError
        response.message = customErrors.SystemError.message
        response.statusCode = customErrors.SystemError.statusCode
    }
    return response
}
module.exports = {
    setErrorResponse: (res, error) => {
        const errorResponse = buildErrorResponse(error)
        return res.status(errorResponse.statusCode).json(errorResponse)
    },
    customErrors,
}
