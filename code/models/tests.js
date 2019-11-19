var projectId

module.exports = function (app) {
    this.setProjectId = function (id) {
        projectId = id
    }
    app.get('/tests',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            res.render('tests', { idProject: projectId })
        })

    app.post('/tests', require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            res.redirect('/tests')
        })
}
