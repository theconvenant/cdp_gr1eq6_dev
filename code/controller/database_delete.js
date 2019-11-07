const database = require('./database_header')

database.getDatabase().then(db => db.connect())

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

this.deleteProject('project1', 'jane').then(e => console.log(e))

database.getDatabase().then(db => db.end())
