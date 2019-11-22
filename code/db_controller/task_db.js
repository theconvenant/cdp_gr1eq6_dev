const database = require('./database_header')

exports.findTasksByProjectId = function (projectId) {
    return new Promise((resolve, reject) => {
        if (!projectId) reject(new Error('projectId is required'))
        const taskListQuery =
        'SELECT * FROM tasks WHERE _project_id = ' + projectId + ';'
        database.getDatabase().then(
            db => db.query(taskListQuery, function (err, results) {
                if (err) {
                    reject(err.sqlMessage)
                }
                resolve(JSON.parse(JSON.stringify(results)))
            })
        )
    })
}

/**
 * @param {number} projectId
 * @param {number} taskId
 */
exports.findUserOfTask = function (projectId, taskId) {
    return new Promise((resolve, reject) => {
        if (!projectId) reject(new Error('projectId is required'))
        if (!taskId) reject(new Error('taskId is required'))
        const userQuery = 'SELECT _user_name FROM tasks_users WHERE _task_id = ' + taskId
        database.getDatabase().then(
            db => db.query(userQuery, function (err, results) {
                if (err) {
                    reject(err.sqlMessage)
                }
                resolve(JSON.parse(JSON.stringify(results)))
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
 * @param {number} taskId
 */
exports.deleteTask = function (projectId, taskId) {
    return new Promise((resolve, reject) => {
        if (!taskId) reject(new Error('taskId is required'))
        if (!projectId) reject(new Error('projectId is required'))
        const deleteQuery = 'DELETE FROM tasks WHERE _task_id = ' + taskId + ' AND _project_id = ' + projectId + ';'
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
