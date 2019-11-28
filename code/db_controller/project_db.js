const database = require('./database_header')

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

/**
 * @param {String} userName
 */
exports.findListProjectsByUser = function (userName) {
    return new Promise((resolve, reject) => {
        if (!userName) reject(new Error('userName is required'))
        const findProjectName = 'SELECT * FROM projects WHERE _project_id IN (SELECT _project_id FROM projects_users WHERE _user_name = \'' + userName + '\');'
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

/**
 * @param {number} projectId
 */
exports.findProjectById = function (projectId) {
    return new Promise((resolve, reject) => {
        if (!projectId) reject(new Error('projectId is required'))
        const projectQuery = 'SELECT * FROM projects WHERE _project_id = ' + projectId + ';'
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

/**
 * @param {number} projectId
 */
exports.findOwnerOfProjectID = function (projectId) {
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
 * @param {String} userName
 * @param {number} projectId
 */
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

/**
 * @param {String} projectName
 * @param {String} ownerName
 * @param {String} description may not exist
 */
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
 * @param {number} projectId
 * @param {String} userName
 */
exports.removeMemberFromProject = function (projectId, userName) {
    return new Promise((resolve, reject) => {
        if (!projectId) reject(new Error('projectId is required'))
        if (!userName) reject(new Error('userName is required'))
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
