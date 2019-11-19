var projectId

module.exports = function (app) {
    this.setProjectId = function (id) {
        projectId = id
    }

    app.get('/issues',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            res.render('issues', { idProject: projectId })
        })

    app.post('/issues',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            res.render('issues', { idProject: projectId })
        })
}
