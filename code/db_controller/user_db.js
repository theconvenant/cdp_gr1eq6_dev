const database = require('./database_header')

/**
 * @param {String} userName
 */
exports.findUserByName = function (userName) {
    return new Promise((resolve, reject) => {
        if (!userName) reject(new Error('userName is required'))
        const selectQuery = 'SELECT * FROM users WHERE username = \'' + userName + '\';'
        database.getDatabase().then(
            db => db.query(selectQuery, function (err, results) {
                if (err) {
                    reject(err.sqlMessage)
                }
                resolve(results[0])
            })
        )
    })
}

/**
 * @param {String} name
 * @param {String} email
 * @param {String} password
 */
exports.insertUser = function (name, email, password) {
    return new Promise((resolve, reject) => {
        if (!name) reject(new Error('username is required'))
        if (!email) reject(new Error('email is required'))
        if (!password) reject(new Error('password is required'))
        const insertQuery = 'INSERT INTO users VALUES ( \'' + name + '\', \'' + email + '\', \'' + password + '\');'
        database.getDatabase().then(
            db => db.query(insertQuery, function (err, results) {
                if (err) {
                    reject(err.sqlMessage)
                }
                resolve(results)
            })
        )
    })
}
exports.deleteAccount = function (userName) {
    return new Promise((resolve, reject) => {
        if (!userName) reject(new Error('projectName is required'))
        const deleteQuery = 'DELETE FROM users WHERE username = \'' + userName + '\';'
        database.getDatabase().then(
            db => db.query(deleteQuery, function (err, results) {
                if (err) {
                    reject(err.sqlMessage)
                }
                resolve(results)
            })
        )
    })
}