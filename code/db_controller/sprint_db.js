const database = require('./database_header')

/**
 * @param {number} sprintId
 * @param {number} projectId
 */
exports.findSprintById = function (sprintId) {
    return new Promise((resolve, reject) => {
        if (!sprintId) reject(new Error('sprintId is required'))
        const sprintQuery = 'SELECT * FROM sprints WHERE _id = ' + sprintId + ';'
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

exports.findIssueListOfSprint = function (sprintId, projectId) {
    return new Promise((resolve, reject) => {
        if (!sprintId) reject(new Error('sprintId is required'))
        if (!projectId) reject(new Error('projectId is required'))
        const findQuery = 'SELECT * FROM issues WHERE _project_id = ' + projectId + ' AND _issue_id IN (' +
        'SELECT _issue_id FROM sprints_issues WHERE _sprint_id = ' + sprintId + ')'
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
 * @param {number} projectId
 */
exports.findSprintsByProjectId = function (projectId) {
    return new Promise((resolve, reject) => {
        if (!projectId) reject(new Error('projectId is required'))
        const sprintQuery = 'SELECT * FROM sprints WHERE _project_id = ' + projectId + ';'
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
 * @param {number} issueId
 * @param {number} sprintId
 */
exports.insertIssueInSprint = function (sprintId, issueId) {
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
        }else{
            description = null
        }
        const insertQuery = 'INSERT INTO sprints (name, starting_date, ending_date, description, _project_id) VALUES ( \'' + name + '\', \'' + startDate + '\', \'' + endDate + '\', ' + description + ', ' + projectId + ');'
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

exports.deleteSprint = function (sprintId) {
    return new Promise((resolve, reject) => {
        if (!sprintId) reject(new Error('sprintId is required'))
        const deleteQuery = 'DELETE FROM sprints WHERE _id = ' + sprintId + ';'
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
