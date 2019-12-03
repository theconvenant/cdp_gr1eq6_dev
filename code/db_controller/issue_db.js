const database = require('./database_header')

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
 * @param {number} issueId
 */
exports.getIssuebyId = function (issueId) {
    return new Promise((resolve, reject) => {
        if (!issueId) reject(new Error('issueId is required'))
        const getQuery = 'SELECT * FROM issues WHERE _issue_id = ' + issueId + ' ;'
        database.getDatabase().then(
            db => db.query(getQuery, function (err, results) {
                if (err) {
                    reject(err.sqlMessage)
                }
                resolve(JSON.parse(JSON.stringify(results)))
            })
        )
    })
}

/**
 * @param {String} usNum
 * @param {number} projectId
 */
exports.getIssueByUsNum = function (usNum, projectId) {
    return new Promise((resolve, reject) => {
        if (!usNum) reject(new Error('usNum is required'))
        if (!projectId) reject(new Error('projectId is required'))
        const getQuery = 'SELECT * FROM issues WHERE us_num = \'' + usNum + '\' AND _project_id = ' + projectId + ';'
        database.getDatabase().then(
            db => db.query(getQuery, function (err, results) {
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
 * @param {number} issueId
 * @param {number} projectId
 */
exports.deleteIssue = function (projectId, issueId) {
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
 * @param {String} description
 * @param {number} difficulty
 * @param {String} priority
 * @param {String} usNum
 * @param {String} testState
 * @param {number} projectId
 */
exports.insertIssue = function (description, difficulty, priority, usNum, State, projectId) {
    return new Promise((resolve, reject) => {
        if (!description) reject(new Error('description is required'))
        if (!difficulty) reject(new Error('difficulty is required'))
        if (!priority) reject(new Error('priority is required'))
        if (!usNum) reject(new Error('usNum is required'))
        if (!State) reject(new Error('State is required'))
        if (!projectId) reject(new Error('projectId is required'))
        const insertQuery = 'INSERT INTO issues (description, difficulty, priority, us_num, test_state, _project_id) VALUES (\'' +
        description + '\', ' + difficulty + ', \'' + priority + '\', \'' + usNum + '\', \'' + State + '\', ' + projectId + ');'
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
 * @param {number} issueId
 * @param {String} description
 * @param {number} difficulty
 * @param {String} priority
 * @param {String} usNum
 * @param {String} testState
 */
exports.updateIssue = function (projectId, issueId, description, difficulty, priority, usNum, testState) {
    return new Promise((resolve, reject) => {
        if (!projectId) reject(new Error('projectId is required'))
        if (!issueId) reject(new Error('issueId is required'))
        if (!description) reject(new Error('description is required'))
        if (!difficulty) reject(new Error('difficulty is required'))
        if (!priority) reject(new Error('priority is required'))
        if (!usNum) reject(new Error('usNum is required'))
        if (!testState) reject(new Error('testState is required'))
        const updateQuery = 'UPDATE issues SET description = \'' + description + '\', difficulty = ' + difficulty + ', priority = \'' + priority +
        '\', us_num = \'' + usNum + '\', test_state = \'' + testState + '\' WHERE _issue_id = ' + issueId + ' AND _project_id = ' + projectId
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
