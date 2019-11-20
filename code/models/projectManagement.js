var projectId
var projectName
var ownerName

module.exports = function (app, databaseDelete) {
    this.setProjectId = function (id, name, owner) {
        projectId = id
        projectName = name
        ownerName = owner
    }
    app.get('/projectManagement',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            res.render('projectManagement', { idProject: projectId, projectName: projectName, ownerName: ownerName })
        })

    app.post('/deleteProject',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            databaseDelete.deleteProject(projectName, ownerName).catch(err => console.log(err))
            res.redirect('/projects')
        })
}
