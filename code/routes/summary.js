const sprintDb = require('../db_controller/sprint_db')
const taskDb = require('../db_controller/task_db')

var projectId
var projectName

module.exports = function (app) {
    this.setProjectId = function (id, name) {
        projectId = id
        projectName = name
    }
    app.get('/summary',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            sprintDb.findSprintsByProjectId(projectId).then( sprintsList => {
                const sprintPercentageList = getListSprintIssues(projectId, sprintsList)
                res.render('summary', { idProject: projectId, projectName: projectName, 
                    sprintsList:sprintsList, sprintPercentageList: sprintPercentageList })
            })
        })
        function getListSprintIssues (projectId, sprintsList) {
            if(!sprintsList){
                return null
            }
            var sprintPercentageList = new Map()
            sprintsList.forEach(
                sprint => {
                    var nbTasks = 0
                    var nbDoneTasks = 0
                    sprintDb.findIssueListOfSprint(sprint._id, projectId).then(
                        issues => {
                            issues.forEach( 
                                issue => {
                                    taskDb.findTaskListOfIssue(issue._issue_id, projectId).then(
                                        tasksList => {
                                            tasksList.forEach(
                                                task => {
                                                    ++nbTasks
                                                    if(task.state == 'DONE')
                                                    ++nbDoneTasks
                                                }
                                            )
                                        }
                                    )
                                }
                            )
                        }
                    )
                sprintPercentageList.set(sprint._id, (nbDoneTasks/nbTasks*100))
                }
            )
            return sprintPercentageList
        }
}
