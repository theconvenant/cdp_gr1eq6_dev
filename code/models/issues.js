var projectId
var projectName

module.exports = function (app, databaseSelect, databaseInsert, databaseDelete) {
    this.setProjectId = function (id, name) {
        projectId = id
        projectName = name
    }

    app.get('/issues',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            databaseSelect.findListIssuesByProjectID(projectId).then(function (issuesList) {
                res.render('issues', { issuesList: issuesList, projectName: projectName })
            })
        })

    app.post('/issues',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            databaseSelect.findListIssuesByProjectID(projectId).then(function (issuesList) {
                res.render('issues', { issuesList: issuesList })
            })
        })

    app.post('/updateIssue',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            databaseInsert.updateIssue(projectId, req.body.issueId, req.body.description, req.body.difficulty, req.body.prority, req.body.usNum, req.body.State)
            res.redirect('/issues')
        })

    app.post('/insertIssue',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            databaseInsert.insertIssue(req.body.description, req.body.difficulty, req.body.priority, req.body.usNum, req.body.state, projectId)
            res.redirect('/issues')
        })

    app.post('/deleteIssue',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            databaseDelete.deleteIssue(projectId, req.body.issueId)
            res.redirect('/issues')
        })
}
