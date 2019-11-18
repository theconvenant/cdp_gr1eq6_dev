const database = require('./database_header')

/**
 * @param {String} projectName
 * @param {String} ownerName
 */
exports.deleteProject = function (projectName, ownerName) {
    return new Promise((resolve, reject) => {
        if (!ownerName) reject(new Error('ownerName is required'))
        if (!projectName) reject(new Error('projectName is required'))
        const deleteQuery = 'DELETE FROM projects WHERE _project_name = \'' + projectName + '\' AND _owner_name = \'' + ownerName + '\';'
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
 * @param {number} issueId
 * @param {number} projectId
 */
exports.deleteIssue = function (issueId, projectId) {
    return new Promise((resolve, reject) => {
        if (!issueId) reject(new Error('issueId is required'))
        if (!projectId) reject(new Error('projectId is required'))
        const deleteQuery = 'DELETE FROM issues WHERE _issue_id = ' + issueId + ' AND _project_id = ' + projectId + ';'
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
 * @param {number} projectId
 * @param {String} userName
 */
exports.removeMemberFromProject = function (projectId, userName) {
    return new Promise((resolve, reject) => {
        if (!projectId) reject(new Error('issueId is required'))
        if (!userName) reject(new Error('projectName is required'))
        const deleteQuery = 'DELETE FROM projects_users WHERE _project_id = ' + projectId + ' AND _user_name = \'' + userName + '\';'
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
// --------- peut on faire en sorte que lorsque qu'on supprime un compte, toutes les taches qui lui étaient assemblées ne le soient plus après (automatiquement gérer par la bd) ?
exports.deleteAccount = function (userName) {
    return new Promise((resolve, reject) => {
        if (!userName) reject(new Error('projectName is required'))
        const deleteQuery = 'DELETE FROM users WHERE username = \'' + userName + '\';'
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
