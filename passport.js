const passport = require('passport')

const JwtCookieComboStrategy = require('passport-jwt-cookiecombo')
const LocalStrategy = require('passport-local')
const { cookie } = require('express/lib/response')
const { authenticateUser } = require('./services/user.service')
passport.use(
    new LocalStrategy(
        {
            // My users have only email
            usernameField: 'email',
            session: false,
        },
        (email, password, done) => {
            authenticateUser(email, password, done).then()
        }
    )
)
console.log('@@@ COOKIE_SECRET', process.env.COOKIE_SECRET)
passport.use(
    new JwtCookieComboStrategy(
        {
            secretOrPublicKey: process.env.COOKIE_SECRET,
        },
        (payload, done) => {
            console.log('@@@ payload', payload)
            return done(null, payload.user)
        }
    )
)
passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (user, done) {
    console.log('@@@ deserializing', user)
    done(null, user)
})

module.exports = passport
