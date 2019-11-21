const passport = require('passport')
const Strategy = require('passport-local').Strategy
const dbSelect = require('../db_controller/database_select')

passport.use(new Strategy(function (username, password, callback) {
    dbSelect.findUserByName(username).then(
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
    dbSelect.findUserByName(username).then(
        user => {
            return callback(null, user)
        }
    ).catch(err => callback(err))
})

exports.passport = passport
