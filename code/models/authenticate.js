exports.passport = require('passport')
const Strategy = require('passport-local').Strategy
const dbSelect = require('../controller/database_select')

this.passport.use(new Strategy(function (username, password, callback) {
    dbSelect.findUserByName(username).then(
        user => {
            if (user.password !== password) {
                return callback(null, false)
            }
            return callback(null, user)
        }
    ).catch(err => callback(err))
}))

this.passport.serializeUser(function (user, callback) {
    callback(null, user.username)
})

this.passport.deserializeUser(function (username, callback) {
    dbSelect.findUserByName(username).then(
        user => {
            return callback(null, user)
        }
    ).catch(err => callback(err))
})
