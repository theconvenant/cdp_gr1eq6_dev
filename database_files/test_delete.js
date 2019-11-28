const taskDb = require('../code/db_controller/task_db')
const issueDb = require('../code/db_controller/issue_db')
const projectDb = require('../code/db_controller/project_db')

// this.deleteProject('project1', 'jane').then(e => console.log(e))
// this.deleteIssue(1, 5).then(e => console.log(e)).catch(e => console.log(e))
// this.removeMemberFromProject(2, 'jane').then(e => console.log(e)).catch(e => console.log(e))
// this.deleteAccount('jane').then(e => console.log(e)).catch(e => console.log(e))

function deleteAllDependecyTaskOfTask (taskId, projectId) {
        taskDb.findTaskListOfDepencyTask(taskId, projectId).then(taskList => {
            console.log(taskList)
            taskList.forEach(function (depTask) {
                taskDb.removeTaskTask(taskId, depTask._task_id)
            })
        })
    }
deleteAllDependecyTaskOfTask(45,1)
