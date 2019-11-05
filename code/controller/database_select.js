const database = require('database_header').database

database.connect()

function getname(){
    connection.query('SELECT * FROM users ;', function (err, results, fields) {
        if (err) throw err
        console.log('The solution is: ', results)
    })
}

database.end()
