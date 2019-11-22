const taskDb = require('../db_controller/task_db')
const issueDb = require('../db_controller/issue_db')
const projectDb = require('../db_controller/project_db')

var projectId
var projectName

module.exports = function (app) {
    this.setProjectId = function (id, name) {
        projectId = id
        projectName = name
    }
    app.get('/tasks', require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            taskDb.findTasksByProjectId(projectId).then(taskList => {
                issueDb.findListIssuesByProjectID(projectId).then(issueList => {
                    projectDb.findMembersOfProjectID(projectId).then(memberList => {
                        projectDb.findOwnerOfProjectID(projectId).then(ownerName => {
                            memberList.push(ownerName[0]._owner_name)
                            res.render('tasks', { taskList: taskList, issueList: issueList, idProject: projectId, memberList: memberList, projectName: projectName })
                        })
                    })
                })
            })
        })

    app.post('/insertTasks', require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            if (req.body.issueId === '') {
                taskDb.insertTask(req.body.taskId, req.body.description,
                    req.body.state, projectId)
                    .catch(err => console.log(err))
            } else {
                taskDb.insertTask(req.body.taskId, req.body.description,
                    req.body.state, projectId, req.body.issueId)
                    .catch(err => console.log(err))
            }
            res.redirect('/tasks')
        })

    app.post('/updateTask', require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            taskDb.updateTask(projectId, req.body.taskId, req.body.description,
                req.body.state, req.body.issueId)
            res.redirect('/tasks')
        })

    app.post('/deleteTask', require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            taskDb.deleteTask(projectId, req.body.taskId)
            res.redirect('/tasks')
        })
}
