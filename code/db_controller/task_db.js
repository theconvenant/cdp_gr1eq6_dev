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

exports.insertTask = function (taskId, description, state, projectId) {
    return new Promise((resolve, reject) => {
        if (!taskId) reject(new Error('taskId is required'))
        if (!description) reject(new Error('description is required'))
        if (!state) reject(new Error('state is required'))
        if (!projectId) reject(new Error('projectId is required'))
        const insertQuery = 'INSERT INTO tasks VALUES ( \'' + taskId + '\', \'' +
        description + '\', \'' + state + '\', ' + projectId + ');'
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
 * @param {number} projectId
 */
exports.findDependecyTaskList = function (taskId, projectId) {
    return new Promise((resolve, reject) => {
        if (!taskId) reject(new Error('taskId is required'))
        if (!projectId) reject(new Error('projectId is required'))
        const findQuery = 'SELECT * FROM tasks WHERE _project_id = ' + projectId + ' AND _task_id IN (' +
        'SELECT _dependency_task_id FROM tasks_tasks WHERE _task_id = ' + taskId + ')'
        database.getDatabase().then(
            db => db.query(findQuery, function (err, results) {
                if (err) {
                    reject(err.sqlMessage)
                }
                resolve(JSON.parse(JSON.stringify(results)))
            })
        )
    })
}

/**
 * @param {number} depTaskId
 * @param {number} projectId
 */
exports.findTaskListOfDepencyTask = function (depTaskId, projectId) {
    return new Promise((resolve, reject) => {
        if (!depTaskId) reject(new Error('depTaskId is required'))
        if (!projectId) reject(new Error('projectId is required'))
        const findQuery = 'SELECT * FROM tasks WHERE _project_id = ' + projectId + ' AND _task_id IN (' +
        'SELECT _task_id FROM tasks_tasks WHERE _dependency_task_id = ' + depTaskId + ')'
        database.getDatabase().then(
            db => db.query(findQuery, function (err, results) {
                if (err) {
                    reject(err.sqlMessage)
                }
                resolve(JSON.parse(JSON.stringify(results)))
            })
        )
    })
}

/**
 * @param {number} taskId
 * @param {number} dependencyTaskId an task on which the task depends on
 */
exports.removeTaskTask = function (taskId, dependencyTaskId) {
    return new Promise((resolve, reject) => {
        if (!taskId) reject(new Error('taskId is required'))
        if (!dependencyTaskId) reject(new Error('dependencyTaskId is required'))
        const deleteQuery = 'DELETE FROM tasks_tasks WHERE _task_id = ' + taskId + ' AND _dependency_task_id = ' + dependencyTaskId + ';'
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

/**
 * @param {number} taskId
 * @param {number} issueId an issue on which the task depends on
 */
exports.insertTaskIssue = function (taskId, issueId) {
    return new Promise((resolve, reject) => {
        if (!taskId) reject(new Error('taskId is required'))
        if (!issueId) reject(new Error('issueId is required'))
        const insertQuery = 'INSERT INTO tasks_issues VALUES  (' + taskId + ', ' + issueId + ');'
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
 * @param {number} issueId an issue on which the task depends on
 */
exports.removeTaskIssue = function (taskId, issueId) {
    return new Promise((resolve, reject) => {
        if (!taskId) reject(new Error('taskId is required'))
        if (!issueId) reject(new Error('issueId is required'))
        const deleteQuery = 'DELETE FROM tasks_issues WHERE _task_id = ' + taskId + ' AND _issue_id = ' + issueId + ';'
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

/**
 * @param {number} taskId
 * @param {number} projectId
 */
exports.findIssueListOftask = function (taskId, projectId) {
    return new Promise((resolve, reject) => {
        if (!taskId) reject(new Error('taskId is required'))
        if (!projectId) reject(new Error('projectId is required'))
        const findQuery = 'SELECT * FROM issues WHERE _project_id = ' + projectId + ' AND _issue_id IN (' +
        'SELECT _issue_id FROM tasks_issues WHERE _task_id = ' + taskId + ')'
        database.getDatabase().then(
            db => db.query(findQuery, function (err, results) {
                if (err) {
                    reject(err.sqlMessage)
                }
                resolve(JSON.parse(JSON.stringify(results)))
            })
        )
    })
}

/**
 * @param {number} issueId
 * @param {number} projectId
 */
exports.findTaskListOfIssue = function (issueId, projectId) {
    return new Promise((resolve, reject) => {
        if (!issueId) reject(new Error('issueId is required'))
        if (!projectId) reject(new Error('projectId is required'))
        const findQuery = 'SELECT * FROM tasks WHERE _project_id = ' + projectId + ' AND _task_id IN (' +
        'SELECT _task_id FROM tasks_issues WHERE _issue_id = ' + issueId + ')'
        database.getDatabase().then(
            db => db.query(findQuery, function (err, results) {
                if (err) {
                    reject(err.sqlMessage)
                }
                resolve(JSON.parse(JSON.stringify(results)))
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
 * @param {number} taskId
 * @param {number} projectId
 */
exports.removeUserOfTask = function (taskId, projectId) {
    return new Promise((resolve, reject) => {
        if (!taskId) reject(new Error('taskId is required'))
        if (!projectId) reject(new Error('projectId is required'))
        const removeQuery = 'DELETE FROM tasks_users WHERE _task_id IN (SELECT _task_id FROM tasks WHERE _task_id = ' +
        taskId + ' AND _project_id = ' + projectId + ');'
        database.getDatabase().then(
            db => db.query(removeQuery, function (err, results) {
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
 */
exports.updateTask = function (projectId, taskId, description, state) {
    return new Promise((resolve, reject) => {
        if (!projectId) reject(new Error('projectId is required'))
        if (!taskId) reject(new Error('taskId is required'))
        if (!description) reject(new Error('description is required'))
        if (!state) reject(new Error('state is required'))
        const updateQuery = 'UPDATE tasks SET description = \'' + description + '\', state = \'' + state + '\'' +
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
