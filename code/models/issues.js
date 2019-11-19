var projectId

module.exports = function (app, databaseSelect, databaseInsert, databaseDelete) {
    this.setProjectId = function (id) {
        projectId = id
    }

    app.get('/issues',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            databaseSelect.findListIssuesByProjectID(projectId).then(function (issuesList) {
                res.render('issues', { issuesList: issuesList })
            })
        })

    app.post('/issues',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            databaseSelect.findListIssuesByProjectID(projectId).then(function (issuesList) {
                res.render('issues', { issuesList: issuesList })
            })
        })

    /* app.post('/updateIssue',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            databaseInsert.updateIssue(projectId, req.body.taskId, req.body.description,
                req.body.state, req.body.issueId)
            res.redirect('/tasks')
        }) */

    app.post('/insertIssue',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            databaseInsert.insertIssue(req.body.issueId, req.body.description, req.body.difficulty, req.body.priority, req.body.usNum, req.body.State, projectId)
            res.redirect('/issues')
        })

    app.post('/deleteIssue',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            databaseDelete.deleteIssue(projectId, req.body.issueId)
            res.redirect('/issues')
        })
}
