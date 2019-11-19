var projectId

module.exports = function (app) {
    this.setProjectId = function (id) {
        projectId = id
    }
    app.get('/summary',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            res.render('summary', { idProject: projectId })
        })

    app.post('/summary', require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            res.render('summary', { idProject: projectId })
        })
}
