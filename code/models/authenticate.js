exports.passport = require('passport')
const Strategy = require('passport-local').Strategy
const dbSelect = require('../controller/database_select')

this.passport.use(new Strategy(function (username, password, callback) {
    dbSelect.findUserByName(username, function (err, user) {
        if (err) { callback(err) }
        if (user.password !== password) { return callback(null, false) }
        return callback(null, user)
    })
}))
this.passport.serializeUser(function (user, callback) {
    callback(null, user.username)
})
this.passport.deserializeUser(function (username, callback) {
    dbSelect.findUserByName(username, function (err, user) {
        if (err) { return callback(err) }
        callback(null, user)
    })
})
