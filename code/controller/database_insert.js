const database = require('./database_header')

database.getDatabase().then(db => db.connect())

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

exports.insertProject = function (projectName, ownerName, description = null) {
    return new Promise((resolve, reject) => {
        if (!projectName) reject(new Error('projectName is required'))
        if (!ownerName) reject(new Error('ownerName is required'))
        if (description) {
            description = '\'' + description + '\''
        }
        const insertQuery = 'INSERT INTO projects VALUES ( \'' + projectName + '\', \'' + ownerName + '\', ' + description + ');'
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

// exports.insertIssue

// this.insertUser('jane', 'jane@jane', 'JJ').catch(e => console.log(e))

// this.insertProject('project1', 'jane', 'tres beau').catch(e => console.log(e))
// this.insertProject('project2', 'joe').catch(e => console.log(e))

// this.insertTask('1', 'la tache', 'done', 'project1', '12').catch(e => console.log(e))
// this.insertTask('2', 'la tache 2', 'done', 'project1').catch(e => console.log(e))

// this.insertIssue(1, 'la issue', 3, 'high', 'US_12', 'done', 'pro2').catch(e => console.log(e))
// this.insertIssue(2, 'la issue 2', 1, 'low', 'US_14', 'not done', 'pro1').catch(e => console.log(e))

database.getDatabase().then(db => db.end())
