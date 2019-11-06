const database = require('./database_header')

exports.findUserByName = function (userName, callback) {
    process.nextTick(function () {
        database.getDatabase().query('SELECT * FROM users WHERE username = \'' + userName + '\';', function (err, results) {
            if (err) throw err
            const res = results[0]
            callback(null, res)
        })
    })
}

exports.findProjectByUsername = function (userName) {
    database.getDatabase().query('', function (results) {

    })
}
