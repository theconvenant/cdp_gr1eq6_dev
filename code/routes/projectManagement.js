const projectDb = require('../db_controller/project_db')

var projectId
var projectName
var ownerName

module.exports = function (app) {
    this.setProjectId = function (id, name, owner) {
        projectId = id
        projectName = name
        ownerName = owner
    }
    app.get('/projectManagement',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            projectDb.findMembersOfProjectID(projectId).then(
                memberList => {
                    res.render('projectManagement', {
                        idProject: projectId,
                        projectName: projectName,
                        ownerName: ownerName,
                        memberList: memberList
                    })
                }
            )
        })

    app.post('/removeUserFromProject',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            projectDb.removeMemberFromProject(projectId, req.body.memberName).then(res.redirect('/projectManagement'))
        })

    app.post('/addUserToProject',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            projectDb.insertUserProject(req.body.userName, projectId).then(res.redirect('/projectManagement'))
        })

    app.post('/deleteProject',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            projectDb.deleteProject(projectName, ownerName).catch(err => console.log(err))
            res.redirect('/projects')
        })
}
