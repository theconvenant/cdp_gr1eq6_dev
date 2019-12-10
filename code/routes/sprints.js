const sprintDb = require('../db_controller/sprint_db')
const issueDb = require('../db_controller/issue_db')
const taskDb = require('../db_controller/task_db')
const projectDb = require('../db_controller/project_db')

var projectId
var projectName
var current_sprint = null
const moment = require('moment');

module.exports = function (app) {
    this.setProjectId = function (id, name) {
        projectId = id
        projectName = name
    }
    app.get('/sprints',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            sprintDb.findSprintsByProjectId(projectId).then (sprintList => {
                issueDb.findListIssuesByProjectID(projectId).then(issuesList => {
                    if(current_sprint){
                        sprintDb.findIssueListOfSprint(current_sprint._id, projectId).then( issueslist =>{
                            findTaskListOfIssueList(issueslist, projectId).then(taskInSprintList => {
                                console.log('after function ****************')
                                console.log(taskInSprintList)
                                taskDb.findTasksByProjectId(projectId).then(taskList => {
                                    projectDb.findMembersOfProjectID(projectId).then(memberList => {
                                        var userNameList = []
                                        memberList.forEach(member => {
                                            userNameList.push(member._user_name)
                                        })
                                        res.render('sprints', {
                                            moment: moment,
                                            idProject: projectId,
                                            projectName: projectName,
                                            sprintList: sprintList,
                                            current_sprint: current_sprint,
                                            issuesList: issuesList,
                                            issuesInSprint: issueslist,
                                            taskList: taskList,
                                            userNameList: userNameList,
                                            taskInSprintList:taskInSprintList})
                                    })
                                })
                            })
                        })
                    }else{
                        res.render('sprints', {moment: moment, idProject: projectId, projectName: projectName, 
                            sprintList: sprintList, current_sprint: current_sprint, issuesList: issuesList, issuesInSprint: null})
                    }
                })
            })
        })
    app.post('/insertSprint', 
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            sprintDb.insertSprint(req.body.sprintName, req.body.startDate, req.body.endDate, projectId, req.body.description).then( 
                ()=>{
                    res.redirect('/sprints')
                }
            )
        })
    app.post('/addIssueToSprint', 
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            if (req.body.usList) {
                insertIssueListOfSprint(current_sprint._id, req.body.usList)
            }
            res.redirect('/sprints')
        })
    app.post('/deleteSprint', require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            sprintDb.deleteSprint(req.body.sprintId)
            res.redirect('/sprints')
        })
    app.post('/chooseSprint', 
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            sprintDb.findSprintById(req.body.current_sprint).then(result =>{
                current_sprint = result[0]
                res.redirect('/sprints')
            })         
        })

    function findTaskListOfIssueList(issuesList, projectId){
        return new Promise((resolve, reject) => {
            var taskList = new Array()
        var promiseTab = []
        if(!issuesList){
            return taskList
        }
        for(var i = 0; i < issuesList.length; ++i){
            promiseTab.push(new Promise(
                (resolve, reject) => { 
                    taskDb.findTaskListOfIssue(issuesList[i]._issue_id, projectId).then(
                    taskL => {
                        if(taskL){
                            taskList.push(taskL)

                        }
                        resolve(taskList[0])
                    })
                })
            )
        }
        Promise.all(promiseTab).then(list => {
            console.log('in function ****************')
            const myList = list[0]
            console.log(myList)
            resolve(myList)
            })
        })
        
    }

    function insertIssueListOfSprint (sprintId, issueList) {
        if (Array.isArray(issueList)) {
            for (var i = 0; i < issueList.length; i++) {
                issueDb.getIssueByUsNum(issueList[i], projectId).then(issueId => {
                    sprintDb.insertIssueInSprint(sprintId, issueId[0]._issue_id).catch(e => console.log('erreur : ' + e))
                })
            }
        } else {
            issueDb.getIssueByUsNum(issueList, projectId).then(issueId => {
                sprintDb.insertIssueInSprint(sprintId, issueId[0]._issue_id).catch(e => console.log('erreur : ' + e))
            })
        }
    }
}
