const database = require('./database_header')

database.getDatabase().then(db => db.connect())

exports.insertUser = function (name, email, password) {
    return new Promise((resolve, reject) => {
        if (!name) reject(new Error('username is required'))
        if (!email) reject(new Error('email is required'))
        if (!password) reject(new Error('password is required'))
        const insertQuery = 'INSERT INTO users VALUES ( \'' + name + '\', \'email\', \'' + password + '\');'
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

exports.insertProject = function (projectName, ownerName, description) { // ----------- with no description --------
    return new Promise((resolve, reject) => {
        if (!projectName) reject(new Error('projectName is required'))
        if (!ownerName) reject(new Error('ownerName is required'))
        if (!description) {
            var insertQuery = 'INSERT INTO projects (_project_name, _owner_name) VALUES ( \'' + projectName + '\', \'' + ownerName + '\');'
        } else {
            insertQuery = 'INSERT INTO projects VALUES ( \'' + projectName + '\', \'' + ownerName + '\', \'' + description + '\');'
        }
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

exports.insertProjectUser = function (projectName, userName) {
    return new Promise((resolve, reject) => {
        if (!projectName) reject(new Error('projectName is required'))
        if (!userName) reject(new Error('userName is required'))
        const insertQuery = 'INSERT INTO projects_users VALUES ( \'' + projectName + '\', \'' + userName + '\');'
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
exports.insertTask = function (taskId, description, state, issueId, projectName) {
    return new Promise((resolve, reject) => {
        if (!taskId) reject(new Error('taskId is required'))
        if (!description) reject(new Error('description is required'))
        if (!state) reject(new Error('state is required'))
        if (!issueId) {
            if (!projectName) {
                var insertQuery = 'INSERT INTO tasks VALUES ( \'' + taskId + '\', \'' +
                 description + '\', \'' + state + '\');'
            }
            insertQuery = 'INSERT INTO tasks VALUES ( \'' + taskId + '\', \'' +
             description + '\', \'' + state + '\', ?? , \'' + projectName + '\');'
        }
        if (!projectName) {
            insertQuery = 'INSERT INTO tasks VALUES ( \'' + taskId + '\', \'' +
             description + '\', \'' + state + '\', \'' + issueId + '\');'
        } else {
            insertQuery = 'INSERT INTO tasks VALUES ( \'' + taskId + '\', \'' +
             description + '\', \'' + state + '\', \'' + issueId + '\', \'' + projectName + '\');'
        }
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

this.insertUser('jane', 'jane@jane.com', 'passJane').catch(e => console.log(e))
this.insertUser('bob', 'bob@bob.com', 'passBob').catch(e => console.log(e))

this.insertProject('project1', 'jane').catch(e => console.log(e))
this.insertProject('project2', 'jane').catch(e => console.log(e))

this.insertProjectUser('jane', 'project1').catch(e => console.log(e))

database.getDatabase().then(db => db.end())
