const database = require('./database_header')

database.getDatabase().then(db => db.connect())

// All function return a list of RawDataPaquet with the requested values

// return all infos of a user by it's user name
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

// return a list of the name of the projects wich are own by OwnerName
exports.findListProjectNameByOwnerName = function (ownerName) {
    return new Promise((resolve, reject) => {
        if (!ownerName) reject(new Error('userName is required'))
        const findProjectName = 'SELECT _project_name FROM projects WHERE _owner_name = \'' + ownerName + '\';'
        database.getDatabase().then(
            db => db.query(findProjectName, function (err, results) {
                if (err) {
                    reject(err.sqlMessage)
                }
                resolve((results))
            })
        )
    })
}

// return a list of project's name where userName is a member of
exports.findListProjectNameByUser = function (userName) {
    return new Promise((resolve, reject) => {
        if (!userName) reject(new Error('userName is required'))
        const findProjectName = 'SELECT _project_name FROM projects_users WHERE _user_name = \'' + userName + '\';'
        database.getDatabase().then(
            db => db.query(findProjectName, function (err, results) {
                if (err) {
                    reject(err.sqlMessage)
                }
                resolve(results)
            })
        )
    })
}

// return all infos of the project named projectName
exports.findProjectByName = function (projectName) {
    return new Promise((resolve, reject) => {
        if (!projectName) reject(new Error('projectName is required'))
        const project = 'SELECT * FROM projects WHERE _project_name = \'' + projectName + '\';'
        database.getDatabase().then(
            db => db.query(project, function (err, results) {
                if (err) {
                    reject(err.sqlMessage)
                }
                resolve(results)
            })
        )
    })
}

this.findListProjectNameByOwnerName('jane').then(names => console.log(names))

this.findProjectByName('project1').then(names => console.log(names))

database.getDatabase().then(db => db.end())
