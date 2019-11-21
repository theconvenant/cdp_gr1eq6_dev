const issueDb = require('../db_controller/issue_db')

var projectId
var projectName

module.exports = function (app) {
    this.setProjectId = function (id, name) {
        projectId = id
        projectName = name
    }

    app.get('/issues',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            issueDb.findListIssuesByProjectID(projectId).then(function (issuesList) {
                res.render('issues', { issuesList: issuesList, projectName: projectName })
            })
        })

    app.post('/issues',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            issueDb.findListIssuesByProjectID(projectId).then(function (issuesList) {
                res.render('issues', { issuesList: issuesList })
            })
        })

    app.post('/updateIssue',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            issueDb.updateIssue(projectId, req.body.issue_id, req.body.description, req.body.difficulty, req.body.priority, req.body.usNum, req.body.state)
            res.redirect('/issues')
        })

    app.post('/insertIssue',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            issueDb.insertIssue(req.body.description, req.body.difficulty, req.body.priority, req.body.usNum, req.body.state, projectId)
            res.redirect('/issues')
        })

    app.post('/deleteIssue',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            issueDb.deleteIssue(projectId, req.body.issueId)
            res.redirect('/issues')
        })
}
