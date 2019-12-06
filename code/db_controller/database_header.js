var mysql = require('mysql')

const database = mysql.createConnection({
    host: 'mysql',
    user: 'agourgue',
    password: 'cdp2019',
    database: 'agourgue',
    ports:'3306'
})

exports.getDatabase = function () {
    return new Promise((resolve) => {
        resolve(database)
    })
}
