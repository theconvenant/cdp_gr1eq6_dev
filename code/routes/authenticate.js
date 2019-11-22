const passport = require('passport')
const Strategy = require('passport-local').Strategy
const userDb = require('../db_controller/user_db')

passport.use(new Strategy(function (username, password, callback) {
    userDb.findUserByName(username).then(
        user => {
            if (user !== undefined) {
                if (user.password !== password) {
                    return callback(null, false)
                }
                return callback(null, user)
            }
        }
    ).catch(err => callback(err))
}))

passport.serializeUser(function (user, callback) {
    callback(null, user.username)
})

passport.deserializeUser(function (username, callback) {
    userDb.findUserByName(username).then(
        user => {
            return callback(null, user)
        }
    ).catch(err => callback(err))
})

exports.passport = passport
