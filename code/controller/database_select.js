const database = require('./database_header')

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
/**
 * @param {String} ownerName
 */
exports.findListProjectsByOwnerName = function (ownerName) {
    return new Promise((resolve, reject) => {
        if (!ownerName) reject(new Error('userName is required'))
        const findProjectName = 'SELECT * FROM projects WHERE _owner_name = \'' + ownerName + '\';'
        database.getDatabase().then(
            db => db.query(findProjectName, function (err, results) {
                if (err) {
                    reject(err.sqlMessage)
                }
                resolve(JSON.parse(JSON.stringify(results)))
            })
        )
    })
}

// return a list of project's name where userName is a member of
/**
 * @param {String} userName
 */
exports.findListProjectsByUser = function (userName) {
    return new Promise((resolve, reject) => {
        if (!userName) reject(new Error('userName is required'))
        const findProjectName = 'SELECT * FROM projects WHERE _project_name IN (SELECT _project_name FROM projects_users WHERE _user_name = \'' + userName + '\');'
        database.getDatabase().then(
            db => db.query(findProjectName, function (err, results) {
                if (err) {
                    reject(err.sqlMessage)
                }
                resolve(JSON.parse(JSON.stringify(results)))
            })
        )
    })
}

// return all infos of the project named projectName
/**
 * @param {String} projectName
 */
exports.findProjectByName = function (projectName) {
    return new Promise((resolve, reject) => {
        if (!projectName) reject(new Error('projectName is required'))
        const projectQuery = 'SELECT * FROM projects WHERE _project_name = \'' + projectName + '\';'
        database.getDatabase().then(
            db => db.query(projectQuery, function (err, results) {
                if (err) {
                    reject(err.sqlMessage)
                }
                resolve(JSON.parse(JSON.stringify(results)))
            })
        )
    })
}
/**
 * @param {String} userName
 * @param {number} projectId
 */
exports.isUserInProject = function (userName, projectId) {
    return new Promise((resolve, reject) => {
        if (!projectId) reject(new Error('projectId is required'))
        if (!userName) reject(new Error('userName is required'))
        const query = 'SELECT * FROM projects_users WHERE _project_id = ' + projectId +
         ' AND _user_name = \'' + userName + '\';'
        database.getDatabase().then(
            db => db.query(query, function (err, results) {
                if (err) {
                    reject(err.sqlMessage)
                }
                resolve(!(results === 0))
            })
        )
    })
}
/**
 * @param {number} projectId
 */
exports.findListIssuesByProjectID = function (projectId) {
    return new Promise((resolve, reject) => {
        if (!projectId) reject(new Error('projectId is required'))
        const issueListQuery = 'SELECT * FROM issues WHERE _project_id = ' + projectId + ' ;'
        database.getDatabase().then(
            db => db.query(issueListQuery, function (err, results) {
                if (err) {
                    reject(err.sqlMessage)
                }
                resolve(JSON.parse(JSON.stringify(results)))
            })
        )
    })
}
/**
 * @param {number} sprintId
 */
exports.findIssuesInSprint = function (sprintId) {
    return new Promise((resolve, reject) => {
        if (!sprintId) reject(new Error('sprintId is required'))
        const issueListQuery = 'SELECT * FROM issues WHERE _issue_id IN (SELECT _issue_id FROM sprints_issues WHERE _sprint_id = \'' + sprintId + '\' );'
        database.getDatabase().then(
            db => db.query(issueListQuery, function (err, results) {
                if (err) {
                    reject(err.sqlMessage)
                }
                resolve(JSON.parse(JSON.stringify(results)))
            })
        )
    })
}
/**
 * @param {number} releaseId
 */
exports.findIssuesInRelease = function (releaseId) {
    return new Promise((resolve, reject) => {
        if (!releaseId) reject(new Error('releaseId is required'))
        const issueListQuery =
        'SELECT * FROM issues WHERE _issue_id IN (SELECT _issue_id FROM releases_issues WHERE _release_id = \'' + releaseId + '\' );'
        database.getDatabase().then(
            db => db.query(issueListQuery, function (err, results) {
                if (err) {
                    reject(err.sqlMessage)
                }
                resolve(JSON.parse(JSON.stringify(results)))
            })
        )
    })
}

/**
 * return the list of participants of a project but not the owner
 * @param {number} projectId
 */
exports.findMembersOfProjectID = function (projectId) {
    return new Promise((resolve, reject) => {
        if (!projectId) reject(new Error('projectId is required'))
        const memberListQuery =
        'SELECT _user_name FROM projects_users WHERE _project_id = ' + projectId + ';'
        database.getDatabase().then(
            db => db.query(memberListQuery, function (err, results) {
                if (err) {
                    reject(err.sqlMessage)
                }
                resolve(JSON.parse(JSON.stringify(results)))
            })
        )
    })
}

exports.findOwnerofProjectID = function (projectId) {
    return new Promise((resolve, reject) => {
        if (!projectId) reject(new Error('projectId is required'))
        const ownerQuery =
        'SELECT _owner_name FROM projects WHERE _project_id = ' + projectId + ';'
        database.getDatabase().then(
            db => db.query(ownerQuery, function (err, results) {
                if (err) {
                    reject(err.sqlMessage)
                }
                resolve(JSON.parse(JSON.stringify(results)))
            })
        )
    })
}

/**
 * @param {number} sprintId
 * @param {number} projectId
 */
exports.findSprintByName = function (sprintId, projectId) {
    return new Promise((resolve, reject) => {
        if (!sprintId) reject(new Error('sprintId is required'))
        if (!projectId) reject(new Error('projectId is required'))
        const sprintQuery = 'SELECT * FROM sprints WHERE _id = ' + sprintId + ' AND _project_id = ' + projectId + ';'
        database.getDatabase().then(
            db => db.query(sprintQuery, function (err, results) {
                if (err) {
                    reject(err.sqlMessage)
                }
                resolve(JSON.parse(JSON.stringify(results)))
            })
        )
    })
}

/**
 * @param {number} sprintId
 * @param {number} projectId
 */
exports.findReleaseListInSprint = function (sprintId, projectId) {
    return new Promise((resolve, reject) => {
        if (!sprintId) reject(new Error('sprintId is required'))
        if (!projectId) reject(new Error('projectId is required'))
        const releaseQuery = 'SELECT * FROM releases WHERE _id IN ' +
        '(SELECT _release_id FROM sprints_releases WHERE _sprint_id = ' + sprintId + ' AND _sprint_id IN ' +
        '(SELECT _id FROM sprints WHERE _project_id = ' + projectId + '))'
        database.getDatabase().then(
            db => db.query(releaseQuery, function (err, results) {
                if (err) {
                    reject(err.sqlMessage)
                }
                resolve(JSON.parse(JSON.stringify(results)))
            })
        )
    })
}

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
