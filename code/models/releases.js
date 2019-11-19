var projectId

module.exports = function (app) {
    this.setProjectId = function (id) {
        projectId = id
    }
    app.get('/releases',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            res.render('releases', { idProject: projectId })
        })

    app.post('/releases', require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            res.redirect('/releases')
        })
}
