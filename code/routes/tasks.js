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
            const issueTasksMap = getMapIssueTasks(projectId)
            taskDb.findTasksByProjectId(projectId).then(taskList => {
                issueDb.findListIssuesByProjectID(projectId).then(issueList => {
                    projectDb.findMembersOfProjectID(projectId).then(memberList => {
                        projectDb.findOwnerOfProjectID(projectId).then(ownerName => {
                            memberList.push(ownerName[0]._owner_name)
                            res.render('tasks', {
                                taskList: taskList, issueList: issueList, idProject: projectId, memberList: memberList, projectName: projectName, issueTasksMap: issueTasksMap
                            })
                        })
                    })
                })
            })
        })

    app.post('/insertTasks', require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            // insertLIste issue if issue non null
            taskDb.insertTask(req.body.taskId, req.body.description, req.body.state, projectId).catch(err => console.log(err))
            if (req.body.usList) {
                insertIssueListOfTask(req.body.taskId, req.body.usList)
            }
            res.redirect('/tasks')
        })

    app.post('/updateTask', require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            taskDb.updateTask(projectId, req.body.taskId, req.body.description,
                req.body.state)
            updateIssueListOfTask(req.body.taskId, req.body.usList)
            res.redirect('/tasks')
        })

    app.post('/deleteTask', require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            taskDb.deleteTask(projectId, req.body.taskId)
            res.redirect('/tasks')
        })

    function insertIssueListOfTask (taskId, issueList) {
        if (Array.isArray(issueList)) {
            for (var i = 0; i < issueList.length; i++) {
                issueDb.getIssueByUsNum(issueList[i], projectId).then(issueId => {
                    taskDb.insertTaskIssue(taskId, issueId[0]._issue_id).catch(e => console.log('erreur : ' + e))
                })
            }
        } else {
            issueDb.getIssueByUsNum(issueList, projectId).then(issueId => {
                taskDb.insertTaskIssue(taskId, issueId[0]._issue_id).catch(e => console.log('erreur : ' + e))
            })
        }
    }

    function deleteAllIssuesOfTask (taskId) {
        taskDb.findIssueListOftask(taskId, projectId).then(issueList => {
            issueList.forEach(function (issue) {
                console.log(issue)
                taskDb.removeTaskIssue(taskId, issue._issue_id)
            })
        })
    }

    function updateIssueListOfTask (taskId, issueList) {
        deleteAllIssuesOfTask(taskId)
        if (issueList) {
            insertIssueListOfTask(taskId, issueList)
        }
    }

    function getMapIssueTasks (projectId) {
        var mapIssueTasks = new Map()
        issueDb.findListIssuesByProjectID(1).then(
            issueList => {
                issueList.forEach(issue => {
                    var taskList = []
                    taskDb.findTaskListOfIssue(issue._issue_id, 1).then(
                        taskL => {
                            taskL.forEach(function (task) {
                                taskList.push(task._task_id)
                            })
                            mapIssueTasks.set(issue.us_num, taskList)
                        })
                })
            })
        return mapIssueTasks
    }
}
