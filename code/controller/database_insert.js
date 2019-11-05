const database = require('./database_header')

database.getDatabase().connect()

exports.insertUser = function (name, email, password) {
    const insertQuery = 'INSERT INTO users VALUES ( \'' + name + '\', \'email\', \'' + password + '\');'
    database.getDatabase().query(insertQuery, function (err, results) {
        if (err) return err
        console.log('The solution is: ', err)
        return results
    })
}

exports.insertUser = function (name, email, password) {
    const insertQuery = 'INSERT INTO users VALUES ( \'' + name + '\', \'email\', \'' + password + '\');'
    database.getDatabase().query(insertQuery, function (err, results) {
        if (err) throw err
        console.log('The solution is: ', results)
    })
}

this.insertUser('jane', 'jane@jane.com', 'passJane')

database.getDatabase().end()
