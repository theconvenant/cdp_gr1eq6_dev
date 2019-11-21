var projectId
var projectName

module.exports = function (app) {
    this.setProjectId = function (id, name) {
        projectId = id
        projectName = name
    }
    app.get('/documentation',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            res.render('documentation', { idProject: projectId, projectName: projectName })
        })
}
