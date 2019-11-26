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
            const taskTasksMap = getMapTaskTasks(projectId)
            taskDb.findTasksByProjectId(projectId).then(taskList => {
                issueDb.findListIssuesByProjectID(projectId).then(issueList => {
                    projectDb.findMembersOfProjectID(projectId).then(memberList => {
                        projectDb.findOwnerOfProjectID(projectId).then(ownerName => {
                            memberList.push(ownerName[0]._owner_name)
                            res.render('tasks', {
                                taskList: taskList,
                                issueList: issueList,
                                idProject: projectId,
                                memberList: memberList,
                                projectName: projectName,
                                issueTasksMap: issueTasksMap,
                                taskTasksMap: taskTasksMap
                            })
                        })
                    })
                })
            })
        })

    app.post('/insertTasks', require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            taskDb.insertTask(req.body.taskId, req.body.description, req.body.state, projectId).then(
                () => {
                    if (req.body.usList) {
                        insertIssueListOfTask(req.body.taskId, req.body.usList)
                    }
                    if (req.body.taskIdList) {
                        insertTaskListOftask(req.body.taskId, req.body.taskIdList)
                    }
                    res.redirect('/tasks')
                }
            )
        })

    app.post('/updateTask', require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            taskDb.updateTask(projectId, req.body.taskId, req.body.description,
                req.body.state).then(
                () => {
                    updateIssueListOfTask(req.body.taskId, req.body.usList)
                    updateDependecyTaskListOfTask(req.body.taskId, req.body.taskIdList)
                    res.redirect('/tasks')
                })
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

    // function deleteAllIssuesOfTask (taskId) {
    //     taskDb.findIssueListOftask(taskId, projectId).then(issueList => {
    //         issueList.forEach(function (issue) {
    //             taskDb.removeTaskIssue(taskId, issue._issue_id)
    //         })
    //     })
    // }

    function updateIssueListOfTask (taskId, issueList) {
        var promiseTab = []
        taskDb.findIssueListOftask(taskId, projectId).then(
            issueList => {
                issueList.forEach(function (issue) {
                    promiseTab.push(new Promise((resolve, reject) => {
                        taskDb.removeTaskIssue(taskId, issue._issue_id).then(
                            e => {
                                resolve()
                            }
                        )
                    }))
                })
            }
        ).then(() => {
            Promise.all(promiseTab).then(() => {
                if (issueList) insertIssueListOfTask(taskId, issueList)
            })
        })
    }

    function insertTaskListOftask (taskId, depTaskIdList) {
        if (Array.isArray(depTaskIdList)) {
            for (var i = 0; i < depTaskIdList.length; i++) {
                taskDb.insertTaskTask(taskId, depTaskIdList[i]).catch(e => console.log('erreur : ' + e))
            }
        } else {
            taskDb.insertTaskTask(taskId, depTaskIdList).catch(e => console.log('erreur : ' + e))
        }
    }

    function updateDependecyTaskListOfTask (taskId, depTaskList) {
        var promiseTab = []
        taskDb.findDependecyTaskList(taskId, projectId).then(
            taskList => {
                taskList.forEach(function (depTask) {
                    promiseTab.push(new Promise((resolve, reject) => {
                        taskDb.removeTaskTask(taskId, depTask._task_id).then(
                            e => {
                                resolve()
                            }
                        )
                    }))
                })
            }
        ).then(() => {
            Promise.all(promiseTab).then(() => {
                if (depTaskList) insertTaskListOftask(taskId, depTaskList)
            })
        })
    }

    function getMapIssueTasks (projectId) {
        var mapIssueTasks = new Map()
        issueDb.findListIssuesByProjectID(projectId).then(
            issueList => {
                issueList.forEach(issue => {
                    var taskList = []
                    taskDb.findTaskListOfIssue(issue._issue_id, projectId).then(
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

    function getMapTaskTasks (projectId) {
        var taskTasksMap = new Map()
        taskDb.findTasksByProjectId(projectId).then(
            depTaskListtKey => {
                depTaskListtKey.forEach(depTaskKey => {
                    var taskList = []
                    taskDb.findTaskListOfDepencyTask(depTaskKey._task_id, projectId).then(
                        taskL => {
                            taskL.forEach(function (task) {
                                taskList.push(task._task_id)
                            })
                            taskTasksMap.set(depTaskKey._task_id, taskList)
                        })
                })
            })
        return taskTasksMap
    }
}
