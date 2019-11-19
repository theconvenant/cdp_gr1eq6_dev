const database = require('./database_header')

// ----------------------------------------------------------- voir si l'email et Password sont nécessaire (NON NULL)
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

// -------------------------------------------------------------- penser à ajouter automatiquement dans projectUser
exports.insertUserProject = function (userName, projectId) {
    return new Promise((resolve, reject) => {
        if (!projectId) reject(new Error('projectName is required'))
        if (!userName) reject(new Error('userName is required'))
        const insertQuery = 'INSERT INTO projects_users VALUES ( \'' + userName + '\', ' + projectId + ');'
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
        if (!projectName) reject(new Error('projectId is required'))
        if (!ownerName) reject(new Error('ownerName is required'))
        if (description) {
            description = '\'' + description + '\''
        }
        const insertQuery = 'INSERT INTO projects (_project_name, _owner_name, description) VALUES ( \'' + projectName + '\', \'' + ownerName + '\', ' + description + ');'
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
exports.insertTask = function (taskId, description, state, projectId, issueId = null) {
    return new Promise((resolve, reject) => {
        if (!taskId) reject(new Error('taskId is required'))
        if (!description) reject(new Error('description is required'))
        if (!state) reject(new Error('state is required'))
        if (!projectId) reject(new Error('projectId is required'))
        if (issueId) {
            issueId = '\'' + issueId + '\''
        }
        const insertQuery = 'INSERT INTO tasks VALUES ( \'' + taskId + '\', \'' +
        description + '\', \'' + state + '\', ' + issueId + ', ' + projectId + ');'
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

/**
 * @param {number} taskId
 * @param {number} dependencyTaskId the task on which the first task depends on
 */
exports.insertTaskTask = function (taskId, dependencyTaskId) {
    return new Promise((resolve, reject) => {
        if (!taskId) reject(new Error('taskId is required'))
        if (!dependencyTaskId) reject(new Error('dependencyTaskId is required'))
        const insertQuery = 'INSERT INTO tasks_tasks VALUES  (' + taskId + ', ' + dependencyTaskId + ');'
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

/**
 * @param {number} taskId
 * @param {String} userName
 */
exports.insertTaskUser = function (taskId, userName) {
    return new Promise((resolve, reject) => {
        if (!taskId) reject(new Error('taskId is required'))
        if (!userName) reject(new Error('userName is required'))
        const insertQuery = 'INSERT INTO tasks_users VALUES  (' + taskId + ', \'' + userName + '\');'
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

// issueId and difficulty are Integers, the rest are Strings
// this is why they both are not souronded by ' in the insertQuery String
exports.insertIssue = function (issueId, description, difficulty, priority, usNum, testState, projectId) {
    return new Promise((resolve, reject) => {
        if (!issueId) reject(new Error('issueId is required'))
        if (!description) reject(new Error('description is required'))
        if (!difficulty) reject(new Error('difficulty is required'))
        if (!priority) reject(new Error('priority is required'))
        if (!usNum) reject(new Error('usNum is required'))
        if (!testState) reject(new Error('testState is required'))
        if (!projectId) reject(new Error('projectId is required'))
        const insertQuery = 'INSERT INTO issues VALUES (' + issueId + ', \'' +
        description + '\', ' + difficulty + ', \'' + priority + '\', \'' + usNum + '\', \'' + testState + '\', ' + projectId + ');'
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

/**
 * @param {number} issueId
 * @param {number} releaseId
 */
exports.insertIssueInRelease = function (issueId, releaseId) {
    return new Promise((resolve, reject) => {
        if (!issueId) reject(new Error('issueId is required'))
        if (!releaseId) reject(new Error('releaseId is required'))
        const insertQuery = 'INSERT INTO releases_issues VALUES (' + issueId + ', ' + releaseId + ');'
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

/**
 * @param {number} issueId
 * @param {number} sprintId
 */
exports.insertIssueInSprint = function (issueId, sprintId) {
    return new Promise((resolve, reject) => {
        if (!issueId) reject(new Error('issueId is required'))
        if (!sprintId) reject(new Error('sprintId is required'))
        const insertQuery = 'INSERT INTO sprints_issues VALUES (' + issueId + ', ' + sprintId + ');'
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

/**
 * @param {String} name
 * @param {String} startDate the format must be 'YYY-MM-DD'
 * @param {String} endDate the format must be 'YYY-MM-DD'
 * @param {number} projectId
 * @param {String} description not necessary
 */
exports.insertSprint = function (name, startDate, endDate, projectId, description = null) {
    return new Promise((resolve, reject) => {
        if (!name) reject(new Error('name is required'))
        if (!startDate) reject(new Error('startDate is required'))
        if (!endDate) reject(new Error('endDate is required'))
        if (!projectId) reject(new Error('projectId is required'))
        if (description) {
            description = '\'' + description + '\''
        }
        const insertQuery = 'INSERT INTO sprints VALUES ( \'' + name + '\', \'' + startDate + '\', \'' + endDate + '\', ' + description + ', ' + projectId + ');'
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

/**
 * @param {number} projectId
 * @param {number} taskId
 * @param {String} description
 * @param {String} state
 * @param {number} issueId
 */
exports.updateTask = function (projectId, taskId, description, state, issueId = null) {
    return new Promise((resolve, reject) => {
        if (!projectId) reject(new Error('projectId is required'))
        if (!taskId) reject(new Error('taskId is required'))
        if (!description) reject(new Error('description is required'))
        if (!state) reject(new Error('state is required'))
        const updateQuery = 'UPDATE tasks SET description = \'' + description + '\', state = \'' + state + '\', _issue_id = ' + issueId +
        ' WHERE _task_id = ' + taskId + ' AND _project_id = ' + projectId
        database.getDatabase().then(
            db => db.query(updateQuery, function (err, results) {
                if (err) {
                    reject(err.sqlMessage)
                }
                resolve(results)
            })
        )
    })
}

/**
 * @param {number} projectId
 * @param {number} issueId
 * @param {String} description
 * @param {number} difficulty
 * @param {String} prority
 * @param {String} usNum
 * @param {String} testState
 */
exports.updateIssue = function (projectId, issueId, description, difficulty, prority, usNum, testState) {
    return new Promise((resolve, reject) => {
        if (!projectId) reject(new Error('projectId is required'))
        if (!issueId) reject(new Error('issueId is required'))
        if (!description) reject(new Error('description is required'))
        if (!difficulty) reject(new Error('difficulty is required'))
        if (!prority) reject(new Error('prority is required'))
        if (!usNum) reject(new Error('usNum is required'))
        if (!testState) reject(new Error('testState is required'))
        const updateQuery = 'UPDATE issues SET description = \'' + description + '\', difficulty = ' + difficulty + ', prority = \'' + prority +
        '\', us_num = \'' + usNum + '\', test_state = \'' + testState + ' WHERE _issue_id = ' + issueId + ' AND _project_id = ' + projectId
        database.getDatabase().then(
            db => db.query(updateQuery, function (err, results) {
                if (err) {
                    reject(err.sqlMessage)
                }
                resolve(results)
            })
        )
    })
}

// exports.associateReleaseToSprint = function (releaseId, sprintName) {
//     //
// }
