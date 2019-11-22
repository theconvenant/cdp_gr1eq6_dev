const database = require('../../db_controller/task_db')

var assert = require('assert')
const taskId = 0
const description = 'Description'
const state = 'State'
const projectId = -1
const issueId = 0

describe('Test insertTask', function () {
    database.insertTask(taskId, description, state, projectId, issueId).then(function () {
        database.findTasksByProjectId(projectId).then(function (task) {
            it('should return the task\'s Id', function () {
                assert.equal(taskId, task._task_id)
            })
            it('should return the task\'s description', function () {
                assert.equal(description, task.description)
            })
            it('should return the task\'s state', function () {
                assert.equal(state, task.state)
            })
            it('should return the task\'s projectId', function () {
                assert.equal(projectId, task._project_id)
            })
            it('should return the task\'s issueId', function () {
                assert.equal(issueId, task._issue_id)
            })
            database.deleteTask(projectId, taskId).then(function () {
                database.findTasksByProjectId(projectId).then(function (deletedTask) {
                    assert.equal(deletedTask, undefined)
                })
            })
        })
    })
})