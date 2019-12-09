const taskDb = require('../../db_controller/task_db')
const projectDb = require('../../db_controller/project_db')
const userDb = require('../../db_controller/user_db')
const issueDb = require('../../db_controller/issue_db')
const dbInit = require('../../db_controller/database_header')

var assert = require('assert')

describe('Tasks test', function () {
    var projectId
    const taskId = 1
    const description = 'Description'
    const state = 'State'
    var taskTest

    before(async function () {
        dbInit.databaseTestConnection()
        const ownerName = 'test_bob'
        await userDb.insertUser(ownerName, 'mail', 'pass').then(async function () {
            await projectDb.insertProject('projet_test', ownerName).then(async function () {
                await projectDb.findListProjectsByOwnerName(ownerName).then(async function (insertedProject) {
                    projectId = insertedProject[0]._project_id
                    await taskDb.insertTask(taskId, description, state, projectId).then(async function () {
                        await taskDb.findTasksByProjectId(projectId).then(taskList => {
                            taskTest = taskList[0]
                        })
                    })
                })
            })
        })
    })

    after(async function () {
        userDb.deleteAccount('test_bob')
    })

    it('insert task', function () {
        assert.strictEqual(taskTest._task_id, taskId)
        assert.strictEqual(taskTest.description, description)
        assert.strictEqual(taskTest.state, state)
        assert.strictEqual(taskTest._project_id, projectId)
    })

    it('insert twice the same task', async function () {
        await taskDb.insertTask(taskId, description, state, projectId).then(async function () {
            taskDb.deleteTask(projectId, taskId).then(
                () => assert.strictEqual(true, false, 'should not be able to add twice the same task in one project'))
        }, err => assert.strictEqual(true, true, err))
    })

    it('insert wrong paramters task', async function () {
        await taskDb.insertTask(taskId, '', 1, projectId).then(async function () {
            taskDb.deleteTask(projectId, taskId).then(
                () => assert.strictEqual(true, false, 'should not be able to add a task with wrong paramters'))
        }, err => assert.strictEqual(true, true, err))
    })

    it ('delete task', async function () {
        await taskDb.insertTask(12, 'description_test', 'to remove', projectId).then(async function () {
            await taskDb.findTasksByProjectId(projectId).then(async function (taskList) {
                const taskListSize = taskList.length
                await taskDb.deleteTask(projectId, taskList[taskListSize - 1]._task_id).then(async function () {
                    await taskDb.findTasksByProjectId(projectId).then(list => {
                        assert.strictEqual(list.length, taskList.length - 1)
                    })
                })
            })
        })
    })

    it ('update task', async function () {
        const newDesc = 'updated_description'
        const newState = 'state_updated'
        const tmpTask = taskTest
        await taskDb.updateTask(taskTest._project_id, taskTest._task_id, newDesc, newState).then(async function () {
            await taskDb.getTaskById(taskTest._project_id, taskTest._task_id).then(async function (task) {
                const t = task[0]
                assert.strictEqual(t.description, newDesc)
                assert.strictEqual(t.state, newState)
                await taskDb.updateTask(projectId, taskTest._task_id, tmpTask.description, tmpTask.state)
            }, () => taskDb.updateTask(projectId, taskTest._task_id, tmpTask.description, tmpTask.state))
        })
    })

    it ('wrong update task', async function () {
        const newDesc = ''
        const newState = ''
        const tmpTask = taskTest
        await taskDb.updateTask(taskTest._project_id, taskTest._task_id, newDesc, newState).then(async function () {
            assert.strictEqual(true, false, 'not allow to update with empty values')
            await taskDb.updateTask(projectId, taskTest._task_id, tmpTask.description, tmpTask.state)
        }, err => assert.strictEqual(true, true, err))
    })

    it('insert dependency task', async function () {
        const depId = 32
        const depDesc = 'dependency_desc'
        const depState = 'dependency_state'
        await taskDb.insertTask(depId, depDesc, depState, projectId).then(async function () {
            await taskDb.insertTaskTask(taskTest._task_id, depId).then(async function () {
                await taskDb.findDependecyTaskList(taskTest._task_id, projectId).then(depTask => {
                    const task = depTask[0]
                    assert.strictEqual(task._task_id, depId)
                    assert.strictEqual(task.description, depDesc)
                    assert.strictEqual(task.state, depState)
                    taskDb.deleteTask(projectId, depId)
                })
            }, () => taskDb.deleteTask(projectId, depId))
        })
    })

    it('insert unknown dependency task', async function () {
        await taskDb.insertTaskTask(taskTest._task_id, 132).then(async function () {
            taskDb.removeTaskTask(taskTest._task_id, 132)
            assert.strictEqual(true, false, 'a task can not depend on a unknown one')
        }, err => assert.strictEqual(true, true, err))
    })

    it('insert dependency issue', async function () {
        const issueDesc = 'dependency_desc'
        const issueState = 'dependency_state'
        const issueDiff = 1
        const issuePrio = 'high'
        const usNum = 'us_test'
        await issueDb.insertIssue(issueDesc, issueDiff, issuePrio, usNum, issueState, projectId).then(async function () {
            await issueDb.getIssueByUsNum(usNum, projectId).then(async function (issue) {
                await taskDb.insertTaskIssue(taskTest._task_id, issue[0]._issue_id).then(async function () {
                    await taskDb.findIssueListOftask(taskTest._task_id, projectId).then(issueList => {
                        const depIssue = issueList[0]
                        assert.strictEqual(depIssue._issue_id, issue[0]._issue_id)
                        assert.strictEqual(depIssue.description, issueDesc)
                        assert.strictEqual(depIssue.test_state, issueState)
                        assert.strictEqual(depIssue.us_num, usNum)
                        assert.strictEqual(depIssue.difficulty, issueDiff)
                        assert.strictEqual(depIssue.priority, issuePrio)
                        issueDb.deleteIssue(projectId, depIssue._issue_id)
                    }, () => taskDb.deleteTask(projectId, issue[0]._issue_id))
                }, () => taskDb.deleteTask(projectId, issue[0]._issue_id))
            })
        })
    })

    it('insert unknown dependency issue', async function () {
        await taskDb.insertTaskIssue(taskTest._task_id, -1).then(async function () {
            taskDb.removeTaskIssue(taskTest._task_id, -1)
            assert.strictEqual(true, false, 'a task can not depend on a unknown issue')
        }, err => assert.strictEqual(true, true, err))
    })
})
