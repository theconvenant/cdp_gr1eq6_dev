const database = require('./database_header')

database.getDatabase().connect()

exports.findUserByName = function (userName) {
    database.getDatabase().query('SELECT * FROM users WHERE name = \'' + userName + '\';', function (err, results) {
        if (err) throw err
        console.log('The solution is: ', results)
    })
}

this.findUserByName('jane')

database.getDatabase().end()
