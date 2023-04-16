const isLoggedIn = (req, res, next) => {
    if (req.user == null) {
        return res.status(401).end()
    } else {
        return next()
    }
}

module.exports = {
    isLoggedIn,
}
