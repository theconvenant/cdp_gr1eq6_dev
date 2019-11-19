var projectId

module.exports = function (app, databaseInsert, databaseSelect, databaseDelete) {
    this.setProjectId = function (id) {
        projectId = id
    }
    app.get('/tasks', require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            databaseSelect.findTasksByProjectId(projectId).then(taskList => {
                databaseSelect.findListIssuesByProjectID(projectId).then(issueList => {
                    databaseSelect.findMembersOfProjectID(projectId).then(memberList => {
                        databaseSelect.findOwnerOfProjectID(projectId).then(ownerName => {
                            memberList.push(ownerName[0]._owner_name)
                            res.render('tasks', { taskList: taskList, issueList: issueList, idProject: projectId, memberList: memberList })
                        })
                    })
                })
            })
        })

    app.post('/insertTasks', require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            if (req.body.issueId === '') {
                databaseInsert.insertTask(req.body.taskId, req.body.description,
                    req.body.state, projectId)
                    .catch(err => console.log(err))
            } else {
                databaseInsert.insertTask(req.body.taskId, req.body.description,
                    req.body.state, projectId, req.body.issueId)
                    .catch(err => console.log(err))
            }
            res.redirect('/tasks')
        })

    app.post('/updateTask', require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            databaseInsert.updateTask(projectId, req.body.taskId, req.body.description,
                req.body.state, req.body.issueId)
            res.redirect('/tasks')
        })

    app.post('/deleteTask', require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            databaseDelete.deleteTask(projectId, req.body.taskId)
            res.redirect('/tasks')
        })
}
