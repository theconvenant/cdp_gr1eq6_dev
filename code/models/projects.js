module.exports = function (app, databaseInsert, databaseSelect) {
    app.get('/projects',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            databaseSelect.findListProjectsByOwnerName(req.user.username).then(function (projectsOwner) {
                databaseSelect.findListProjectsByUser(req.user.username).then(function (projectsMember) {
                    res.render('projects', { projectsOwner: projectsOwner, projectsMember: projectsMember })
                })
            })
        })

    app.post('/projects', require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            console.log(req.body.projectName + req.body.projectName.length)
            if (req.body.projectName.length !== 0) {
                if (req.body.description.length === 0) {
                    databaseInsert.insertProject(req.body.projectName, req.user.username)
                } else {
                    databaseInsert.insertProject(req.body.projectName, req.user.username, req.body.description)
                }
            }
            res.redirect('/projects')
        })
}
