var projectId
var projectName

module.exports = function (app) {
    this.setProjectId = function (id, name) {
        projectId = id
        projectName = name
    }
    app.get('/sprints',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            res.render('sprints', { idProject: projectId, projectName: projectName })
        })
}
