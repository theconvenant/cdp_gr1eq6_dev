var projectId
var projectName

module.exports = function (app) {
    this.setProjectId = function (id, name) {
        projectId = id
        projectName = name
    }
    app.get('/releases',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            res.render('releases', { idProject: projectId, projectName: projectName })
        })
}
