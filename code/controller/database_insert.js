const database = require('./database_header')

// ----------------------------------------------------------- voir si l'email et Password sont nécessaire (NON NULL)
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

// -------------------------------------------------------------- penser à ajouter automatiquement dans projectUser
exports.insertProject = function (projectName, ownerName, description = null) {
    return new Promise((resolve, reject) => {
        if (!projectName) reject(new Error('projectName is required'))
        if (!ownerName) reject(new Error('ownerName is required'))
        if (description) {
            description = '\'' + description + '\''
        }
        const insertQuery = 'INSERT INTO projects(_project_name,_owner_name,description) VALUES ( \'' + projectName + '\', \'' + ownerName + '\', ' + description + ');'
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

exports.insertUserProject = function (userName, projectName) {
    return new Promise((resolve, reject) => {
        if (!projectName) reject(new Error('projectName is required'))
        if (!userName) reject(new Error('userName is required'))
        const insertQuery = 'INSERT INTO projects_users VALUES ( \'' + userName + '\', \'' + projectName + '\');'
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
// if issueId exist, I have to add to it ' before and after for the SQL command line
exports.insertTask = function (taskId, description, state, projectName, issueId = null) {
    return new Promise((resolve, reject) => {
        if (!taskId) reject(new Error('taskId is required'))
        if (!description) reject(new Error('description is required'))
        if (!state) reject(new Error('state is required'))
        if (issueId) {
            issueId = '\'' + issueId + '\''
        }
        const insertQuery = 'INSERT INTO tasks VALUES ( \'' + taskId + '\', \'' +
        description + '\', \'' + state + '\', ' + issueId + ', \'' + projectName + '\');'
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

// exports.insertTaskTask
// exports.insertTaskUsers

// issueId and difficulty are Integers, the rest are Strings
// this is why they both are not souronded by ' in the insertQuery String
exports.insertIssue = function (issueId, description, difficulty, priority, usNum, testState, projectName) {
    return new Promise((resolve, reject) => {
        if (!issueId) reject(new Error('issueId is required'))
        if (!description) reject(new Error('description is required'))
        if (!difficulty) reject(new Error('difficulty is required'))
        if (!priority) reject(new Error('priority is required'))
        if (!usNum) reject(new Error('usNum is required'))
        if (!testState) reject(new Error('testState is required'))
        if (!projectName) reject(new Error('projectName is required'))
        const insertQuery = 'INSERT INTO issues VALUES (' + issueId + ', \'' +
        description + '\', ' + difficulty + ', \'' + priority + '\', \'' + usNum + '\', \'' + testState + '\', \'' + projectName + '\');'
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
