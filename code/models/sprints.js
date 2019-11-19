var projectId

module.exports = function (app) {
    this.setProjectId = function (id) {
        projectId = id
    }
    app.get('/sprints',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            res.render('sprints', { idProject: projectId })
        })

    app.post('/sprints', require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            res.redirect('/sprints')
        })
}
