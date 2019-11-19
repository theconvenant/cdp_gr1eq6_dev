var projectId

module.exports = function (app) {
    this.setProjectId = function (id) {
        projectId = id
    }
    app.get('/documentation',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            res.render('documentation', { idProject: projectId })
        })

    app.post('/documentation', require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            res.redirect('/documentation')
        })
}
