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
            res.render('issues', { idProject: projectId, projectName: projectName })
        })

    app.post('/issues',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            res.render('issues', { idProject: projectId })
        })
}
