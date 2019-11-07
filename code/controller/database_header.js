var mysql = require('mysql')

const database = mysql.createConnection({
    host: 'dbserver.emi.u-bordeaux.fr',
    user: 'agourgue',
    password: 'cdp2019',
    database: 'agourgue'
})

exports.getDatabase = function () {
    return new Promise((resolve) => {
        resolve(database)
    })
}
