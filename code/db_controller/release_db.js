const database = require('./database_header')

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