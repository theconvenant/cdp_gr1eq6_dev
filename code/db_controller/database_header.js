var mysql = require('mysql')

var database = mysql.createConnection({
    host: 'mysql',
    user: 'agourgue',
    password: 'cdp2019',
    database: 'agourgue',
    ports:'3306'
})

exports.databaseTestConnection() = function () {
    database = mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'agourgue',
      port: '3306',
    })
  }

exports.getDatabase = function () {
    return new Promise((resolve) => {
        resolve(database)
    })
}
