var projectId

module.exports = function (app) {
    this.setProjectId = function (id) {
        projectId = id
    }
    app.get('/projectManagement',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            res.render('projectManagement', { idProject: projectId })
        })

    app.post('/projectManagement', require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            res.redirect('/projectManagement')
        })
}
